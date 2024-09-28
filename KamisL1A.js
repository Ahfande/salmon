// // NAVBAR
const HomeKamL1A = document.getElementById("iconHome");
HomeKamL1A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedKamL1A(state) {
    const url = `http://192.168.4.100/ledL1A?state=${state}`;
    fetch(url)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

// HARI KAMIS.....
function setHariKamisL1A(KamTimeIdL1A, KamDurasiIdL1A, KamSwitchIdL1A, KamNotifIdL1A, KamTimerIdL1A) {
    const KamTimeValueL1A = document.getElementById(KamTimeIdL1A).value;
    const KamDurasiValueL1A = document.getElementById(KamDurasiIdL1A).value;
    
    if (KamTimeValueL1A && KamDurasiValueL1A ) {
        const KdayL1A = 4;
        const KamDataWaktuL1A = { 
            time: KamTimeValueL1A, 
            duration: KamDurasiValueL1A, 
            KdayL1A: KdayL1A, 
            KamStartTimeL1A: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${KamTimeValueL1A}&duration=${KamDurasiValueL1A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (KamSwitchIdL1A === 'KamSwitch1L1A') {
            localStorage.setItem('KamisKondisi1L1A', JSON.stringify(KamDataWaktuL1A));
            document.getElementById(KamNotifIdL1A).innerText = `${KamTimeValueL1A}`;
            } else if (KamSwitchIdL1A === 'KamSwitch2L1A') {
            localStorage.setItem('KamisKondisi2L1A', JSON.stringify(KamDataWaktuL1A));
            document.getElementById(KamNotifIdL1A).innerText = `${KamTimeValueL1A}`;
            };
            KamTampilanWaktuL1A();
        })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function KamTampilanWaktuL1A() {
    const KamKondisi1L1A = JSON.parse(localStorage.getItem('KamisKondisi1L1A'));
    const KamKondisi2L1A = JSON.parse(localStorage.getItem('KamisKondisi2L1A'));

    if(KamKondisi1L1A){
        document.getElementById('KamTextJam1L1A').innerText = `${KamKondisi1L1A.time}`
    }
    if(KamKondisi2L1A){
        document.getElementById('KamTextJam2L1A').innerText = `${KamKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (KamKondisi1L1A) KamCekWaktuL1A(KamKondisi1L1A, 'KamSwitch1L1A', 'KamTimer1L1A');
        if (KamKondisi2L1A) KamCekWaktuL1A(KamKondisi2L1A, 'KamSwitch2L1A', 'KamTimer2L1A');
    }, 1000);
}

function KamCekWaktuL1A(KamDataWaktuL1A, KamSwitchIdL1A, KamTimerIdL1A) {
    const KamCurrentTimeL1A = new Date();
    const KamCurrentDayL1A = KamCurrentTimeL1A.getDay();
    const KamCurrentHourL1A = KamCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (KamCurrentDayL1A === KamDataWaktuL1A.KdayL1A && KamCurrentHourL1A === KamDataWaktuL1A.time) {
        if (!KamDataWaktuL1A.KamStartTimeL1A) {
            KamDataWaktuL1A.KamStartTimeL1A = new Date().toISOString();
            localStorage.setItem(KamSwitchIdL1A === 'KamSwitch1L1A' ? 'KamisKondisi1L1A' : 'KamisKondisi2L1A', JSON.stringify(KamDataWaktuL1A));
        }
        controlLedKamL1A('on');  // Nyalakan LED
        document.getElementById(KamSwitchIdL1A).checked = true;

        const KamStartTimeL1A = new Date(KamDataWaktuL1A.KamStartTimeL1A);
        const KamDetikLewatL1A = Math.floor((KamCurrentTimeL1A - KamStartTimeL1A) / 1000);
        const KamRemainingDetikL1A = KamDataWaktuL1A.duration * 60 - KamDetikLewatL1A;

        if (KamRemainingDetikL1A > 0) {
            KamStartTimerL1A(KamTimerIdL1A, KamRemainingDetikL1A, KamSwitchIdL1A);
        } else {
            KamResetWaktuL1A(KamSwitchIdL1A, KamTimerIdL1A);
        }
    }
}

function KamResetWaktuL1A(KamSwitchIdL1A, KamTimerIdL1A) {
    document.getElementById(KamSwitchIdL1A).checked = false;
    document.getElementById(KamTimerIdL1A).innerText = '';
    document.getElementById(KamTimerIdL1A).style.display = 'none';

    const KkeyL1A = KamSwitchIdL1A === 'KamSwitch1L1A' ? 'KamisKondisi1L1A' : 'KamisKondisi2L1A';
    const KamDataWaktuL1A = JSON.parse(localStorage.getItem(KkeyL1A));
    if (KamDataWaktuL1A) {
        KamDataWaktuL1A.KamStartTimeL1A = null;
        localStorage.setItem(KkeyL1A, JSON.stringify(KamDataWaktuL1A));
        controlLedKamL1A('off');  // Matikan LED
    }
}

function KamStartTimerL1A(KamTimerIdL1A, KamInSecL1A, KamSwitchIdL1A) {
    let KamRemainingWakL1A = KamInSecL1A;

    const KamTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(KamRemainingWakL1A / 60);
        const Detik = KamRemainingWakL1A % 60;

        document.getElementById(KamTimerIdL1A).style.display = 'block';
        document.getElementById(KamTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        KamRemainingWakL1A--;

        if(KamRemainingWakL1A < 0){
            clearInterval(KamTimerIntervalL1A);
            KamResetWaktuL1A(KamSwitchIdL1A, KamTimerIdL1A);
            localStorage.setItem('TimerEnd', JSON.stringify(KamRemainingWakL1A));
        }
    }, 1000);
}

window.onload = KamTampilanWaktuL1A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi1L1A');
    document.getElementById('KamTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi2L1A');
    document.getElementById('KamTextJam2L1A').innerText = 'No Time';
});