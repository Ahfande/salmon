// // NAVBAR
const HomeKamL2A = document.getElementById("iconHome");
HomeKamL2A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedKamL2A(state) {
    const url = `http://192.168.4.100/ledL2A?state=${state}`;
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
function setHariKamisL2A(KamTimeIdL2A, KamDurasiIdL2A, KamSwitchIdL2A, KamNotifIdL2A, KamTimerIdL2A) {
    const KamTimeValueL2A = document.getElementById(KamTimeIdL2A).value;
    const KamDurasiValueL2A = document.getElementById(KamDurasiIdL2A).value;
    
    if (KamTimeValueL2A && KamDurasiValueL2A ) {
        const KdayL2A = 4;
        const KamDataWaktuL2A = { 
            time: KamTimeValueL2A, 
            duration: KamDurasiValueL2A, 
            KdayL2A: KdayL2A, 
            KamStartTimeL2A: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${KamTimeValueL2A}&duration=${KamDurasiValueL2A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (KamSwitchIdL2A === 'KamSwitch1L2A') {
            localStorage.setItem('KamisKondisi1L2A', JSON.stringify(KamDataWaktuL2A));
            document.getElementById(KamNotifIdL2A).innerText = `${KamTimeValueL2A}`;
            } else if (KamSwitchIdL2A === 'KamSwitch2L2A') {
            localStorage.setItem('KamisKondisi2L2A', JSON.stringify(KamDataWaktuL2A));
            document.getElementById(KamNotifIdL2A).innerText = `${KamTimeValueL2A}`;
            };
            KamTampilanWaktuL2A();
        })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function KamTampilanWaktuL2A() {
    const KamKondisi1L2A = JSON.parse(localStorage.getItem('KamisKondisi1L2A'));
    const KamKondisi2L2A = JSON.parse(localStorage.getItem('KamisKondisi2L2A'));

    if(KamKondisi1L2A){
        document.getElementById('KamTextJam1L2A').innerText = `${KamKondisi1L2A.time}`
    }
    if(KamKondisi2L2A){
        document.getElementById('KamTextJam2L2A').innerText = `${KamKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (KamKondisi1L2A) KamCekWaktuL2A(KamKondisi1L2A, 'KamSwitch1L2A', 'KamTimer1L2A');
        if (KamKondisi2L2A) KamCekWaktuL2A(KamKondisi2L2A, 'KamSwitch2L2A', 'KamTimer2L2A');
    }, 1000);
}

function KamCekWaktuL2A(KamDataWaktuL2A, KamSwitchIdL2A, KamTimerIdL2A) {
    const KamCurrentTimeL2A = new Date();
    const KamCurrentDayL2A = KamCurrentTimeL2A.getDay();
    const KamCurrentHourL2A = KamCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (KamCurrentDayL2A === KamDataWaktuL2A.KdayL2A && KamCurrentHourL2A === KamDataWaktuL2A.time) {
        if (!KamDataWaktuL2A.KamStartTimeL2A) {
            KamDataWaktuL2A.KamStartTimeL2A = new Date().toISOString();
            localStorage.setItem(KamSwitchIdL2A === 'KamSwitch1L2A' ? 'KamisKondisi1L2A' : 'KamisKondisi2L2A', JSON.stringify(KamDataWaktuL2A));
        }
        controlLedKamL2A('on');  // Nyalakan LED
        document.getElementById(KamSwitchIdL2A).checked = true;

        const KamStartTimeL2A = new Date(KamDataWaktuL2A.KamStartTimeL2A);
        const KamDetikLewatL2A = Math.floor((KamCurrentTimeL2A - KamStartTimeL2A) / 1000);
        const KamRemainingDetikL2A = KamDataWaktuL2A.duration * 60 - KamDetikLewatL2A;

        if (KamRemainingDetikL2A > 0) {
            KamStartTimerL2A(KamTimerIdL2A, KamRemainingDetikL2A, KamSwitchIdL2A);
        } else {
            KamResetWaktuL2A(KamSwitchIdL2A, KamTimerIdL2A);
        }
    }
}

function KamResetWaktuL2A(KamSwitchIdL2A, KamTimerIdL2A) {
    document.getElementById(KamSwitchIdL2A).checked = false;
    document.getElementById(KamTimerIdL2A).innerText = '';
    document.getElementById(KamTimerIdL2A).style.display = 'none';

    const KkeyL2A = KamSwitchIdL2A === 'KamSwitch1L2A' ? 'KamisKondisi1L2A' : 'KamisKondisi2L2A';
    const KamDataWaktuL2A = JSON.parse(localStorage.getItem(KkeyL2A));
    if (KamDataWaktuL2A) {
        KamDataWaktuL2A.KamStartTimeL2A = null;
        localStorage.setItem(KkeyL2A, JSON.stringify(KamDataWaktuL2A));
        controlLedKamL2A('off');  // Matikan LED
    }
}

function KamStartTimerL2A(KamTimerIdL2A, KamInSecL2A, KamSwitchIdL2A) {
    let KamRemainingWakL2A = KamInSecL2A;

    const KamTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(KamRemainingWakL2A / 60);
        const Detik = KamRemainingWakL2A % 60;

        document.getElementById(KamTimerIdL2A).style.display = 'block';
        document.getElementById(KamTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        KamRemainingWakL2A--;

        if(KamRemainingWakL2A < 0){
            clearInterval(KamTimerIntervalL2A);
            KamResetWaktuL2A(KamSwitchIdL2A, KamTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(KamRemainingWakL2A));
        }
    }, 1000);
}

window.onload = KamTampilanWaktuL2A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi1L2A');
    document.getElementById('KamTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('KamisKondisi2L2A');
    document.getElementById('KamTextJam2L2A').innerText = 'No Time';
});