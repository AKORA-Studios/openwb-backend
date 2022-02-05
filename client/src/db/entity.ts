import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class openWB extends BaseEntity {
    @PrimaryColumn('timestamp')
    time: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    filename: string;

    @Column()
    views: number;

    @Column()
    isPublished: boolean;
}

export default openWB;
