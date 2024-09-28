// // NAVBAR
const HomeKamL1P = document.getElementById("iconHome");
HomeKamL1P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedKamL1P(state) {
    const urlKamL1A = `http://192.168.4.100/ledL1A?state=${state}`;
    const urlKamL1P = `http://192.168.4.100/ledL1P?state=${state}`;
    fetch(urlKamL1A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlKamL1P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI KAMIS.....
function setHariKamisL1P(KamTimeIdL1P, KamDurasiIdL1P, KamSwitchIdL1P, KamNotifIdL1P, KamTimerIdL1P) {
    const KamTimeValueL1P = document.getElementById(KamTimeIdL1P).value;
    const KamDurasiValueL1P = document.getElementById(KamDurasiIdL1P).value;
    
    if (KamTimeValueL1P && KamDurasiValueL1P ) {
        const KdayL1P = 4;
        const KamDataWaktuL1P = { 
            time: KamTimeValueL1P, 
            duration: KamDurasiValueL1P, 
            KdayL1P: KdayL1P, 
            KamStartTimeL1P: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${KamTimeValueL1P}&duration=${KamDurasiValueL1P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (KamSwitchIdL1P === 'KamSwitch1L1P') {
            localStorage.setItem('KamisKondisi1L1P', JSON.stringify(KamDataWaktuL1P));
            document.getElementById(KamNotifIdL1P).innerText = `${KamTimeValueL1P}`;
            } else if (KamSwitchIdL1P === 'KamSwitch2L1P') {
            localStorage.setItem('KamisKondisi2L1P', JSON.stringify(KamDataWaktuL1P));
            document.getElementById(KamNotifIdL1P).innerText = `${KamTimeValueL1P}`;
            };
            KamTampilanWaktuL1P();
        })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function KamTampilanWaktuL1P() {
    const KamKondisi1L1P = JSON.parse(localStorage.getItem('KamisKondisi1L1P'));
    const KamKondisi2L1P = JSON.parse(localStorage.getItem('KamisKondisi2L1P'));

    if(KamKondisi1L1P){
        document.getElementById('KamTextJam1L1P').innerText = `${KamKondisi1L1P.time}`
    }
    if(KamKondisi2L1P){
        document.getElementById('KamTextJam2L1P').innerText = `${KamKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (KamKondisi1L1P) KamCekWaktuL1P(KamKondisi1L1P, 'KamSwitch1L1P', 'KamTimer1L1P');
        if (KamKondisi2L1P) KamCekWaktuL1P(KamKondisi2L1P, 'KamSwitch2L1P', 'KamTimer2L1P');
    }, 1000);
}

function KamCekWaktuL1P(KamDataWaktuL1P, KamSwitchIdL1P, KamTimerIdL1P) {
    const KamCurrentTimeL1P = new Date();
    const KamCurrentDayL1P = KamCurrentTimeL1P.getDay();
    const KamCurrentHourL1P = KamCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (KamCurrentDayL1P === KamDataWaktuL1P.KdayL1P && KamCurrentHourL1P === KamDataWaktuL1P.time) {
        if (!KamDataWaktuL1P.KamStartTimeL1P) {
            KamDataWaktuL1P.KamStartTimeL1P = new Date().toISOString();
            localStorage.setItem(KamSwitchIdL1P === 'KamSwitch1L1P' ? 'KamisKondisi1L1P' : 'KamisKondisi2L1P', JSON.stringify(KamDataWaktuL1P));
        }
        controlLedKamL1P('on');  // Nyalakan LED
        document.getElementById(KamSwitchIdL1P).checked = true;

        const KamStartTimeL1P = new Date(KamDataWaktuL1P.KamStartTimeL1P);
        const KamDetikLewatL1P = Math.floor((KamCurrentTimeL1P - KamStartTimeL1P) / 1000);
        const KamRemainingDetikL1P = KamDataWaktuL1P.duration * 60 - KamDetikLewatL1P;

        if (KamRemainingDetikL1P > 0) {
            KamStartTimerL1P(KamTimerIdL1P, KamRemainingDetikL1P, KamSwitchIdL1P);
        } else {
            KamResetWaktuL1P(KamSwitchIdL1P, KamTimerIdL1P);
        }
    }
}

function KamResetWaktuL1P(KamSwitchIdL1P, KamTimerIdL1P) {
    document.getElementById(KamSwitchIdL1P).checked = false;
    document.getElementById(KamTimerIdL1P).innerText = '';
    document.getElementById(KamTimerIdL1P).style.display = 'none';

    const KkeyL1P = KamSwitchIdL1P === 'KamSwitch1L1P' ? 'KamisKondisi1L1P' : 'KamisKondisi2L1P';
    const KamDataWaktuL1P = JSON.parse(localStorage.getItem(KkeyL1P));
    if (KamDataWaktuL1P) {
        KamDataWaktuL1P.KamStartTimeL1P = null;
        localStorage.setItem(KkeyL1P, JSON.stringify(KamDataWaktuL1P));
        controlLedKamL1P('off');  // Matikan LED
    }
}

function KamStartTimerL1P(KamTimerIdL1P, KamInSecL1P, KamSwitchIdL1P) {
    let KamRemainingWakL1P = KamInSecL1P;

    const KamTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(KamRemainingWakL1P / 60);
        const Detik = KamRemainingWakL1P % 60;

        document.getElementById(KamTimerIdL1P).style.display = 'block';
        document.getElementById(KamTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        KamRemainingWakL1P--;

        if(KamRemainingWakL1P < 0){
            clearInterval(KamTimerIntervalL1P);
            KamResetWaktuL1P(KamSwitchIdL1P, KamTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(KamRemainingWakL1P));
        }
    }, 1000);
}

window.onload = KamTampilanWaktuL1P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi1L1P');
    document.getElementById('KamTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi2L1P');
    document.getElementById('KamTextJam2L1P').innerText = 'No Time';
});