import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';

import getLiveValues from '../../lib/getLiveValues';
import mqttListener from '../../openWB/client';

interface GraphValuesAttributes {
    timestamp: Date;
    evu: number;
    pv: number;
    hausverbrauch: number;
    ladeleistung: number;

    ladeleistung_lp1: number;
    ladeleistung_lp2: number;
    speicherleistung: number;
    speicher_soc: number;
    soc_lp1: number;
    soc_lp2: number;
    vb1: number;
    vb2: number;
}
export interface GraphValuesInput extends GraphValuesAttributes {}

class GraphValues
    extends Model<GraphValuesAttributes, GraphValuesInput>
    implements GraphValuesAttributes
{
    declare timestamp: Date;
    declare evu: number;
    declare pv: number;
    declare hausverbrauch: number;
    declare ladeleistung: number;
    declare ladeleistung_lp1: number;
    declare ladeleistung_lp2: number;
    declare speicherleistung: number;
    declare speicher_soc: number;
    declare soc_lp1: number;
    declare soc_lp2: number;
    declare vb1: number;
    declare vb2: number;

    // timestamps!
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

GraphValues.init(
    {
        timestamp: DataTypes.DATE,
        evu: DataTypes.FLOAT,
        pv: DataTypes.FLOAT,
        hausverbrauch: DataTypes.FLOAT,
        ladeleistung: DataTypes.FLOAT,
        ladeleistung_lp1: DataTypes.FLOAT,
        ladeleistung_lp2: DataTypes.FLOAT,
        speicherleistung: DataTypes.FLOAT,
        speicher_soc: DataTypes.FLOAT,
        soc_lp1: DataTypes.FLOAT,
        soc_lp2: DataTypes.FLOAT,
        vb1: DataTypes.FLOAT,
        vb2: DataTypes.FLOAT,
    },
    {
        sequelize,
        tableName: 'graph',
        indexes: [{ unique: false, fields: ['timestamp'], name: 'Time' }],
    }
);

export default GraphValues;

//Save Entry on changes
const interval = 1000 * 60; //1 Minute

if (config.PROD) {
    //MQTT values are provided 7 times per second
    //Using this interval instead to save values every minute instead
    setInterval(async () => {
        //Get new values from redis
        const values = await getLiveValues();
        if (!values) return;

        await GraphValues.create({
            timestamp: new Date(values.time),
            evu: values.evu,
            hausverbrauch: values.hausverbrauch,
            ladeleistung: values.ladeleistung,
            pv: values.photovoltaik,

            ladeleistung_lp1: values.ladeleistung_lp1,
            ladeleistung_lp2: values.ladeleistung_lp2,
            speicherleistung: values.speicherleistung,
            speicher_soc: values.speicher_soc,
            soc_lp1: values.soc_lp1,
            soc_lp2: values.soc_lp2,
            vb1: values.vb1,
            vb2: values.vb2,
        });
    }, interval);
} else {
    console.log('DEV MODE - Not saving GraphValues');
}
