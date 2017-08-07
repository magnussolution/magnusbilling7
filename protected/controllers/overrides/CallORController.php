<?php
/**
 * Acoes do modulo "Call".
 *
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
 * 19/09/2012
 */
Yii::import('application.controllers.CallController');
class CallORController extends CallController
{
    public function beforeReport($columns)
    {

        if (preg_match("/id_campaign/", $this->filter)) {

            $filterCampaign = 1;
            foreach (explode("AND", $this->filter) as $key => $value) {

                if (preg_match('/id_campaign/', $value)) {
                    $filterCampaign = preg_replace("/id_campaign/", "id", $value);
                    break;
                }
            }

            $modelCampaign = Campaign::model()->find("$filterCampaign");

            $nameCampaign = $modelCampaign->name;
            $timeCampaign = $modelCampaign->nb_callmade;

            if ($timeCampaign > 0) {

                $columns = array(
                    array('header' => "100%", 'dataIndex' => 'real_sessiontime'),
                    array('header' => "80% a 99% ", 'dataIndex' => 'sessionid'),
                    array('header' => "60% a 79%", 'dataIndex' => 'id_plan'),
                    array('header' => "40% a 59% ", 'dataIndex' => 'id_did'),
                    array('header' => "20% a 39% ", 'dataIndex' => 'id_prefix'),
                    array('header' => "Menos que 20% ", 'dataIndex' => 'id_offer'),
                );

                $timeCampaign80 = $timeCampaign * 0.8;
                $timeCampaign60 = $timeCampaign * 0.6;
                $timeCampaign40 = $timeCampaign * 0.4;
                $timeCampaign20 = $timeCampaign * 0.2;

                $this->select = "
				( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign  ) AS real_sessiontime,
				( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign80 AND sessiontime < $timeCampaign ) AS sessionid,
				( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign60 AND sessiontime < $timeCampaign80) AS id_plan,
				( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign40 AND sessiontime < $timeCampaign60 ) AS id_did,
				( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign20 AND sessiontime < $timeCampaign40 ) AS id_prefix,
				( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime <= $timeCampaign20   ) AS id_offer
				";
                $count = $this->abstractModel->count(array(
                    'join'      => $this->join,
                    'condition' => $this->filter,
                ));

                $this->titleReport    = "Estatistica da campanha $nameCampaign";
                $this->subTitleReport = "Total de chamadas $count";

            }
        }

        return $columns;
    }

}
