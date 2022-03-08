import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';

import getLiveValues from '../../api/getLiveValues';
import mqttListener from '../../openWB/client';

interface GraphValuesAttributes {
    timestamp: Date;
    evu: number;
    pv: number;
    hausverbrauch: number;
    ladeleistung: number;
}
export interface GraphValuesInput extends GraphValuesAttributes {}

class GraphValues extends Model<GraphValuesAttributes, GraphValuesInput> implements GraphValuesAttributes {
    public timestamp!: Date;
    public evu!: number;
    public pv!: number;
    public hausverbrauch!: number;
    public ladeleistung!: number;

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
    },
    { sequelize, tableName: 'graph' }
);

export default GraphValues;

//Save Entry on changes
mqttListener.on('openWB/system/lastlivevalues', async (str) => {
    if (config.DEV) return;

    //Get new values from redis
    const values = await getLiveValues();
    if (!values) return;

    await GraphValues.create({
        timestamp: values.time,
        evu: values.evu,
        hausverbrauch: values.Hausverbrauch,
        ladeleistung: values.ladeleistungGesamt,
        pv: values.PV,
    });
});
