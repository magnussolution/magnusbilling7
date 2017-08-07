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
class CallChartCommand extends ConsoleCommand
{
    public function run($args)
    {
        for ($i = 0; $i < 5; $i++) {

            $channelsData = AsteriskAccess::instance()->coreShowChannelsConcise();
            $arr          = explode("\n", $channelsData["data"]);

            $total = 0;

            foreach ($arr as $key => $value) {
                if (preg_match("/Up/", $value)) {
                    $total++;
                }
            }

            $total = intval($total / 2);

            if ($i == 0) {
                $modelCallOnlineChart         = new CallOnlineChart();
                $modelCallOnlineChart->date   = date('Y-m-d H:i:s');
                $modelCallOnlineChart->answer = $total;
                $modelCallOnlineChart->total  = 0;
                $modelCallOnlineChart->save();

                $id     = $modelCallOnlineChart->id;
                $total1 = $total;
            } else {
                if ($total > $total1) {
                    $modelCallOnlineChart         = CallOnlineChart::model()->findByPk((int) $id);
                    $modelCallOnlineChart->answer = $total;
                    $modelCallOnlineChart->save();
                }
            }

            if (date('H:i') == '23:52') {
                CallOnlineChart::model()->deleteAll('date < :key', array(':key' => date('Y-m-d')));
            }

            sleep(12);
        }
    }
}
