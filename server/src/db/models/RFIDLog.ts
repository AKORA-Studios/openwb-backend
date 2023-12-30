import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';
import config from '../../config';
import mqttListener, { mqttClient } from '../../openWB/client';
import { Tag } from '../../lib/';
import User from './User';

interface RFIDLogAttributes {
    timestamp: Date;
    tagID: Tag.id;
}
export interface RFIDLogInput extends Omit<RFIDLogAttributes, 'timestamp'> {}

class RFIDLog extends Model<RFIDLogAttributes, RFIDLogInput> implements RFIDLogAttributes {
    declare timestamp: Date;
    declare tagID: Tag.id;
}

RFIDLog.init(
    {
        timestamp: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
        tagID: { type: DataTypes.BIGINT, allowNull: false },
    },
    {
        sequelize,
        tableName: 'rfid_log',
        indexes: [{ unique: true, fields: ['timestamp'], name: 'Time' }],
    }
);

export default RFIDLog;

console.log(config.PROD);

//Save Entry on changes
if (config.PROD) {
    let first = true;
    mqttListener.on('openWB/system/lastRfId', async (value) => {
        console.log('Tag scanned');

        if (config.DEV) return;
        // Ignore the first value that will get send when the client connects for the first time
        if (first) {
            first = false;
            return;
        }

        if (!value) return;
        if (value[0] === '0') return;

        let [lastIDstr, millies] = value[0].split(',');
        let lastID = Number(lastIDstr);

        await RFIDLog.create({
            tagID: lastID,
            //timestamp: new Date(Number(millies) * 1000),
        });

        console.log('Log entry created');

        let user = await User.findOne({
            where: {
                tagID: lastID,
            },
        });
        // check if we have a user and charge mode settings
        if (!user || user.chargeMode == null) return;

        console.log('Charge mode found:', user.chargeMode);

        // Change to user specified settings
        // 0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
        // 'openWB/set/Lademodus': Units.ChargeMode;
        mqttClient.publish('openWB/set/Lademodus', user.chargeMode! + '');

        // If direct charge is selected also set the according settings
        if (user.chargeMode === 0) {
            // Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
            // 'openWB/set/lp1/DirectChargeSubMode': Units.ChargeSubMode;
            mqttClient.publish('openWB/set/lp1/DirectChargeSubMode', user.subMode + '');

            // Setzt den Sofort Laden (Direct) Untermodus SoC Wert bis zu dem geladen werden soll, Int 1 - 100
            // 'openWB/set/lp1/DirectChargeSoc': Units.SoC;
            mqttClient.publish('openWB/set/lp1/DirectChargeSoc', user.chargeSoc + '');

            // Ampere mit denen im Sofortladen Modus geladen werden soll, Int 6-32
            // 'openWB/set/lp1/DirectChargeAmps': Units.Ampere;
            mqttClient.publish('openWB/set/lp1/DirectChargeAmps', user.chargeAmps + '');

            // Setzt die Lademenge in kWh für den Sofort Laden Untermodus Lademenge, Int 1-100
            //'openWB/set/lp1/kWhDirectChargeToCharge': Units.kWh;
            mqttClient.publish('openWB/set/lp1/kWhDirectChargeToCharge', user.chargeKwh + '');
        }
    });
} else {
    console.log('DEV MODE - Not saving RFIDLog');
}
