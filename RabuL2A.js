// NAVBAR
const HomeRabL2A = document.getElementById("iconHome");
HomeRabL2A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedRabL2A(state) {
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

// HARI RABU.....
function setHariRabuL2A(RabTimeIdL2A, RabDurasiIdL2A, RabSwitchIdL2A, RabNotifIdL2A, RabTimerIdL2A) {
    const RabTimeValueL2A = document.getElementById(RabTimeIdL2A).value;
    const RabDurasiValueL2A = document.getElementById(RabDurasiIdL2A).value;
    
    if (RabTimeValueL2A && RabDurasiValueL2A ) {
        const RdayL2A = 3;
        const RabDataWaktuL2A = { 
            time: RabTimeValueL2A, 
            duration: RabDurasiValueL2A, 
            RdayL2A: RdayL2A, 
            RabStartTimeL2A: null };
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${RabTimeValueL2A}&duration=${RabDurasiValueL2A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (RabSwitchIdL2A === 'RabSwitch1L2A') {
            localStorage.setItem('RabuKondisi1L2A', JSON.stringify(RabDataWaktuL2A));
            document.getElementById(RabNotifIdL2A).innerText = `${RabTimeValueL2A}`;
            } else if (RabSwitchIdL2A === 'RabSwitch2L2A') {
            localStorage.setItem('RabuKondisi2L2A', JSON.stringify(RabDataWaktuL2A));
            document.getElementById(RabNotifIdL2A).innerText = `${RabTimeValueL2A}`;
            };
            RabTampilanWaktuL2A();
        })
    .catch(error => {
        console.error("Error: ", error);
    });    
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function RabTampilanWaktuL2A() {
    const RabKondisi1L2A = JSON.parse(localStorage.getItem('RabuKondisi1L2A'));
    const RabKondisi2L2A = JSON.parse(localStorage.getItem('RabuKondisi2L2A'));

    if(RabKondisi1L2A){
        document.getElementById('RabTextJam1L2A').innerText = `${RabKondisi1L2A.time}`
    }
    if(RabKondisi2L2A){
        document.getElementById('RabTextJam2L2A').innerText = `${RabKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (RabKondisi1L2A) RabCekWaktuL2A(RabKondisi1L2A, 'RabSwitch1L2A', 'RabTimer1L2A');
        if (RabKondisi2L2A) RabCekWaktuL2A(RabKondisi2L2A, 'RabSwitch2L2A', 'RabTimer2L2A');
    }, 1000);
}

function RabCekWaktuL2A(RabDataWaktuL2A, RabSwitchIdL2A, RabTimerIdL2A) {
    const RabCurrentTimeL2A = new Date();
    const RabCurrentDayL2A = RabCurrentTimeL2A.getDay();
    const RabCurrentHourL2A = RabCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (RabCurrentDayL2A === RabDataWaktuL2A.RdayL2A && RabCurrentHourL2A === RabDataWaktuL2A.time) {
        if (!RabDataWaktuL2A.RabStartTimeL2A) {
            RabDataWaktuL2A.RabStartTimeL2A = new Date().toISOString();
            localStorage.setItem(RabSwitchIdL2A === 'RabSwitch1L2A' ? 'RabuKondisi1L2A' : 'RabuKondisi2L2A', JSON.stringify(RabDataWaktuL2A));
        }
        controlLedRabL2A('on');  // Nyalakan LED
        document.getElementById(RabSwitchIdL2A).checked = true;

        const RabStartTimeL2A = new Date(RabDataWaktuL2A.RabStartTimeL2A);
        const RabDetikLewatL2A = Math.floor((RabCurrentTimeL2A - RabStartTimeL2A) / 1000);
        const RabRemainingDetikL2A = RabDataWaktuL2A.duration * 60 - RabDetikLewatL2A;

        if (RabRemainingDetikL2A > 0) {
            RabStartTimerL2A(RabTimerIdL2A, RabRemainingDetikL2A, RabSwitchIdL2A);
        } else {
            RabResetWaktuL2A(RabSwitchIdL2A, RabTimerIdL2A);
        }
    }
}

function RabResetWaktuL2A(RabSwitchIdL2A, RabTimerIdL2A) {
    document.getElementById(RabSwitchIdL2A).checked = false;
    document.getElementById(RabTimerIdL2A).innerText = '';
    document.getElementById(RabTimerIdL2A).style.display = 'none';

    const RkeyL2A = RabSwitchIdL2A === 'RabSwitch1L2A' ? 'RabuKondisi1L2A' : 'RabuKondisi2L2A';
    const RabDataWaktuL2A = JSON.parse(localStorage.getItem(RkeyL2A));
    if (RabDataWaktuL2A) {
        RabDataWaktuL2A.RabStartTimeL2A = null;
        localStorage.setItem(RkeyL2A, JSON.stringify(RabDataWaktuL2A));
        controlLedRabL2A('off');  // Matikan LED
    }
}

function RabStartTimerL2A(RabTimerIdL2A, RabInSecL2A, RabSwitchIdL2A) {
    let RabRemainingWakL2A = RabInSecL2A;

    const RabTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(RabRemainingWakL2A / 60);
        const Detik = RabRemainingWakL2A % 60;

        document.getElementById(RabTimerIdL2A).style.display = 'block';
        document.getElementById(RabTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        RabRemainingWakL2A--;

        if(RabRemainingWakL2A < 0){
            clearInterval(RabTimerIntervalL2A);
            RabResetWaktuL2A(RabSwitchIdL2A, RabTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(RabRemainingWakL2A));
        }
    }, 1000);
}

window.onload = RabTampilanWaktuL2A;
document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi1L2A');
    document.getElementById('RabTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi2L2A');
    document.getElementById('RabTextJam2L2A').innerText = 'No Time';
});