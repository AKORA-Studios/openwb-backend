import config from '../../config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../mariadb';

import getValuesNew from '../../lib/getValuesNew';
import mqttListener from '../../openWB/client';

interface GraphNewAttributes {
    timestamp: Date;
    evu: number;
    pv1: number;
    pv2: number;
    vb1: number;

    ekarus_soc: number;
    ekarus_service_soc: number;
    lp1_leistung: number;
    speicher_soc: number;
    speicher_leistung: number;
}
export interface GraphNewInput extends GraphNewAttributes {}

class GraphNew extends Model<GraphNewAttributes, GraphNewInput> implements GraphNewAttributes {
    declare timestamp: Date;
    declare evu: number;
    declare pv1: number;
    declare pv2: number;
    declare vb1: number;
    declare ekarus_soc: number;
    declare ekarus_service_soc: number;
    declare lp1_leistung: number;
    declare speicher_soc: number;
    declare speicher_leistung: number;

    // timestamps!
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

GraphNew.init(
    {
        timestamp: DataTypes.DATE,
        evu: DataTypes.FLOAT,
        pv1: DataTypes.FLOAT,
        pv2: DataTypes.FLOAT,
        vb1: DataTypes.FLOAT,
        ekarus_soc: DataTypes.SMALLINT,
        ekarus_service_soc: DataTypes.SMALLINT,
        lp1_leistung: DataTypes.FLOAT,
        speicher_soc: DataTypes.SMALLINT,
        speicher_leistung: DataTypes.FLOAT,
    },
    {
        sequelize,
        tableName: 'graph_new',
        createdAt: false,
        updatedAt: false,
        timestamps: false,
        // indexes: [{ unique: false, fields: ['timestamp'], name: 'Time' }],
    },
);

GraphNew.removeAttribute('id');

export default GraphNew;

//Save Entry on changes
const interval = 1000 * 60 * 5; //5 minutes

if (config.PROD) {
    //MQTT values are provided 7 times per second
    //Using this interval instead
    setInterval(async () => {
        //Get new values from redis
        const values = await getValuesNew();
        if (!values) return;

        await GraphNew.create({
            timestamp: new Date(values.time),
            evu: values.evu,
            pv1: values.pv1,
            pv2: values.pv2,
            vb1: values.vb1,
            ekarus_soc: values.ekarus_soc,
            ekarus_service_soc: values.ekarus_service_soc,
            lp1_leistung: values.lp1_leistung,
            speicher_soc: values.speicher_soc,
            speicher_leistung: values.speicher_leistung,
        });
    }, interval);
} else {
    console.log('DEV MODE - Not saving GraphNew');
}
