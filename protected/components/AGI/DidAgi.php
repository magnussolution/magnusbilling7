<?php
/**
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2016 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v2.1
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 *
 */

class DidAgi
{
    private $voip_call;
    private $did;
    private $sell_price;
    private $modelDestination;

    public function checkIfIsDidCall(&$agi, &$MAGNUS, &$Calc)
    {

        //check if did call
        $mydnid = substr($MAGNUS->dnid, 0, 1) == '0' ? substr($MAGNUS->dnid, -10) : $MAGNUS->dnid;
        $agi->verbose('checkIfIsDidCall ' . $mydnid, 25);
        $this->modelDestination = Diddestination::model()->findAll(
            array(
                'condition' => "t.activated = 1",
                'order'     => 'priority ASC',
                'with'      => array('idDid' => array(
                    'condition' => "idDid.did LIKE :key AND idDid.activated = 1",
                ),
                ),
                'params'    => array(':key' => $mydnid),
            )
        );
        if (count($this->modelDestination)) {
            $agi->verbose("Is a DID call");
            $this->checkDidDestinationType($agi, $MAGNUS, $Calc);
        }
    }
    public function checkDidDestinationType(&$agi, &$MAGNUS, &$Calc)
    {
        $this->didCallCost($agi, $MAGNUS);

        $this->did = $this->modelDestination[0]->idDid->did;
        $agi->verbose('DID ' . $this->did, 5);
        //check if is a call betewen 2 sipcounts.
        if (strlen($MAGNUS->accountcode) > 0) {
            $modelSip = Sip::model()->find('name = :did', array(':did' => $this->did));
        }

        if (!isset($modelSip) || !count($modelSip)) {

            $this->voip_call = $this->modelDestination[0]->voip_call;
            $this->checkBlockCallerID($agi, $MAGNUS->CallerID);

            $agi->verbose('voip_call ' . $this->voip_call, 5);
            switch ($this->voip_call) {
                case 2:
                    $MAGNUS->mode = 'ivr';
                    IvrAgi::callIvr($agi, $MAGNUS, $Calc, $this->modelDestination[0], $this);
                    break;
                case 3:
                    //callingcard
                    $MAGNUS->mode = 'standard';
                    $agi->answer();
                    sleep(2);
                    $MAGNUS->callingcardConnection   = $this->modelDestination[0]->idDid->connection_sell;
                    $MAGNUS->agiconfig['answer']     = 1;
                    $MAGNUS->agiconfig['cid_enable'] = 1;
                    $MAGNUS->agiconfig['use_dnid']   = 0;
                    $MAGNUS->agiconfig['number_try'] = 3;
                    $MAGNUS->CallerID                = is_numeric($MAGNUS->CallerID) ? $MAGNUS->CallerID : $agi->request['agi_calleridname'];
                    $agi->verbose('CallerID ' . $MAGNUS->CallerID);
                    break;
                case 4:
                    $MAGNUS->mode = 'portalDeVoz';
                    $agi->verbose('PortalDeVozAgi');
                    PortalDeVozAgi::send($agi, $MAGNUS, $Calc, $this->modelDestination);
                    break;
                case 5:
                    $agi->verbose('RECEIVED ANY CALLBACK', 5);
                    CallbackAgi::callbackCID($agi, $MAGNUS, $Calc, $this->modelDestination);
                    break;
                case 6:
                    if (!$agi->get_variable("SECCALL", true)) {
                        $agi->verbose('RECEIVED 0800 CALLBACK', 5);
                        CallbackAgi::callback0800($agi, $MAGNUS, $Calc, $this->modelDestination);
                    }
                    break;
                case 7:
                    $MAGNUS->mode = 'queue';
                    QueueAgi::callQueue($agi, $MAGNUS, $Calc, $this->modelDestination[0], $this);
                    break;
                default:
                    $agi->verbose('Mode = did', 5);
                    $MAGNUS->mode = 'did';
                    $this->call_did($agi, $MAGNUS, $Calc);
                    break;
            }

        }
    }

    public function call_did(&$agi, &$MAGNUS, &$Calc, $destinationIvr = false)
    {

        //sip call, group, custom or PSTN destination
        if ($MAGNUS->agiconfig['answer_call'] == 1) {
            $agi->verbose("ANSWER CALL", 6);
            $agi->answer();
        }

        $Calc->init();
        $MAGNUS->init();

        $agi->verbose("DID CALL - CallerID=" . $MAGNUS->CallerID . " -> DID=" . $this->did, 6);

        $res = 0;

        $MAGNUS->agiconfig['say_timetocall'] = 0;

        //altera o destino do did caso ele venha de uma IVR
        $this->modelDestination[0]->destination = $destinationIvr ? $destinationIvr : $this->modelDestination[0]->destination;

        $callcount = 0;

        foreach ($this->modelDestination as $inst_listdestination) {

            $agi->verbose(print_r($inst_listdestination->getAttributes(), true), 10);

            $callcount++;

            $MAGNUS->agiconfig['cid_enable'] = 0;
            $MAGNUS->accountcode             = $MAGNUS->username             = $inst_listdestination->idUser->username;
            $MAGNUS->id_plan                 = $inst_listdestination->idUser->id_plan;
            $did                             = $inst_listdestination->idDid->did;

            $msg = "[Magnus] DID call friend: FOLLOWME=$callcount (username:" . $MAGNUS->username . "
                    | destination type:" . $this->voip_call . "| id_plan:" . $MAGNUS->id_plan . ")";
            $agi->verbose($msg, 10);

            if (AuthenticateAgi::authenticateUser($agi, $MAGNUS) != 1) {
                $msg = "DID AUTHENTICATION ERROR";
            } else {
                /* IF SIP CALL*/
                if ($inst_listdestination['voip_call'] == 1) {
                    $agi->verbose("DID call friend: IS LOCAL !!!", 10);
                    $modelSip = Sip::model()->findByPk((int) $inst_listdestination['id_sip']);

                    if (count($modelSip)) {
                        $inst_listdestination['destination'] = "SIP/" . $modelSip->name;
                    } else {
                        $agi->stream_file('prepaid-dest-unreachable', '#');
                        continue;
                    }

                    $MAGNUS->startRecordCall($agi, $did);

                    $dialstr = $inst_listdestination['destination'] . $dialparams;

                    $MAGNUS->run_dial($agi, $dialstr, $MAGNUS->agiconfig['dialcommand_param_call_2did']);
                    $agi->verbose("DIAL $dialstr", 6);

                    $answeredtime = $agi->get_variable("ANSWEREDTIME");
                    $answeredtime = $answeredtime['data'];
                    $dialstatus   = $agi->get_variable("DIALSTATUS");
                    $dialstatus   = $dialstatus['data'];

                    $MAGNUS->stopRecordCall($agi);

                    $agi->verbose($inst_listdestination['destination'] . " Friend -> followme=$callcount : ANSWEREDTIME=" . $answeredtime . "-DIALSTATUS=" . $dialstatus, 6);

                    if ($this->parseDialStatus($agi, $dialstatus, $answeredtime) != true) {
                        $answeredtime = 0;
                        continue;
                    }
                }
                /* Call to group*/
                else if ($inst_listdestination['voip_call'] == 8) {

                    $agi->verbose("Call group $group ", 6);

                    $modelSip = Sip::model()->findAll('`group` = :key', array(':key' => $inst_listdestination['destination']));
                    $agi->verbose("Call group $group ", 6);
                    if (!count($modelSip)) {
                        $answeredtime = 0;
                        continue;
                    }

                    $group = '';
                    foreach ($modelSip as $key => $value) {
                        $group .= "SIP/" . $value->name . "&";
                    }
                    $dialstr = substr($group, 0, -1) . $dialparams;

                    $MAGNUS->startRecordCall($agi, $did);

                    $agi->verbose("DIAL $dialstr", 6);
                    $myres = $MAGNUS->run_dial($agi, $dialstr, $MAGNUS->agiconfig['dialcommand_param_call_2did']);

                    $answeredtime = $agi->get_variable("ANSWEREDTIME");
                    $answeredtime = $answeredtime['data'];
                    $dialstatus   = $agi->get_variable("DIALSTATUS");
                    $dialstatus   = $dialstatus['data'];

                    $MAGNUS->stopRecordCall($agi);

                    if ($this->parseDialStatus($agi, $dialstatus, $answeredtime) != true) {
                        $answeredtime = 0;
                        continue;
                    }

                }
                /* Call to custom dial*/
                else if ($inst_listdestination['voip_call'] == 9) {

                    $agi->verbose("Ccall group $group ", 6);
                    $dialstr = $inst_listdestination['destination'];

                    $MAGNUS->startRecordCall($agi, $did);

                    $agi->verbose("DIAL $dialstr", 6);
                    $myres = $MAGNUS->run_dial($agi, $dialstr, $MAGNUS->agiconfig['dialcommand_param_call_2did']);
                    $MAGNUS->stopRecordCall($agi);

                    $answeredtime = $agi->get_variable("ANSWEREDTIME");
                    $answeredtime = $answeredtime['data'];
                    $dialstatus   = $agi->get_variable("DIALSTATUS");
                    $dialstatus   = $dialstatus['data'];

                    if ($this->parseDialStatus($agi, $dialstatus, $answeredtime) != true) {
                        $answeredtime = 0;
                        continue;
                    }

                } else {
                    /* CHECK IF DESTINATION IS SET*/
                    if (strlen($inst_listdestination['destination']) == 0) {
                        continue;
                    }

                    $MAGNUS->agiconfig['use_dnid']       = 1;
                    $MAGNUS->agiconfig['say_timetocall'] = 0;

                    $MAGNUS->extension = $MAGNUS->dnid = $MAGNUS->destination = $inst_listdestination['destination'];

                    if ($MAGNUS->checkNumber($agi, $Calc, 0) == true) {

                        /* PERFORM THE CALL*/
                        $result_callperf = $Calc->sendCall($agi, $MAGNUS->destination, $MAGNUS);
                        if (!$result_callperf) {
                            $prompt = "prepaid-callfollowme";
                            $agi->verbose($prompt, 10);
                            $agi->stream_file($prompt, '#');
                            continue;
                        }

                        $dialstatus   = $Calc->dialstatus;
                        $answeredtime = $Calc->answeredtime;

                        if (($Calc->dialstatus == "NOANSWER") || ($Calc->dialstatus == "BUSY") || ($Calc->dialstatus == "CHANUNAVAIL") || ($Calc->dialstatus == "CONGESTION")) {
                            continue;
                        }

                        if ($Calc->dialstatus == "CANCEL") {
                            break;
                        }

                        /* INSERT CDR  & UPDATE SYSTEM*/
                        $Calc->updateSystem($MAGNUS, $agi, 1, 1);

                        $this->modelDestination[0]->secondusedreal += $Calc->answeredtime;
                        $this->modelDestination[0]->save();
                        $modelError = $this->modelDestination->getErrors();
                        if (count($modelError)) {
                            $agi->verbose(print_r($modelError, true), 25);
                        }

                        /* THEN STATUS IS ANSWER*/
                        break;
                    }
                }
            }
            /* END IF AUTHENTICATE*/
        }

        $answeredtime = $MAGNUS->executeVoiceMail($agi, $dialstatus, $answeredtime);

        $agi->verbose('answeredtime =' . $answeredtime);
        if ($answeredtime > 0) {
            $this->call_did_billing($agi, $MAGNUS, $Calc, $answeredtime, $dialstatus);
            return 1;
        }
    }
    public function checkBlockCallerID(&$agi, $callerID)
    {
        $agi->verbose("try blocked");
        $block_expression_1 = $this->modelDestination[0]->idDid->block_expression_1;
        $block_expression_2 = $this->modelDestination[0]->idDid->block_expression_2;
        $block_expression_3 = $this->modelDestination[0]->idDid->block_expression_3;

        $send_to_callback_1 = $this->modelDestination[0]->idDid->send_to_callback_1;
        $send_to_callback_2 = $this->modelDestination[0]->idDid->send_to_callback_2;
        $send_to_callback_3 = $this->modelDestination[0]->idDid->send_to_callback_3;

        if ($block_expression_1 == 1 || $send_to_callback_1) {
            $agi->verbose("try blocked number match with expression 1, " . $callerID . ' ' . $expression_2, 1);
            if (strlen($expression_1) > 1 && ereg($expression_1, $MAGNUS->CallerID)) {

                if ($block_expression_1 == 1) {
                    $agi->verbose("Call blocked becouse this number becouse match with expression 1, " . $callerID . ' FROM did ' . $this->did, 1);
                    $MAGNUS->hangup($agi);
                } elseif ($send_to_callback_1 == 1) {
                    $agi->verbose('Send to Callback expression 1', 10);
                    $this->voip_call = 6;
                }
            }
        }

        if ($block_expression_2 == 1 || $send_to_callback_2) {
            $agi->verbose("try blocked number match with expression 2, " . $callerID . ' ' . $expression_2, 1);
            if (strlen($expression_2) > 1 && ereg($expression_2, $callerID)) {
                if ($block_expression_2 == 1) {
                    $agi->verbose("Call blocked becouse this number becouse match with expression 2, " . $callerID . ' FROM did ' . $this->did, 1);
                    $MAGNUS->hangup($agi);
                } elseif ($send_to_callback_2 == 1) {
                    $agi->verbose('Send to Callback expression 2', 10);
                    $this->voip_call = 6;
                }
            }
        }

        if ($block_expression_3 == 1 || $send_to_callback_3) {
            $agi->verbose("try blocked number match with expression 3, " . $callerID . ' ' . $expression_3, 1);
            if (strlen($expression_3) > 0 && (ereg($expression_3, $callerID) || $expression_3 == '*') &&
                strlen($expression_1) > 1 && !ereg($expression_1, $callerID) &&
                strlen($expression_2) > 1 && !ereg($expression_2, $callerID)
            ) {

                if ($block_expression_1 == 3) {
                    $agi->verbose("Call blocked becouse this number becouse match with expression 3, " . $callerID . ' FROM did ' . $this->did, 1);
                    $MAGNUS->hangup($agi);
                } elseif ($send_to_callback_3 == 1) {
                    $agi->verbose('Send to Callback expression 3', 10);
                    $this->voip_call = 6;
                }
            }
        }
    }

    public function parseDialStatus(&$agi, $dialstatus, $answeredtime)
    {
        $agi->verbose('parseDialStatus', 25);
        if ($dialstatus == "BUSY") {
            $agi->stream_file('prepaid-isbusy', '#');
            return false;
        } elseif ($dialstatus == "NOANSWER") {
            $agi->stream_file('prepaid-callfollowme', '#');
            return false;
        } elseif ($dialstatus == "CANCEL") {
            return true;
        } elseif ($dialstatus == "ANSWER") {
            $agi->verbose("[Magnus] DID call friend: dialstatus : $dialstatus, answered time is " . $answeredtime . " ", 10);
            return true;
        } elseif (($dialstatus == "CHANUNAVAIL") || ($dialstatus == "CONGESTION")) {
            return false;
        } else {
            $agi->stream_file('prepaid-callfollowme', '#');
            return false;
        }
    }

    public function didCallCost(&$agi, &$MAGNUS)
    {
        $connection_sell = $this->modelDestination[0]->idDid->connection_sell;

        //brazil mobile - ^[4,5,6][1-9][7-9].{7}$|^[1,2,3,7,8,9][1-9]9.{8}$
        //brazil fixed - ^[1-9][0-9][1-5].
        $agi->verbose(print_r($this->modelDestination[0]->getAttributes(), true));
        if (strlen($this->modelDestination[0]->idDid->expression_1) > 0 && ereg($this->modelDestination[0]->idDid->expression_1, $MAGNUS->CallerID) || $this->modelDestination[0]->idDid->expression_1 == '*') {
            $agi->verbose("CallerID Match regular expression 1 " . $MAGNUS->CallerID, 10);
            $selling_rate = $this->modelDestination[0]->idDid->selling_rate_1;

        } elseif (strlen($this->modelDestination[0]->idDid->expression_2) > 0 && ereg($this->modelDestination[0]->idDid->expression_2, $MAGNUS->CallerID) || $this->modelDestination[0]->idDid->expression_2 == '*') {
            $agi->verbose("CallerID Match regular expression 2 " . $MAGNUS->CallerID, 10);
            $selling_rate = $this->modelDestination[0]->idDid->selling_rate_2;
        } elseif (strlen($this->modelDestination[0]->idDid->expression_3) > 0 && ereg($this->modelDestination[0]->idDid->expression_3, $MAGNUS->CallerID) || $this->modelDestination[0]->idDid->expression_3 == '*') {
            $agi->verbose("CallerID Match regular expression 3 " . $MAGNUS->CallerID, 10);
            $selling_rate = $this->modelDestination[0]->idDid->selling_rate_3;
        } else {
            $selling_rate = 0;
        }

        if ($connection_sell == 0 && $selling_rate == 0) {
            $this->sell_price = 0;
        } else {
            $this->sell_price = $MAGNUS->roudRatePrice($answeredtime, $selling_rate, $this->modelDestination[0]->idDid->initblock, $this->modelDestination[0]->idDid->increment);
        }

        $this->sell_price = $this->sell_price + $connection_sell;

        if ($answeredtime < $this->modelDestination[0]->idDid->minimal_time_charge) {
            $this->sell_price = 0;
        }

        if ($this->sell_price > 0) {
            if (UserCreditManager::checkGlobalCredit($MAGNUS->id_user) === false) {
                $agi->verbose(" USER NO CREDIT FOR CALL " . $username, 10);
                $MAGNUS->hangup($agi);
            }
        }

        $agi->verbose(' answeredtime = ' . $answeredtime . ' sell_price = ' . $this->sell_price . ' connection_sell = ' . $connection_sell, 10);
    }

    public function call_did_billing(&$agi, &$MAGNUS, &$Calc, $answeredtime, $dialstatus)
    {
        $agi->verbose('Method call_did_billing', 25);
        if (strlen($MAGNUS->dialstatus_rev_list[$dialstatus]) > 0) {
            $terminatecauseid = $MAGNUS->dialstatus_rev_list[$dialstatus];
        } else {
            $terminatecauseid = 0;
        }

        /*recondeo call*/
        if ($MAGNUS->config["global"]['bloc_time_call'] == 1 && $this->sell_price > 0) {
            $initblock    = $this->modelDestination[0]->idDid->initblock;
            $billingblock = $this->modelDestination[0]->idDid->increment;

            if ($answeredtime > $initblock) {
                $restominutos   = $answeredtime % $billingblock;
                $calculaminutos = ($answeredtime - $restominutos) / $billingblock;
                if ($restominutos > '0') {
                    $calculaminutos++;
                }

                $answeredtime = $calculaminutos * $billingblock;

            } elseif ($answeredtime < '1') {
                $sessiontime = 0;
            } else {
                $answeredtime = $initblock;
            }

        }

        $modelPrefix = Prefix::model()->find('prefix = SUBSTRING(:key,1,length(prefix))',
            array(':key' => $this->did));
        if (!count($modelPrefix)) {
            $agi->verbose('Not found prefix to DID ' . $this->did);
        }

        $modelCall                   = new Call();
        $modelCall->uniqueid         = $MAGNUS->uniqueid;
        $modelCall->sessionid        = $MAGNUS->channel;
        $modelCall->id_user          = $MAGNUS->id_user;
        $modelCall->starttime        = date("Y-m-d H:i:s", time() - $answeredtime);
        $modelCall->sessiontime      = $answeredtime;
        $modelCall->real_sessiontime = intval($answeredtime);
        $modelCall->calledstation    = $this->did;
        $modelCall->terminatecauseid = $terminatecauseid;
        $modelCall->stoptime         = date('Y-m-d H:i:s');
        $modelCall->sessionbill      = $this->sell_price;
        $modelCall->id_plan          = $MAGNUS->id_plan;
        $modelCall->id_trunk         = null;
        $modelCall->src              = $MAGNUS->CallerID;
        $modelCall->sipiax           = 3;
        $modelCall->buycost          = 0;
        $modelCall->id_prefix        = $modelPrefix->id;
        $modelCall->save();
        $modelError = $modelCall->getErrors();
        if (count($modelError)) {
            $agi->verbose(print_r($modelError, true), 25);
        }

        $MAGNUS->modelUser->credit -= $MAGNUS->round_precision(abs($this->sell_price));
        $MAGNUS->modelUser->save();

        $this->modelDestination[0]->secondusedreal += $answeredtime;
        $this->modelDestination->save();

        return;
    }
}
