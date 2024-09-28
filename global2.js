//LATERAL 1A
//MINGGU
function globalTimerCheckMinL1A() {
    const MinKondisi1L1A = JSON.parse(localStorage.getItem('MingguKondisi1L1A'));
    const MinKondisi2L1A = JSON.parse(localStorage.getItem('MingguKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (MinKondisi1L1A && currentDay === MinKondisi1L1A.MdayL1A && currentTime === MinKondisi1L1A.time) {
        MinCekWaktuL1A(MinKondisi1L1A, 'MinTimer1L1A');
        controlLedMinL1A('on');  // Nyalakan LED
    }if (MinKondisi2L1A && currentDay === MinKondisi2L1A.MdayL1A && currentTime === MinKondisi2L1A.time) {
        MinCekWaktuL1A(MinKondisi2L1A, 'MinTimer2L1A');
        controlLedMinL1A('on');  // Nyalakan LED
    }else{
        controlLedMinL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckMinL1A, 1000);

//Senin
function globalTimerCheckSenL1A() {
    const SenKondisi1L1A = JSON.parse(localStorage.getItem('SeninKondisi1L1A'));
    const SenKondisi2L1A = JSON.parse(localStorage.getItem('SeninKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SenKondisi1L1A && currentDay === SenKondisi1L1A.SndayL1A && currentTime === SenKondisi1L1A.time) {
        SenCekWaktuL1A(SenKondisi1L1A, 'SenTimer1L1A');
        controlLedSenL1A('on');  // Nyalakan LED
    }if (SenKondisi2L1A && currentDay === SenKondisi2L1A.SndayL1A && currentTime === SenKondisi2L1A.time) {
        SenCekWaktuL1A(SenKondisi2L1A, 'SenTimer2L1A');
        controlLedSenL1A('on');  // Nyalakan LED
    }else{
        console.log("Mati bang")
        controlLedSenL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSenL1A, 1000);

// SELASA
function globalTimerCheckSelL1A() {
    const SelKondisi1L1A = JSON.parse(localStorage.getItem('SelasaKondisi1L1A'));
    const SelKondisi2L1A = JSON.parse(localStorage.getItem('SelasaKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SelKondisi1L1A && currentDay === SelKondisi1L1A.SdayL1A && currentTime === SelKondisi1L1A.time) {
        SelCekWaktuL1A(SelKondisi1L1A, 'SelTimer1L1A');
        controlLedSelL1A('on');  // Nyalakan LED
    }if (SelKondisi2L1A && currentDay === SelKondisi2L1A.SdayL1A && currentTime === SelKondisi2L1A.time) {
        SelCekWaktuL1A(SelKondisi2L1A, 'SelTimer2L1A');
        controlLedSelL1A('on');  // Nyalakan LED
    }else{
        controlLedSelL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSelL1A, 1000);

//RABU
function globalTimerCheckRabL1A() {
    const RabKondisi1L1A = JSON.parse(localStorage.getItem('RabuKondisi1L1A'));
    const RabKondisi2L1A = JSON.parse(localStorage.getItem('RabuKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (RabKondisi1L1A && currentDay === RabKondisi1L1A.RdayL1A && currentTime === RabKondisi1L1A.time) {
        RabCekWaktuL1A(RabKondisi1L1A, 'RabTimer1L1A');
        controlLedRabL1A('on');  // Nyalakan LED
    }if (RabKondisi2L1A && currentDay === RabKondisi2L1A.RdayL1A && currentTime === RabKondisi2L1A.time) {
        RabCekWaktuL1A(RabKondisi2L1A, 'RabTimer2L1A');
        controlLedRabL1A('on');  // Nyalakan LED
    }else{
        controlLedRabL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckRabL1A, 1000);

//KAMIS
function globalTimerCheckKamL1A() {
    const KamKondisi1L1A = JSON.parse(localStorage.getItem('KamisKondisi1L1A'));
    const KamKondisi2L1A = JSON.parse(localStorage.getItem('KamisKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (KamKondisi1L1A && currentDay === KamKondisi1L1A.KdayL1A && currentTime === KamKondisi1L1A.time) {
        KamCekWaktuL1A(KamKondisi1L1A, 'KamTimer1L1A');
        controlLedKamL1A('on');  // Nyalakan LED
    }if (KamKondisi2L1A && currentDay === KamKondisi2L1A.KdayL1A && currentTime === KamKondisi2L1A.time) {
        KamCekWaktuL1A(KamKondisi2L1A, 'KamTimer2L1A');
        controlLedKamL1A('on');  // Nyalakan LED
    }else{
        controlLedKamL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckKamL1A, 1000);

//JUMAT
function globalTimerCheckJumL1A() {
    const JumKondisi1L1A = JSON.parse(localStorage.getItem('JumatKondisi1L1A'));
    const JumKondisi2L1A = JSON.parse(localStorage.getItem('JumatKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (JumKondisi1L1A && currentDay === JumKondisi1L1A.JdayL1A && currentTime === JumKondisi1L1A.time) {
        JumCekWaktuL1A(JumKondisi1L1A, 'JumTimer1L1A');
        controlLedJumL1A('on');  // Nyalakan LED
    }if (JumKondisi2L1A && currentDay === JumKondisi2L1A.JdayL1A && currentTime === JumKondisi2L1A.time) {
        JumCekWaktuL1A(JumKondisi2L1A, 'JumTimer2L1A');
        controlLedJumL1A('on');  // Nyalakan LED
    }else{
        controlLedJumL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckJumL1A, 1000);

//SABTU
function globalTimerCheckSabL1A() {
    const SabKondisi1L1A = JSON.parse(localStorage.getItem('SabtuKondisi1L1A'));
    const SabKondisi2L1A = JSON.parse(localStorage.getItem('SabtuKondisi2L1A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SabKondisi1L1A && currentDay === SabKondisi1L1A.SbdayL1A && currentTime === SabKondisi1L1A.time) {
        SabCekWaktuL1A(SabKondisi1L1A, 'SabTimer1L1A');
        controlLedSabL1A('on');  // Nyalakan LED
    }if(SabKondisi2L1A && currentDay === SabKondisi2L1A.SbdayL1A && currentTime === SabKondisi2L1A.time) {
        SabCekWaktuL1A(SabKondisi2L1A, 'SabTimer2L1A');
        controlLedSabL1A('on');  // Nyalakan LED
    }else{
        controlLedSabL1A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSabL1A, 1000);


//LATERAL 1P
//MINGGU
function globalTimerCheckMinL1P() {
    const MinKondisi1L1P = JSON.parse(localStorage.getItem('MingguKondisi1L1P'));
    const MinKondisi2L1P = JSON.parse(localStorage.getItem('MingguKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (MinKondisi1L1P && currentDay === MinKondisi1L1P.MdayL1P && currentTime === MinKondisi1L1P.time) {
        MinCekWaktuL1P(MinKondisi1L1P, 'MinTimer1L1P');
        controlLedMinL1P('on');  // Nyalakan LED
    }if (MinKondisi2L1P && currentDay === MinKondisi2L1P.MdayL1P && currentTime === MinKondisi2L1P.time) {
        MinCekWaktuL1P(MinKondisi2L1P, 'MinTimer2L1P');
        controlLedMinL1P('on');  // Nyalakan LED
    }else{
        controlLedMinL1P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckMinL1P, 1000);

//Senin
function globalTimerCheckSenL1P() {
    const SenKondisi1L1P = JSON.parse(localStorage.getItem('SeninKondisi1L1P'));
    const SenKondisi2L1P = JSON.parse(localStorage.getItem('SeninKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SenKondisi1L1P && currentDay === SenKondisi1L1P.SndayL1P && currentTime === SenKondisi1L1P.time) {
        SenCekWaktuL1P(SenKondisi1L1P, 'SenTimer1L1P');
        controlLedSenL1P('on');  // Nyalakan LED
    }if (SenKondisi2L1P && currentDay === SenKondisi2L1P.SndayL1P && currentTime === SenKondisi2L1P.time) {
        SenCekWaktuL1P(SenKondisi2L1P, 'SenTimer2L1P');
        controlLedSenL1P('on');  // Nyalakan LED
    }else{
        controlLedSenL1P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSenL1P, 1000);

// SELASA
function globalTimerCheckSelL1P() {
    const SelKondisi1L1P = JSON.parse(localStorage.getItem('SelasaKondisi1L1P'));
    const SelKondisi2L1P = JSON.parse(localStorage.getItem('SelasaKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SelKondisi1L1P && currentDay === SelKondisi1L1P.SdayL1P && currentTime === SelKondisi1L1P.time) {
        SelCekWaktuL1P(SelKondisi1L1P, 'SelTimer1L1P');
        controlLedSelL1P('on');  // Nyalakan LED
    }if (SelKondisi2L1P && currentDay === SelKondisi2L1P.SdayL1P && currentTime === SelKondisi2L1P.time) {
        SelCekWaktuL1P(SelKondisi2L1P, 'SelTimer2L1P');
        controlLedSelL1P('on');  // Nyalakan LED
    }else{
        controlLedSelL1P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSelL1P, 1000);

//RABU
function globalTimerCheckRabL1P() {
    const RabKondisi1L1P = JSON.parse(localStorage.getItem('RabuKondisi1L1P'));
    const RabKondisi2L1P = JSON.parse(localStorage.getItem('RabuKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (RabKondisi1L1P && currentDay === RabKondisi1L1P.RdayL1P && currentTime === RabKondisi1L1P.time) {
        RabCekWaktuL1P(RabKondisi1L1P, 'RabTimer1L1P');
        controlLedRabL1P('on');  // Nyalakan LED
    }if (RabKondisi2L1P && currentDay === RabKondisi2L1P.RdayL1P && currentTime === RabKondisi2L1P.time) {
        RabCekWaktuL1P(RabKondisi2L1P, 'RabTimer2L1P');
        controlLedRabL1P('on');  // Nyalakan LED
    }else{
        controlLedRabL1P('off');  // Matikan LED
    };

}
setInterval(globalTimerCheckRabL1P, 1000);

//KAMIS
function globalTimerCheckKamL1P() {
    const KamKondisi1L1P = JSON.parse(localStorage.getItem('KamisKondisi1L1P'));
    const KamKondisi2L1P = JSON.parse(localStorage.getItem('KamisKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (KamKondisi1L1P && currentDay === KamKondisi1L1P.KdayL1P && currentTime === KamKondisi1L1P.time) {
        KamCekWaktuL1P(KamKondisi1L1P, 'KamTimer1L1P');
        controlLedKamL1P('on');  // Nyalakan LED
    }if (KamKondisi2L1P && currentDay === KamKondisi2L1P.KdayL1P && currentTime === KamKondisi2L1P.time) {
        KamCekWaktuL1P(KamKondisi2L1P, 'KamTimer2L1P');
        controlLedKamL1P('on');  // Nyalakan LED
    }else{
        controlLedKamL1P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckKamL1P, 1000);

//JUMAT
function globalTimerCheckJumL1P() {
    const JumKondisi1L1P = JSON.parse(localStorage.getItem('JumatKondisi1L1P'));
    const JumKondisi2L1P = JSON.parse(localStorage.getItem('JumatKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (JumKondisi1L1P && currentDay === JumKondisi1L1P.JdayL1P && currentTime === JumKondisi1L1P.time) {
        JumCekWaktuL1P(JumKondisi1L1P, 'JumTimer1L1P');
        controlLedJumL1P('on');  // Nyalakan LED
    }if (JumKondisi2L1P && currentDay === JumKondisi2L1P.JdayL1P && currentTime === JumKondisi2L1P.time) {
        JumCekWaktuL1P(JumKondisi2L1P, 'JumTimer2L1P');
        controlLedJumL1P('on');  // Nyalakan LED
    }else{
        controlLedJumL1P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckJumL1P, 1000);

//SABTU
function globalTimerCheckSabL1P() {
    const SabKondisi1L1P = JSON.parse(localStorage.getItem('SabtuKondisi1L1P'));
    const SabKondisi2L1P = JSON.parse(localStorage.getItem('SabtuKondisi2L1P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SabKondisi1L1P && currentDay === SabKondisi1L1P.SbdayL1P && currentTime === SabKondisi1L1P.time) {
        SabCekWaktuL1P(SabKondisi1L1P, 'SabTimer1L1P');
        controlLedSabL1P('on');  // Nyalakan LED
    }if (SabKondisi2L1P && currentDay === SabKondisi2L1P.SbdayL1P && currentTime === SabKondisi2L1P.time) {
        SabCekWaktuL1P(SabKondisi2L1P, 'SabTimer2L1P');
        controlLedSabL1P('on');  // Nyalakan LED
    }else{
        controlLedSabL1P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSabL1P, 1000);

//LATERAL 2A
//MINGGU
function globalTimerCheckMinL2A() {
    const MinKondisi1L2A = JSON.parse(localStorage.getItem('MingguKondisi1L2A'));
    const MinKondisi2L2A = JSON.parse(localStorage.getItem('MingguKondisi2L2A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (MinKondisi1L2A && currentDay === MinKondisi1L2A.MdayL2A && currentTime === MinKondisi1L2A.time) {
        MinCekWaktuL2A(MinKondisi1L2A, 'MinTimer1L2A');
        controlLedMinL2A('on');  // Nyalakan LED
    }if (MinKondisi2L2A && currentDay === MinKondisi2L2A.MdayL2A && currentTime === MinKondisi2L2A.time) {
        MinCekWaktuL2A(MinKondisi2L2A, 'MinTimer2L2A');
        controlLedMinL2A('on');  // Nyalakan LED
    }else{
        controlLedMinL2A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckMinL2A, 1000);

//Senin
function globalTimerCheckSenL2A() {
    const SenKondisi1L2A = JSON.parse(localStorage.getItem('SeninKondisi1L2A'));
    const SenKondisi2L2A = JSON.parse(localStorage.getItem('SeninKondisi2L2A'));
    const WaktuHabis = JSON.parse(localStorage.getItem("TimerEnd"))
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SenKondisi1L2A && currentDay === SenKondisi1L2A.SndayL2A && currentTime === SenKondisi1L2A.time) {
        SenCekWaktuL2A(SenKondisi1L2A, 'SenTimer1L2A');
        controlLedSenL2A('on');  // Nyalakan LED
    }if (SenKondisi2L2A && currentDay === SenKondisi2L2A.SndayL2A && currentTime === SenKondisi2L2A.time) {
        SenCekWaktuL2A(SenKondisi2L2A, 'SenTimer2L2A');
        controlLedSenL2A('on');  // Nyalakan LED
    }else{
        controlLedSenL2A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSenL2A, 1000);

// SELASA
function globalTimerCheckSelL2A() {
    const SelKondisi1L2A = JSON.parse(localStorage.getItem('SelasaKondisi1L2A'));
    const SelKondisi2L2A = JSON.parse(localStorage.getItem('SelasaKondisi2L2A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SelKondisi1L2A && currentDay === SelKondisi1L2A.SdayL2A && currentTime === SelKondisi1L2A.time) {
        SelCekWaktuL2A(SelKondisi1L2A, 'SelTimer1L2A');
        controlLedSelL2A('on');  // Nyalakan LED
    }if (SelKondisi2L2A && currentDay === SelKondisi2L2A.SdayL2A && currentTime === SelKondisi2L2A.time) {
        SelCekWaktuL2A(SelKondisi2L2A, 'SelTimer2L2A');
        controlLedSelL2A('on');  // Nyalakan LED
    }else{
        controlLedSelL2A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSelL2A, 1000);

//RABU
function globalTimerCheckRabL2A() {
    const RabKondisi1L2A = JSON.parse(localStorage.getItem('RabuKondisi1L2A'));
    const RabKondisi2L2A = JSON.parse(localStorage.getItem('RabuKondisi2L2A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (RabKondisi1L2A && currentDay === RabKondisi1L2A.RdayL2A && currentTime === RabKondisi1L2A.time) {
        RabCekWaktuL2A(RabKondisi1L2A,'RabTimer1L2A');
        controlLedRabL2A('on');  // Nyalakan LED
    }if (RabKondisi2L2A && currentDay === RabKondisi2L2A.RdayL2A && currentTime === RabKondisi2L2A.time) {
        RabCekWaktuL2A(RabKondisi2L2A, 'RabTimer2L2A');
        controlLedRabL2A('on');  // Nyalakan LED
    }else{
        controlLedRabL2A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckRabL2A, 1000);

//KAMIS
function globalTimerCheckKamL2A() {
    const KamKondisi1L2A = JSON.parse(localStorage.getItem('KamisKondisi1L2A'));
    const KamKondisi2L2A = JSON.parse(localStorage.getItem('KamisKondisi2L2A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (KamKondisi1L2A && currentDay === KamKondisi1L2A.KdayL2A && currentTime === KamKondisi1L2A.time) {
        KamCekWaktuL2A(KamKondisi1L2A, 'KamTimer1L2A');
        controlLedKamL2A('on');  // Nyalakan LED
    }if (KamKondisi2L2A && currentDay === KamKondisi2L2A.KdayL2A && currentTime === KamKondisi2L2A.time) {
        KamCekWaktuL2A(KamKondisi2L2A, 'KamTimer2L2A');
        controlLedKamL2A('on');  // Nyalakan LED
    }else{
        controlLedKamL2A('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckKamL2A, 1000);

//JUMAT
function globalTimerCheckJumL2A() {
    const JumKondisi1L2A = JSON.parse(localStorage.getItem('JumatKondisi1L2A'));
    const JumKondisi2L2A = JSON.parse(localStorage.getItem('JumatKondisi2L2A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (JumKondisi1L2A && currentDay === JumKondisi1L2A.JdayL2A && currentTime === JumKondisi1L2A.time) {
        JumCekWaktuL2A(JumKondisi1L2A, 'JumTimer1L2A');
        controlLedJumL2A('on');  // Nyalakan LED
    }if (JumKondisi2L2A && currentDay === JumKondisi2L2A.JdayL2A && currentTime === JumKondisi2L2A.time) {
        JumCekWaktuL2A(JumKondisi2L2A, 'JumTimer2L2A');
        controlLedJumL2A('on');  // Nyalakan LED
    }else{
        controlLedJumL2A('off');  // Matikan LED
    }
}
setInterval(globalTimerCheckJumL2A, 1000);

//SABTU
function globalTimerCheckSabL2A() {
    const SabKondisi1L2A = JSON.parse(localStorage.getItem('SabtuKondisi1L2A'));
    const SabKondisi2L2A = JSON.parse(localStorage.getItem('SabtuKondisi2L2A'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SabKondisi1L2A && currentDay === SabKondisi1L2A.SbdayL2A && currentTime === SabKondisi1L2A.time) {
        SabCekWaktuL2A(SabKondisi1L2A,'SabTimer1L2A');
        controlLedSabL2A('on');  // Nyalakan LED
    }if (SabKondisi2L2A && currentDay === SabKondisi2L2A.SbdayL2A && currentTime === SabKondisi2L2A.time) {
        SabCekWaktuL2A(SabKondisi2L2A, 'SabTimer2L2A');
        controlLedSabL2A('on');  // Nyalakan LED
    }else{
        controlLedSabL2A('off');  // Matikan LED
    }
}
setInterval(globalTimerCheckSabL2A, 1000);


//LATERAL 2P
//MINGGU
function globalTimerCheckMinL2P() {
    const MinKondisi1L2P = JSON.parse(localStorage.getItem('MingguKondisi1L2P'));
    const MinKondisi2L2P = JSON.parse(localStorage.getItem('MingguKondisi2L2P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (MinKondisi1L2P && currentDay === MinKondisi1L2P.MdayL2P && currentTime === MinKondisi1L2P.time) {
        MinCekWaktuL2P(MinKondisi1L2P, 'MinTimer1L2P');
        controlLedMinL2P('on');  // Nyalakan LED
    }if (MinKondisi2L2P && currentDay === MinKondisi2L2P.MdayL2P && currentTime === MinKondisi2L2P.time) {
        MinCekWaktuL2P(MinKondisi2L2P, 'MinTimer2L2P');
        controlLedMinL2P('on');  // Nyalakan LED
    }else{
        controlLedMinL2P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckMinL2P, 1000);

//Senin
function globalTimerCheckSenL2P() {
    const SenKondisi1L2P = JSON.parse(localStorage.getItem('SeninKondisi1L2P'));
    const SenKondisi2L2P = JSON.parse(localStorage.getItem('SeninKondisi2L2P'));
    const WaktuHabis = JSON.parse(localStorage.getItem("TimerEnd"))
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SenKondisi1L2P && currentDay === SenKondisi1L2P.SndayL2P && currentTime === SenKondisi1L2P.time) {
        SenCekWaktuL2P(SenKondisi1L2P, 'SenTimer1L2P');
        controlLedSenL2P('on');  // Nyalakan LED
    }if (SenKondisi2L2P && currentDay === SenKondisi2L2P.SndayL2P && currentTime === SenKondisi2L2P.time) {
        SenCekWaktuL2P(SenKondisi2L2P, 'SenTimer2L2P');
        controlLedSenL2P('on');  // Nyalakan LED
    }else if('TimerEnd'){
        console.log("Mati bang")
        controlLedSenL2P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSenL2P, 1000);

// SELASA
function globalTimerCheckSelL2P() {
    const SelKondisi1L2P = JSON.parse(localStorage.getItem('SelasaKondisi1L2P'));
    const SelKondisi2L2P = JSON.parse(localStorage.getItem('SelasaKondisi2L2P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SelKondisi1L2P && currentDay === SelKondisi1L2P.SdayL2P && currentTime === SelKondisi1L2P.time) {
        SelCekWaktuL2P(SelKondisi1L2P, 'SelTimer1L2P');
        controlLedSelL2P('on');  // Nyalakan LED
    }if (SelKondisi2L2P && currentDay === SelKondisi2L2P.SdayL2P && currentTime === SelKondisi2L2P.time) {
        SelCekWaktuL2P(SelKondisi2L2P, 'SelTimer2L2P');
        controlLedSelL2P('on');  // Nyalakan LED
    }else{
        controlLedSelL2P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckSelL2P, 1000);

//RABU
function globalTimerCheckRabL2P() {
    const RabKondisi1L2P = JSON.parse(localStorage.getItem('RabuKondisi1L2P'));
    const RabKondisi2L2P = JSON.parse(localStorage.getItem('RabuKondisi2L2P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (RabKondisi1L2P && currentDay === RabKondisi1L2P.RdayL2P && currentTime === RabKondisi1L2P.time) {
        RabCekWaktuL2P(RabKondisi1L2P,'RabTimer1L2P');
        controlLedRabL2P('on');  // Nyalakan LED
    }if (RabKondisi2L2P && currentDay === RabKondisi2L2P.RdayL2P && currentTime === RabKondisi2L2P.time) {
        RabCekWaktuL2P(RabKondisi2L2P, 'RabTimer2L2P');
        controlLedRabL2P('on');  // Nyalakan LED
    }else{
        controlLedRabL2P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckRabL2P, 1000);

//KAMIS
function globalTimerCheckKamL2P() {
    const KamKondisi1L2P = JSON.parse(localStorage.getItem('KamisKondisi1L2P'));
    const KamKondisi2L2P = JSON.parse(localStorage.getItem('KamisKondisi2L2P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (KamKondisi1L2P && currentDay === KamKondisi1L2P.KdayL2P && currentTime === KamKondisi1L2P.time) {
        KamCekWaktuL2P(KamKondisi1L2P, 'KamTimer1L2P');
        controlLedKamL2P('on');  // Nyalakan LED
    }if (KamKondisi2L2P && currentDay === KamKondisi2L2P.KdayL2P && currentTime === KamKondisi2L2P.time) {
        KamCekWaktuL2P(KamKondisi2L2P, 'KamTimer2L2P');
        controlLedKamL2P('on');  // Nyalakan LED
    }else{
        controlLedKamL2P('off');  // Matikan LED
    };
}
setInterval(globalTimerCheckKamL2P, 1000);

//JUMAT
function globalTimerCheckJumL2P() {
    const JumKondisi1L2P = JSON.parse(localStorage.getItem('JumatKondisi1L2P'));
    const JumKondisi2L2P = JSON.parse(localStorage.getItem('JumatKondisi2L2P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (JumKondisi1L2P && currentDay === JumKondisi1L2P.JdayL2P && currentTime === JumKondisi1L2P.time) {
        JumCekWaktuL2P(JumKondisi1L2P, 'JumTimer1L2P');
        controlLedJumL2P('on');  // Nyalakan LED
    }if (JumKondisi2L2P && currentDay === JumKondisi2L2P.JdayL2P && currentTime === JumKondisi2L2P.time) {
        JumCekWaktuL2P(JumKondisi2L2P, 'JumTimer2L2P');
        controlLedJumL2P('on');  // Nyalakan LED
    }else{
        controlLedJumL2P('off');  // Matikan LED
    }
}
setInterval(globalTimerCheckJumL2P, 1000);

//SABTU
function globalTimerCheckSabL2P() {
    const SabKondisi1L2P = JSON.parse(localStorage.getItem('SabtuKondisi1L2P'));
    const SabKondisi2L2P = JSON.parse(localStorage.getItem('SabtuKondisi2L2P'));
    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    if (SabKondisi1L2P && currentDay === SabKondisi1L2P.SbdayL2P && currentTime === SabKondisi1L2P.time) {
        SabCekWaktuL2P(SabKondisi1L2P,'SabTimer1L2P');
        controlLedSabL2P('on');  // Nyalakan LED
    }if (SabKondisi2L2P && currentDay === SabKondisi2L2P.SbdayL2P && currentTime === SabKondisi2L2P.time) {
        SabCekWaktuL2P(SabKondisi2L2P, 'SabTimer2L2P');
        controlLedSabL2P('on');  // Nyalakan LED
    }else{
        controlLedSabL2P('off');  // Matikan LED
    }
}
setInterval(globalTimerCheckSabL2P, 1000);
