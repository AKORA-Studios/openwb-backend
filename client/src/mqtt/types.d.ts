type tinyInt = 0 | 1;
/** Number from 1-100 in kWh */
type kWh = 1 | 100 | number;

export type topics = {
    LESEND: {
        'openWB/lp/1/TimeRemaining': number; //verbleibende Zeit für Lademenge (Untermodus Sofort laden)
        'openWB/lp/1/%Soc': number; //Aktueller SoC
        'openWB/lp/1/kWhDailyCharged': number; //Heute geladene kWh
        'openWB/lp/1/ADirectModeAmps': number; //Sofort laden Soll Stromstärke
        'openWB/lp/1/PercentDirectChargeModeSoc': number; //Bis zu wieviel % im Sofort Laden Untermodus SoC geladen wird
        'openWB/lp/1/strChargePointName': 'Ioniq'; //Name des Ladepunktes
        'openWB/lp/1/boolChargeAtNight': number; //Nachtladen aktiv 1 / 0
        'openWB/lp/1/kWhDirectModeToChargekWh': number; //Zu ladende kWh im Sofortladen Untermodus Lademenge
        'openWB/lp/1/boolDirectChargeMode_none_kwh_soc': number; //Sofort Laden Untermodus, 0 = nein, 1 = kWH (Lademenge, 2= bis xx%SoC)
        'openWB/lp/2/TimeRemaining': '5 Min';
        'openWB/lp/2/ADirectModeAmps': number;
        'openWB/lp/2/boolChargePointConfigured': number; //Gibt an ob ein zweiter Ladepunkt konfiguriert ist
        'openWB/lp/1/boolDirectModeChargekWh': number; //Gibt an ob der Sofort Laden Untermodus Lademenge aktiv ist
        'openWB/pv/W': number; //PV Leistung in Watt, Erzeugung ist negativ
        'openWB/evu/W': number; //Leistung am Hausübergabepunkt, Bezug ist positiv, Einspeisung negativ
        'openWB/evu/APhase3': number; //A an Phase 3 am Hausanschluss
        'openWB/evu/APhase1': number; //A an Phase 1 am Hausanschluss
        'openWB/evu/APhase2': number; //A an Phase 2 am Hausanschluss
        'openWB/housebattery/W': -7; //Batterieleistung in Watt, negativ = Einspeisung/Entladung, positiv = Ladung
        'openWB/housebattery/%Soc': number; //SoC des Speichers
        'openWB/global/WHouseConsumption': number; //Hausverbrauch (errechnet aus PV, EVU, EV, Speicher) in Watt
        'openWB/global/WAllChargePoints': number; //Leistung aller Ladepunkte zusammen
        'openWB/boolChargeAtNight_direct': number; //Gibt an ob Nachtladen im Sofort laden Modus aktiv ist
        'openWB/boolChargeAtNight_nurpv': number; //Gibt an ob Nachtladen im Nur PV Modus aktiv ist
        'openWB/boolChargeAtNight_minpv': number; //Gibt an ob Nachtladen im Min + PV Modus aktiv ist
        'openWB/boolDisplayHouseConsumption': number; //Gibt an ob der Hausverbrauch angezeigt werden soll
        'openWB/boolDisplayDailyCharged': number; //Gibt an ob „Heute geladen“ angezeigt werden soll
        'openWB/boolEvuSmoothedActive': number; //Gibt an ob die EVU Glättung aktiv ist
        'openWB/boolDisplayHouseBatteryPriority': number; //Gibt an ob die EV / Speicher bevorrangung im UI angezeigt werden soll
        'openWB/graph/lastlivevalues': '19:35:56,5949,1588,0,0,1588,1588,-7,1,14,24,4368,358,0'; //Daten für den Live Graph, gibt nur die neusten Daten wieder. Aufbau: Time,EVU,LadeleistungGesamt,PV,Ladeleistung LP2,Ladeleistung LP3, Speicherleistung, SpeicherSoC, SoC Lp1, SoC lp2, Hausverbrauch, Verbraucher' :1, Verbraucher 2
        'openWB/graph/alllivevalues': '18:36:06,667,0,21,0,0,0,-142,3,25,53,830,358,0'; //Daten für den Live Graph, meist letzte Stunde
        'openWB/Verbraucher/WNr1': number; //Verbrauch 1 Leistung in Watt
        'openWB/Verbraucher/WhImportedNr1': number; //Bezugszähler in Wh
        'openWB/Verbraucher/WhExportedNr1': number; //Exportzähler in Wh
        'openWB/Verbraucher/WNr2': number; //Verbrauch 2 Leistung in Watt
        'openWB/Verbraucher/WhImportedNr2': number; //Bezugszähler in Wh
        'openWB/Verbraucher/WhExportedNr2': number; //Exportzähler in Wh
        'openWB/evu/WhExported': number; //Eingespeiste Energie in Wh (Zählerstand)
        'openWB/evu/WhImported': number; //Bezogene Energie in Wh (Zählerstand)
        'openWB/housebattery/WhExported': number; //Entladene Energie in Wh (Batterieentladung, Zählerstand)
        'openWB/housebattery/WhImported': number; //Geladene Energie in Wh (Batterieladung, Zählerstand)
        'openWB/pv/CounterTillStartPvCharging': number; //Counter für die PV Ladung
        'openWB/pv/WhCounter': number; //Zählsterstand in Wh PV erzeugte Energie
        'openWB/lp/1/PfPhase1': number; //Power Factor
        'openWB/lp/1/PfPhase2': number; //Power Factor
        'openWB/lp/1/PfPhase3': number; //Power Factor
        'openWB/evu/ASchieflast': number; //Schieflast in A am Hausübergabepunkt
        'openWB/evu/WPhase1': number; //Leistung in Watt am Hausübergabepunkt
        'openWB/evu/WPhase2': number; //Leistung in Watt am Hausübergabepunkt
        'openWB/evu/WPhase3': number; //Leistung in Watt am Hausübergabepunkt
        'openWB/strLastmanagementActive': 'string'; //Gibt an ob das Lastmanagement aktiv bzw. den String zur Ausgabe dafür

        //Jeweils für alle Ladepunkte verfügbar ######
        'openWB/lp/4/ADirectModeAmps': number; //Sofort laden Soll Stromstärke
        'openWB/lp/4/boolChargePointConfigured': number; //Gibt an ob ein zweiter Ladepunkt konfiguriert ist
        'openWB/lp/4/str/ChargePointName LP': number; //Name des Ladepunktes
        'openWB/lp/1/ChargeStatus': number; //Gibt an ob theoretisch der Ladepunkt freigegeben ist (wird von ChargePointEnabled übersteuert), Int 0 oder 1
        'openWB/lp/1/ChargePointEnabled': 0 | number; //"Master" (De-) Aktivierung eines Ladepunktes. Int 0 oder 1
        'openWB/lp/1/APhase1': number; //Stromstärke in Ampere
        'openWB/lp/1/APhase2': number; //Stromstärke in Ampere
        'openWB/lp/1/APhase3': number; //Stromstärke in Ampere
        'openWB/lp/1/VPhase1': number; //Spannung in Volt
        'openWB/lp/1/VPhase2': number; //Spannung in Volt
        'openWB/lp/1/VPhase3': number; //Spannung in Volt
        'openWB/lp/1/kWhCounter': number; //Zählerstand in Wh an Ladepunkt 1
        'openWB/lp/1/W': number; //Ladeleistung in Watt
        'openWB/lp/1/boolPlugStat': number; //Steckererkennung = steckend
        'openWB/lp/1/boolChargeStat': number; //Steckerereckennung = ladend
        'openWB/lp/1/AConfigured': number; //Ampere mit denen geladen werden soll
        'openWB/lp/1/kWhActualCharged': number; //Geladene kWh des aktuellen Ladevorgangs
        'openWB/lp/1/kWhChargedSincePlugged': number; //Geladene kWh seit letztem anstecken
        'openWB/global/ChargeMode': number; //Lademodus, 0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
    };
    SCHREIBEND: {
        'openWB/set/Lademodus': number; //0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
        'openWB/set/lp1/DirectChargeSubMode': number; //Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
        'openWB/set/lp2/DirectChargeSubMode': number; //Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
        'openWB/set/lp1/DirectChargeSoc': number; //Setzt den Sofort Laden (Direct) Untermodus SoC Wert bis zu dem geladen werden soll, Int 1 - 100
        'openWB/set/lp2/DirectChargeSoc': number; //Setzt den Sofort Laden (Direct) Untermodus SoC Wert bis zu dem geladen werden soll, Int 1 - 100

        // Jeweils für alle Ladepunkte verfügbar ######
        'openWB/set/lp1/ChargePointEnabled': tinyInt; //(De-) Aktivieren des Ladepunktes, unabhängig von gewähltem Lademodus oder Einstellungen, Int 0 oder 1
        'openWB/set/lp1/DirectChargeAmps': number; //Ampere mit denen im Sofortladen Modus geladen werden soll, Int 6-32
        'openWB/set/lp1/kWhDirectChargeToCharge': number; //Setzt die Lademenge in kWh für den Sofort Laden Untermodus Lademenge, Int 1-100
        'openWB/set/lp3/DirectChargeSubMode': tinyInt; //Ladepunkt 3-8, setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden
        'openWB/set/lp1/boolResetDirectCharge': tinyInt; //Setzt die geladene Menge auf 0 zurück für den Sofort Laden Untermodus Lademenge, Int 1
    };
};
