// NAVBAR
const HomeKamL2P = document.getElementById("iconHome");
HomeKamL2P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedKamL2P(state) {
    const urlKamL2A = `http://192.168.4.100/ledL2A?state=${state}`;
    const urlKamL2P = `http://192.168.4.100/ledL2P?state=${state}`;
    fetch(urlKamL2A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlKamL2P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI KAMIS.....
function setHariKamisL2P(KamTimeIdL2P, KamDurasiIdL2P, KamSwitchIdL2P, KamNotifIdL2P, KamTimerIdL2P) {
    const KamTimeValueL2P = document.getElementById(KamTimeIdL2P).value;
    const KamDurasiValueL2P = document.getElementById(KamDurasiIdL2P).value;
    
    if (KamTimeValueL2P && KamDurasiValueL2P ) {
        const KdayL2P = 4;
        const KamDataWaktuL2P = { 
            time: KamTimeValueL2P, 
            duration: KamDurasiValueL2P, 
            KdayL2P: KdayL2P, 
            KamStartTimeL2P: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${KamTimeValueL2P}&duration=${KamDurasiValueL2P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (KamSwitchIdL2P === 'KamSwitch1L2P') {
            localStorage.setItem('KamisKondisi1L2P', JSON.stringify(KamDataWaktuL2P));
            document.getElementById(KamNotifIdL2P).innerText = `${KamTimeValueL2P}`;
            } else if (KamSwitchIdL2P === 'KamSwitch2L2P') {
            localStorage.setItem('KamisKondisi2L2P', JSON.stringify(KamDataWaktuL2P));
            document.getElementById(KamNotifIdL2P).innerText = `${KamTimeValueL2P}`;
            };
            KamTampilanWaktuL2P();
        })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function KamTampilanWaktuL2P() {
    const KamKondisi1L2P = JSON.parse(localStorage.getItem('KamisKondisi1L2P'));
    const KamKondisi2L2P = JSON.parse(localStorage.getItem('KamisKondisi2L2P'));

    if(KamKondisi1L2P){
        document.getElementById('KamTextJam1L2P').innerText = `${KamKondisi1L2P.time}`
    }
    if(KamKondisi2L2P){
        document.getElementById('KamTextJam2L2P').innerText = `${KamKondisi2L2P.time}`
    }

    setInterval(() =>{
        if (KamKondisi1L2P) KamCekWaktuL2P(KamKondisi1L2P, 'KamSwitch1L2P', 'KamTimer1L2P');
        if (KamKondisi2L2P) KamCekWaktuL2P(KamKondisi2L2P, 'KamSwitch2L2P', 'KamTimer2L2P');
    }, 1000);
}

function KamCekWaktuL2P(KamDataWaktuL2P, KamSwitchIdL2P, KamTimerIdL2P) {
    const KamCurrentTimeL2P = new Date();
    const KamCurrentDayL2P = KamCurrentTimeL2P.getDay();
    const KamCurrentHourL2P = KamCurrentTimeL2P.toTimeString().slice(0, 5); 

    if (KamCurrentDayL2P === KamDataWaktuL2P.KdayL2P && KamCurrentHourL2P === KamDataWaktuL2P.time) {
        if (!KamDataWaktuL2P.KamStartTimeL2P) {
            KamDataWaktuL2P.KamStartTimeL2P = new Date().toISOString();
            localStorage.setItem(KamSwitchIdL2P === 'KamSwitch1L2P' ? 'KamisKondisi1L2P' : 'KamisKondisi2L2P', JSON.stringify(KamDataWaktuL2P));
        }
        controlLedKamL2P('on');  // Nyalakan LED
        document.getElementById(KamSwitchIdL2P).checked = true;

        const KamStartTimeL2P = new Date(KamDataWaktuL2P.KamStartTimeL2P);
        const KamDetikLewatL2P = Math.floor((KamCurrentTimeL2P - KamStartTimeL2P) / 1000);
        const KamRemainingDetikL2P = KamDataWaktuL2P.duration * 60 - KamDetikLewatL2P;

        if (KamRemainingDetikL2P > 0) {
            KamStartTimerL2P(KamTimerIdL2P, KamRemainingDetikL2P, KamSwitchIdL2P);
        } else {
            KamResetWaktuL2P(KamSwitchIdL2P, KamTimerIdL2P);
        }
    }
}

function KamResetWaktuL2P(KamSwitchIdL2P, KamTimerIdL2P) {
    document.getElementById(KamSwitchIdL2P).checked = false;
    document.getElementById(KamTimerIdL2P).innerText = '';
    document.getElementById(KamTimerIdL2P).style.display = 'none';

    const KkeyL2P = KamSwitchIdL2P === 'KamSwitch1L2P' ? 'KamisKondisi1L2P' : 'KamisKondisi2L2P';
    const KamDataWaktuL2P = JSON.parse(localStorage.getItem(KkeyL2P));
    if (KamDataWaktuL2P) {
        KamDataWaktuL2P.KamStartTimeL2P = null;
        localStorage.setItem(KkeyL2P, JSON.stringify(KamDataWaktuL2P));
        controlLedKamL2P('off');  // Matikan LED
    }
}

function KamStartTimerL2P(KamTimerIdL2P, KamInSecL2P, KamSwitchIdL2P) {
    let KamRemainingWakL2P = KamInSecL2P;

    const KamTimerIntervalL2P = setInterval(() => {
        const Menit = Math.floor(KamRemainingWakL2P / 60);
        const Detik = KamRemainingWakL2P % 60;

        document.getElementById(KamTimerIdL2P).style.display = 'block';
        document.getElementById(KamTimerIdL2P).innerText = `${Menit}: ${Detik}`;
        
        KamRemainingWakL2P--;

        if(KamRemainingWakL2P < 0){
            clearInterval(KamTimerIntervalL2P);
            KamResetWaktuL2P(KamSwitchIdL2P, KamTimerIdL2P);
            localStorage.setItem('TimeEndKamL2P', JSON.stringify(KamRemainingWakL2P));
        }
    }, 1000);
}

window.onload = KamTampilanWaktuL2P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi1L2P');
    document.getElementById('KamTextJam1L2P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi2L2P');
    document.getElementById('KamTextJam2L2P').innerText = 'No Time';
});