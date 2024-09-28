// NAVBAR
const HomeRabL1A = document.getElementById("iconHome");
HomeRabL1A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedRabL1A(state) {
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

// HARI RABU.....
function setHariRabuL1A(RabTimeIdL1A, RabDurasiIdL1A, RabSwitchIdL1A, RabNotifIdL1A, RabTimerIdL1A) {
    const RabTimeValueL1A = document.getElementById(RabTimeIdL1A).value;
    const RabDurasiValueL1A = document.getElementById(RabDurasiIdL1A).value;
    
    if (RabTimeValueL1A && RabDurasiValueL1A ) {
        const RdayL1A = 3;
        const RabDataWaktuL1A = { 
            time: RabTimeValueL1A, 
            duration: RabDurasiValueL1A, 
            RdayL1A: RdayL1A, 
            RabStartTimeL1A: null };
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${RabTimeValueL1A}&duration=${RabDurasiValueL1A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (RabSwitchIdL1A === 'RabSwitch1L1A') {
            localStorage.setItem('RabuKondisi1L1A', JSON.stringify(RabDataWaktuL1A));
            document.getElementById(RabNotifIdL1A).innerText = `${RabTimeValueL1A}`;
            } else if (RabSwitchIdL1A === 'RabSwitch2L1A') {
            localStorage.setItem('RabuKondisi2L1A', JSON.stringify(RabDataWaktuL1A));
            document.getElementById(RabNotifIdL1A).innerText = `${RabTimeValueL1A}`;
            };
            RabTampilanWaktuL1A();
        })
    .catch(error => {
        console.error("Error: ", error);
    });    
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function RabTampilanWaktuL1A() {
    const RabKondisi1L1A = JSON.parse(localStorage.getItem('RabuKondisi1L1A'));
    const RabKondisi2L1A = JSON.parse(localStorage.getItem('RabuKondisi2L1A'));

    if(RabKondisi1L1A){
        document.getElementById('RabTextJam1L1A').innerText = `${RabKondisi1L1A.time}`
    }
    if(RabKondisi2L1A){
        document.getElementById('RabTextJam2L1A').innerText = `${RabKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (RabKondisi1L1A) RabCekWaktuL1A(RabKondisi1L1A, 'RabSwitch1L1A', 'RabTimer1L1A');
        if (RabKondisi2L1A) RabCekWaktuL1A(RabKondisi2L1A, 'RabSwitch2L1A', 'RabTimer2L1A');
    }, 1000);
}

function RabCekWaktuL1A(RabDataWaktuL1A, RabSwitchIdL1A, RabTimerIdL1A) {
    const RabCurrentTimeL1A = new Date();
    const RabCurrentDayL1A = RabCurrentTimeL1A.getDay();
    const RabCurrentHourL1A = RabCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (RabCurrentDayL1A === RabDataWaktuL1A.RdayL1A && RabCurrentHourL1A === RabDataWaktuL1A.time) {
        if (!RabDataWaktuL1A.RabStartTimeL1A) {
            RabDataWaktuL1A.RabStartTimeL1A = new Date().toISOString();
            localStorage.setItem(RabSwitchIdL1A === 'RabSwitch1L1A' ? 'RabuKondisi1L1A' : 'RabuKondisi2L1A', JSON.stringify(RabDataWaktuL1A));
        }
        controlLedRabL1A('on');  // Nyalakan LED
        document.getElementById(RabSwitchIdL1A).checked = true;

        const RabStartTimeL1A = new Date(RabDataWaktuL1A.RabStartTimeL1A);
        const RabDetikLewatL1A = Math.floor((RabCurrentTimeL1A - RabStartTimeL1A) / 1000);
        const RabRemainingDetikL1A = RabDataWaktuL1A.duration * 60 - RabDetikLewatL1A;

        if (RabRemainingDetikL1A > 0) {
            RabStartTimerL1A(RabTimerIdL1A, RabRemainingDetikL1A, RabSwitchIdL1A);
        } else {
            RabResetWaktuL1A(RabSwitchIdL1A, RabTimerIdL1A);
        }
    }
}

function RabResetWaktuL1A(RabSwitchIdL1A, RabTimerIdL1A) {
    document.getElementById(RabSwitchIdL1A).checked = false;
    document.getElementById(RabTimerIdL1A).innerText = '';
    document.getElementById(RabTimerIdL1A).style.display = 'none';

    const RkeyL1A = RabSwitchIdL1A === 'RabSwitch1L1A' ? 'RabuKondisi1L1A' : 'RabuKondisi2L1A';
    const RabDataWaktuL1A = JSON.parse(localStorage.getItem(RkeyL1A));
    if (RabDataWaktuL1A) {
        RabDataWaktuL1A.RabStartTimeL1A = null;
        localStorage.setItem(RkeyL1A, JSON.stringify(RabDataWaktuL1A));
        controlLedRabL1A('off');  // Matikan LED
    }
}

function RabStartTimerL1A(RabTimerIdL1A, RabInSecL1A, RabSwitchIdL1A) {
    let RabRemainingWakL1A = RabInSecL1A;

    const RabTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(RabRemainingWakL1A / 60);
        const Detik = RabRemainingWakL1A % 60;

        document.getElementById(RabTimerIdL1A).style.display = 'block';
        document.getElementById(RabTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        RabRemainingWakL1A--;

        if(RabRemainingWakL1A < 0){
            clearInterval(RabTimerIntervalL1A);
            RabResetWaktuL1A(RabSwitchIdL1A, RabTimerIdL1A);
            localStorage.setItem('TimerEnd', JSON.stringify(RabRemainingWakL1A));
        }
    }, 1000);
}

window.onload = RabTampilanWaktuL1A;
document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi1L1A');
    document.getElementById('RabTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi2L1A');
    document.getElementById('RabTextJam2L1A').innerText = 'No Time';
});