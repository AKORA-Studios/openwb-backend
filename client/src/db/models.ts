import { prop, pre, post, getModelForClass } from '@typegoose/typegoose';
import { Units } from '../openWB/topics';

class Ladepunkt {
    @prop({ required: true })
    public ADirectModeAmps!: Units.Ampere; //Sofort laden Soll Stromstärke

    @prop({ required: true })
    public PercentDirectChargeModeSoc!: Units.SoC; //Bis zu wieviel % im Sofort Laden Untermodus SoC geladen wird

    @prop({ required: true })
    public strChargePointName!: string; //Name des Ladepunktes

    @prop({ required: true })
    public boolChargeAtNight!: Units.bool; //Nachtladen aktiv 1 / 0

    @prop({ required: true })
    public boolDirectModeChargekWh!: Units.bool; //Gibt an ob der Sofort Laden Untermodus Lademenge aktiv ist

    @prop({ required: true })
    public APhase1!: Units.Ampere; //Stromstärke in Ampere

    @prop({ required: true })
    public APhase2!: Units.Ampere; //Stromstärke in Ampere

    @prop({ required: true })
    public APhase3!: Units.Ampere; //Stromstärke in Ampere

    @prop({ required: true })
    public VPhase1!: Units.Volts; //Spannung in Volt

    @prop({ required: true })
    public VPhase2!: Units.Volts; //Spannung in Volt

    @prop({ required: true })
    public VPhase3!: Units.Volts; //Spannung in Volt

    @prop({ required: true })
    public kWhCounter!: Units.kWh; //Zählerstand in Wh an Ladepunkt 1

    @prop({ required: true })
    public W!: Units.Watt; //Ladeleistung in Watt

    @prop({ required: true })
    public boolPlugStat!: Units.bool; //Steckererkennung = steckend

    @prop({ required: true })
    public AConfigured!: Units.Ampere; //Ampere mit denen geladen werden soll

    @prop({ required: true })
    public ChargeMode!: Units.ChargeMode; //Lademodus, 0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
}

const LadepunktModel = getModelForClass(Ladepunkt);

const doc = new LadepunktModel({});

doc.save(); // this should output "We have a kitten here."