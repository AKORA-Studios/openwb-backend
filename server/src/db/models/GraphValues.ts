import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../gateways';

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
    { sequelize }
);

export default GraphValues;
