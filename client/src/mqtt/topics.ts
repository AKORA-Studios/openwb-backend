export default {
    LESEND: {
        'openWB/lp/1/TimeRemaining': 0, //verbleibende Zeit für Lademenge (Untermodus Sofort laden)
        'openWB/lp/1/%Soc': 14, //Aktueller SoC
        'openWB/lp/1/kWhDailyCharged': 0.0, //Heute geladene kWh
        'openWB/lp/1/ADirectModeAmps': 30, //Sofort laden Soll Stromstärke
        'openWB/lp/1/PercentDirectChargeModeSoc': 40, //Bis zu wieviel % im Sofort Laden Untermodus SoC geladen wird
        'openWB/lp/1/strChargePointName': 'Ioniq', //Name des Ladepunktes
        'openWB/lp/1/boolChargeAtNight': 1, //Nachtladen aktiv 1 / 0
        'openWB/lp/1/kWhDirectModeToChargekWh': 4, //Zu ladende kWh im Sofortladen Untermodus Lademenge
        'openWB/lp/1/boolDirectChargeMode_none_kwh_soc': 1, //Sofort Laden Untermodus, 0 = nein, 1 = kWH (Lademenge, 2= bis xx%SoC)
        'openWB/lp/2/TimeRemaining': '5 Min',
        'openWB/lp/2/ADirectModeAmps': 18,
        'openWB/lp/2/boolChargePointConfigured': 1, //Gibt an ob ein zweiter Ladepunkt konfiguriert ist
        'openWB/lp/1/boolDirectModeChargekWh': 0, //Gibt an ob der Sofort Laden Untermodus Lademenge aktiv ist
        'openWB/pv/W': 0, //PV Leistung in Watt, Erzeugung ist negativ
        'openWB/evu/W': 5949, //Leistung am Hausübergabepunkt, Bezug ist positiv, Einspeisung negativ
        'openWB/evu/APhase3': 15, //A an Phase 3 am Hausanschluss
        'openWB/evu/APhase1': 5, //A an Phase 1 am Hausanschluss
        'openWB/evu/APhase2': 6, //A an Phase 2 am Hausanschluss
        'openWB/housebattery/W': -7, //Batterieleistung in Watt, negativ = Einspeisung/Entladung, positiv = Ladung
        'openWB/housebattery/%Soc': 1, //SoC des Speichers
        'openWB/global/WHouseConsumption': 4368, //Hausverbrauch (errechnet aus PV, EVU, EV, Speicher) in Watt
        'openWB/global/WAllChargePoints': 1588, //Leistung aller Ladepunkte zusammen
        'openWB/boolChargeAtNight_direct': 0, //Gibt an ob Nachtladen im Sofort laden Modus aktiv ist
        'openWB/boolChargeAtNight_nurpv': 0, //Gibt an ob Nachtladen im Nur PV Modus aktiv ist
        'openWB/boolChargeAtNight_minpv': 0, //Gibt an ob Nachtladen im Min + PV Modus aktiv ist
        'openWB/boolDisplayHouseConsumption': 1, //Gibt an ob der Hausverbrauch angezeigt werden soll
        'openWB/boolDisplayDailyCharged': 1, //Gibt an ob „Heute geladen“ angezeigt werden soll
        'openWB/boolEvuSmoothedActive': 0, //Gibt an ob die EVU Glättung aktiv ist
        'openWB/boolDisplayHouseBatteryPriority': 0, //Gibt an ob die EV / Speicher bevorrangung im UI angezeigt werden soll
        'openWB/graph/lastlivevalues':
            '19:35:56,5949,1588,0,0,1588,1588,-7,1,14,24,4368,358,0', //Daten für den Live Graph, gibt nur die neusten Daten wieder. Aufbau: Time,EVU,LadeleistungGesamt,PV,Ladeleistung LP2,Ladeleistung LP3, Speicherleistung, SpeicherSoC, SoC Lp1, SoC lp2, Hausverbrauch, Verbraucher' :1, Verbraucher 2
        'openWB/graph/alllivevalues':
            '18:36:06,667,0,21,0,0,0,-142,3,25,53,830,358,0', //Daten für den Live Graph, meist letzte Stunde
        'openWB/Verbraucher/WNr1': 0, //Verbrauch 1 Leistung in Watt
        'openWB/Verbraucher/WhImportedNr1': 0, //Bezugszähler in Wh
        'openWB/Verbraucher/WhExportedNr1': 0, //Exportzähler in Wh
        'openWB/Verbraucher/WNr2': 0, //Verbrauch 2 Leistung in Watt
        'openWB/Verbraucher/WhImportedNr2': 0, //Bezugszähler in Wh
        'openWB/Verbraucher/WhExportedNr2': 0, //Exportzähler in Wh
        'openWB/evu/WhExported': 0, //Eingespeiste Energie in Wh (Zählerstand)
        'openWB/evu/WhImported': 0, //Bezogene Energie in Wh (Zählerstand)
        'openWB/housebattery/WhExported': 0, //Entladene Energie in Wh (Batterieentladung, Zählerstand)
        'openWB/housebattery/WhImported': 0, //Geladene Energie in Wh (Batterieladung, Zählerstand)
        'openWB/pv/CounterTillStartPvCharging': 0, //Counter für die PV Ladung
        'openWB/pv/WhCounter': 0, //Zählsterstand in Wh PV erzeugte Energie
        'openWB/lp/1/PfPhase1': 0, //Power Factor
        'openWB/lp/1/PfPhase2': 0, //Power Factor
        'openWB/lp/1/PfPhase3': 0, //Power Factor
        'openWB/evu/ASchieflast': 0, //Schieflast in A am Hausübergabepunkt
        'openWB/evu/WPhase1': 0, //Leistung in Watt am Hausübergabepunkt
        'openWB/evu/WPhase2': 0, //Leistung in Watt am Hausübergabepunkt
        'openWB/evu/WPhase3': 0, //Leistung in Watt am Hausübergabepunkt
        'openWB/strLastmanagementActive': 'string', //Gibt an ob das Lastmanagement aktiv bzw. den String zur Ausgabe dafür

        //Jeweils für alle Ladepunkte verfügbar ######
        'openWB/lp/4/ADirectModeAmps': 30, //Sofort laden Soll Stromstärke
        'openWB/lp/4/boolChargePointConfigured': 1, //Gibt an ob ein zweiter Ladepunkt konfiguriert ist
        'openWB/lp/4/str/ChargePointName LP': 4, //Name des Ladepunktes
        'openWB/lp/1/ChargeStatus': 0, //Gibt an ob theoretisch der Ladepunkt freigegeben ist (wird von ChargePointEnabled übersteuert), Int 0 oder 1
        'openWB/lp/1/ChargePointEnabled': 0 | 1, //"Master" (De-) Aktivierung eines Ladepunktes. Int 0 oder 1
        'openWB/lp/1/APhase1': 0, //Stromstärke in Ampere
        'openWB/lp/1/APhase2': 0, //Stromstärke in Ampere
        'openWB/lp/1/APhase3': 0, //Stromstärke in Ampere
        'openWB/lp/1/VPhase1': 0, //Spannung in Volt
        'openWB/lp/1/VPhase2': 0, //Spannung in Volt
        'openWB/lp/1/VPhase3': 0, //Spannung in Volt
        'openWB/lp/1/kWhCounter': 0, //Zählerstand in Wh an Ladepunkt 1
        'openWB/lp/1/W': 0, //Ladeleistung in Watt
        'openWB/lp/1/boolPlugStat': 1, //Steckererkennung = steckend
        'openWB/lp/1/boolChargeStat': 1, //Steckerereckennung = ladend
        'openWB/lp/1/AConfigured': 8, //Ampere mit denen geladen werden soll
        'openWB/lp/1/kWhActualCharged': 0.64, //Geladene kWh des aktuellen Ladevorgangs
        'openWB/lp/1/kWhChargedSincePlugged': 4.44, //Geladene kWh seit letztem anstecken
        'openWB/global/ChargeMode': 0, //Lademodus, 0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
    },
    SCHREIBEND: {
        'openWB/set/Lademodus': 0, //0 = Sofort Laden (Direct), 1 = Min und PV, 2 = Nur PV, 3 = Stop, 4 = Standby
        'openWB/set/lp1/DirectChargeSubMode': 0, //Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
        'openWB/set/lp2/DirectChargeSubMode': 0, //Setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden, 2 = SoC Laden
        'openWB/set/lp1/DirectChargeSoc': 0, //Setzt den Sofort Laden (Direct) Untermodus SoC Wert bis zu dem geladen werden soll, Int 1 - 100

        // Jeweils für alle Ladepunkte verfügbar ######
        'openWB/set/lp1/ChargePointEnabled': 0, //(De-) Aktivieren des Ladepunktes, unabhängig von gewähltem Lademodus oder Einstellungen, Int 0 oder 1
        'openWB/set/lp1/DirectChargeAmps': 0, //Ampere mit denen im Sofortladen Modus geladen werden soll, Int 6-32
        'openWB/set/lp1/kWhDirectChargeToCharge': 0, //Setzt die Lademenge in kWh für den Sofort Laden Untermodus Lademenge, Int 1-100
        'openWB/set/lp3/DirectChargeSubMode': 0, //Ladepunkt 3-8, setzt den Sofort Laden (Direct) Untermodus, Int 0 = Aus, 1 = kWh Laden
        'openWB/set/lp1/boolResetDirectCharge': 0, //Setzt die geladene Menge auf 0 zurück für den Sofort Laden Untermodus Lademenge, Int 1
    },
};
