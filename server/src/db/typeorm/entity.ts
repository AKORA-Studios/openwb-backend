import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class openWBGraph {
    @PrimaryColumn('timestamp')
    time: Date;

    @Column('double')
    evu: number;

    @Column('double')
    ladeleistungGesamt: number;

    @Column('double')
    PV: number;

    @Column('double')
    LadeleistungLP2: number;

    @Column('double')
    LadeleistungLP3: number;

    @Column('double')
    Speicherleistung: number;

    @Column('double')
    SpeicherSoC: number;

    @Column('double')
    SoCLp1: number;

    @Column('double')
    SoCLp2: number;

    @Column('double')
    Hausverbrauch: number;

    @Column('double')
    VB1: number;

    @Column('double')
    VB2: number;
}

export default openWBGraph;
