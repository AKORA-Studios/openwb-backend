export namespace Units {
    type bool = 0 | 1;
    /** Number in W(Watt-hours) */
    type Wh = number;
    /** Number in kWh(kilo-Watt-hours) */
    type kWh = number;
    /** Number in W */
    type Watt = number;
    type Ampere = number;
    type Volts = number;
    /** PowerFactor - λ (-1 to 1) (See: https://de.wikipedia.org/wiki/Leistungsfaktor) */
    type λ = -1 | 1 | number;
    /** Time in seconds */
    type seconds = number;
    /** Time string, exp. "5 Min" */
    type time = string;
    /** SoC in % from 0-100 (empty - full) */
    type SoC = number;
    /** Lastmanagment Status */
    type LMStatus = string
    /** Lademodus */
    enum ChargeMode {
        /** (Direct) */
        SofortLaden = 0,
        Min_und_PV = 1,
        Nur_PV = 2,
        Stop = 3,
        Standby = 4
    }
    enum ChargeSubMode {
        Aus = 0,
        kWh_Laden = 1,
        SoC_Laden = 2
    }
}


export namespace topics {
    export interface LESEND {
        'openWB/lp/1/TimeRemaining': Units.seconds; //verbleibende Zeit für Lademenge (Untermodus Sofort laden)
        'openWB/lp/1/%Soc': Units.SoC; //Aktueller SoC
        'openWB/lp/1/kWhDailyCharged': Units.kWh; //Heute geladene kWh
        'openWB/lp/1/ADirectModeAmps': Units.Ampere; //Sofort laden Soll Stromstärke
        'openWB/lp/1/PercentDirectChargeModeSoc': number; //Bis zu wieviel % im Sofort Laden Untermodus SoC geladen wird
        'openWB/lp/1/strChargePointName': string; //Name des Ladepunktes
        'openWB/lp/1/boolChargeAtNight': Units.bool; //Nachtladen aktiv 1 / 0
        'openWB/lp/1/kWhDirectModeToChargekWh': Units.kWh; //Zu ladende kWh im Sofortladen Untermodus Lademenge
        'openWB/lp/1/boolDirectChargeMode_none_kwh_soc': Units.bool | 2; //Sofort Laden Untermodus, 0 = nein, 1 = kWH (Lademenge, 2= bis xx%SoC)
        'openWB/lp/2/TimeRemaining': Units.time;
        'openWB/lp/2/ADirectModeAmps': Units.Ampere;
        'openWB/lp/2/boolChargePointConfigured': Units.bool; //Gibt an ob ein zweiter Ladepunkt konfiguriert ist
        'openWB/lp/1/boolDirectModeChargekWh': Units.bool; //Gibt an ob der Sofort Laden Untermodus Lademenge aktiv ist
        'openWB/pv/W': Units.Watt; //PV Leistung in Watt, Erzeugung ist negativ
        'openWB/evu/W': Units.Watt; //Leistung am Hausübergabepunkt, Bezug ist positiv, Einspeisung negativ
        'openWB/evu/APhase3': Units.Ampere; //A an Phase 3 am Hausanschluss
        'openWB/evu/APhase1': Units.Ampere; //A an Phase 1 am Hausanschluss
        'openWB/evu/APhase2': Units.Ampere; //A an Phase 2 am Hausanschluss
        'openWB/housebattery/W': Units.Watt; //Batterieleistung in Watt, negativ = Einspeisung/Entladung, positiv = Ladung
        'openWB/housebattery/%Soc': Units.SoC; //SoC des Speichers
        'openWB/global/WHouseConsumption': Units.Watt; //Hausverbrauch (errechnet aus PV, EVU, EV, Speicher) in Watt
        'openWB/global/WAllChargePoints': Units.Watt; //Leistung aller Ladepunkte zusammen
        'openWB/boolChargeAtNight_direct': Units.bool; //Gibt an ob Nachtladen im Sofort laden Modus aktiv ist
        'openWB/boolChargeAtNight_nurpv': Units.bool; //Gibt an ob Nachtladen im Nur PV Modus aktiv ist
        'openWB/boolChargeAtNight_minpv': Units.bool; //Gibt an ob Nachtladen im Min + PV Modus aktiv ist
        'openWB/boolDisplayHouseConsumption': Units.bool; //Gibt an ob der Hausverbrauch angezeigt werden soll
        'openWB/boolDisplayDailyCharged': Units.bool; //Gibt an ob „Heute geladen“ angezeigt werden soll
        'openWB/boolEvuSmoothedActive': Units.bool; //Gibt an ob die EVU Glättung aktiv ist
        'openWB/boolDisplayHouseBatteryPriority': Units.bool; //Gibt an ob die EV / Speicher bevorrangung im UI angezeigt werden soll
        'openWB/graph/lastlivevalues': '19:35:56,5949,1588,0,0,1588,1588,-7,1,14,24,4368,358,0'; //Daten für den Live Graph, gibt nur die neusten Daten wieder. Aufbau: Time,EVU,LadeleistungGesamt,PV,Ladeleistung LP2,Ladeleistung LP3, Speicherleistung, SpeicherSoC, SoC Lp1, SoC lp2, Hausverbrauch, Verbraucher' :1, Verbraucher 2
        'openWB/graph/alllivevalues': '18:36:06,667,0,21,0,0,0,-142,3,25,53,830,358,0'; //Daten für den Live Graph, meist letzte Stunde
        'openWB/Verbraucher/WNr1': Units.Watt; //Verbrauch 1 Leistung in Watt
        'openWB/Verbraucher/WhImportedNr1': Units.Watt; //Bezugszähler in Wh
        'openWB/Verbraucher/WhExportedNr1': Units.Watt; //Exportzähler in Wh
        'openWB/Verbraucher/WNr2': Units.Watt; //Verbrauch 2 Leistung in Watt
        'openWB/Verbraucher/WhImportedNr2': Units.Watt; //Bezugszähler in Wh
        'openWB/Verbraucher/WhExportedNr2': Units.Watt; //Exportzähler in Wh
        'openWB/evu/WhExported': Units.Wh; //Eingespeiste Energie in Wh (Zählerstand)
        'openWB/evu/WhImported': Units.Wh; //Bezogene Energie in Wh (Zählerstand)
        'openWB/housebattery/WhExported': Units.Wh; //Entladene Energie in Wh (Batterieentladung, Zählerstand)
        'openWB/housebattery/WhImported': Units.Wh; //Geladene Energie in Wh (Batterieladung, Zählerstand)
        'openWB/pv/CounterTillStartPvCharging': number; //Counter für die PV Ladung
        'openWB/pv/WhCounter': Units.Wh; //Zählsterstand in Wh PV erzeugte Energie
        'openWB/lp/1/PfPhase1': Units.λ; //Power Factor
        'openWB/lp/1/PfPhase2': Units.λ; //Power Factor
        'openWB/lp/1/PfPhase3': Units.λ; //Power Factor
        'openWB/evu/ASchieflast': Units.Ampere; //Schieflast in A am Hausübergabepunkt
        'openWB/evu/WPhase1': Units.Watt; //Leistung in Watt am Hausübergabepunkt
        'openWB/evu/WPhase2': Units.Watt; //Leistung in Watt am Hausübergabepunkt
        'openWB/evu/WPhase3': Units.Watt; //Leistung in Watt am Hausübergabepunkt
        'openWB/strLastmanagementActive': Units.LMStatus; //Gibt an ob das Lastmanagement aktiv bzw. den String zur Ausgabe dafür

        //Jeweils für alle Ladepunkte verfügbar ######
        'openWB/lp/4/ADirectModeAmps': Units.Ampere; //Sofort laden Soll Stromstärke
        'openWB/lp/4/boolChargePointConfigured': Units.bool; //Gibt an ob ein zweiter Ladepunkt konfiguriert ist
        'openWB/lp/4/str/ChargePointName LP': string; //Name des Ladepunktes
        'openWB/lp/1/ChargeStatus': Units.bool; //Gibt an ob theoretisch der Ladepunkt freigegeben ist (wird von ChargePointEnabled übersteuert), Int 0 oder 1
        'openWB/lp/1/ChargePointEnabled': Units.bool; //"Master" (De-) Aktivierung eines Ladepunktes. Int 0 oder 1
        'openWB/lp/1/APhase1': Units.Ampere; //Stromstärke in Ampere
        'openWB/lp/1/APhase2': Units.Ampere; //Stromstärke in Ampere
        'openWB/lp/1/APhase3': Units.Ampere; //Stromstärke in Ampere
        'openWB/lp/1/VPhase1': Units.Volts; //Spannung in Volt
        'openWB/lp/1/VPhase2': Units.Volts; //Spannung in Volt
        'openWB/lp/1/VPhase3': Units.Volts; //Spannung in Volt
        'openWB/lp/1/kWhCounter': Units.kWh; //Zählerstand in Wh an Ladepunkt 1
        'openWB/lp/1/W': Units.Watt; //Ladeleistung in Watt
        'openWB/lp/1/boolPlugStat': Units.bool; //Steckererkennung = steckend
        'openWB/lp/1/boolChargeStat': Units.bool; //Steckerereckennung = ladend
        'openWB/lp/1/AConfigured': Units.Ampere; //Ampere mit denen geladen werden soll
        'openWB/lp/1/kWhActualCharged': Units.kWh; //Geladene kWh des aktuellen Ladevorgangs
        'openWB/lp/1/kWhChargedSincePlugged': Units.kWh; //Geladene kWh seit letztem anstecken
        'openWB/global/ChargeMode': Units.ChargeMode; //Lademodus, 0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
    };
    export interface SCHREIBEND {
        'openWB/set/Lademodus': Units.ChargeMode; //0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
        'openWB/set/lp1/DirectChargeSubMode': Units.ChargeSubMode; //Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
        'openWB/set/lp2/DirectChargeSubMode': Units.ChargeSubMode; //Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
        'openWB/set/lp1/DirectChargeSoc': Units.SoC; //Setzt den Sofort Laden (Direct) Untermodus SoC Wert bis zu dem geladen werden soll, Int 1 - 100
        'openWB/set/lp2/DirectChargeSoc': Units.SoC; //Setzt den Sofort Laden (Direct) Untermodus SoC Wert bis zu dem geladen werden soll, Int 1 - 100

        // Jeweils für alle Ladepunkte verfügbar ######
        'openWB/set/lp1/ChargePointEnabled': tinyInt; //(De-) Aktivieren des Ladepunktes, unabhängig von gewähltem Lademodus oder Einstellungen, Int 0 oder 1
        'openWB/set/lp1/DirectChargeAmps': Units.Ampere; //Ampere mit denen im Sofortladen Modus geladen werden soll, Int 6-32
        'openWB/set/lp1/kWhDirectChargeToCharge': Units.kWh; //Setzt die Lademenge in kWh für den Sofort Laden Untermodus Lademenge, Int 1-100
        'openWB/set/lp3/DirectChargeSubMode': tinyInt; //Ladepunkt 3-8, setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden
        'openWB/set/lp1/boolResetDirectCharge': tinyInt; //Setzt die geladene Menge auf 0 zurück für den Sofort Laden Untermodus Lademenge, Int 1
    };
};
