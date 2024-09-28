// NAVBAR
const HomeSabL2A = document.getElementById("iconHome");
HomeSabL2A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedSabL2A(state) {
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

// HARI SABTU.....
function setHariSabtuL2A(SabTimeIdL2A, SabDurasiIdL2A, SabSwitchIdL2A, SabNotifIdL2A, SabTimerIdL2A) {
    const SabTimeValueL2A = document.getElementById(SabTimeIdL2A).value;
    const SabDurasiValueL2A = document.getElementById(SabDurasiIdL2A).value;
    
    if (SabTimeValueL2A && SabDurasiValueL2A ) {
        const SbdayL2A = 6;
        const SabDataWaktuL2A = { 
            time: SabTimeValueL2A, 
            duration: SabDurasiValueL2A, 
            SbdayL2A: SbdayL2A, 
            SabStartTimeL2A: null };
        
         // Mengirimkan request ke ESP8266 dengan fetch()
         fetch(`http://192.168.4.100/set?time=${SabTimeValueL2A}&duration=${SabDurasiValueL2A}`)
         .then(response => response.text())
         .then(data => {
             console.log("Response from ESP8266: ", data);
            if (SabSwitchIdL2A === 'SabSwitch1L2A') {
            localStorage.setItem('SabtuKondisi1L2A', JSON.stringify(SabDataWaktuL2A));
            document.getElementById(SabNotifIdL2A).innerText = `${SabTimeValueL2A}`;
            } else if (SabSwitchIdL2A === 'SabSwitch2L2A') {
            localStorage.setItem('SabtuKondisi2L2A', JSON.stringify(SabDataWaktuL2A));
            document.getElementById(SabNotifIdL2A).innerText = `${SabTimeValueL2A}`;
            };
        SabTampilanWaktuL2A();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SabTampilanWaktuL2A() {
    const SabKondisi1L2A = JSON.parse(localStorage.getItem('SabtuKondisi1L2A'));
    const SabKondisi2L2A = JSON.parse(localStorage.getItem('SabtuKondisi2L2A'));

    if(SabKondisi1L2A){
        document.getElementById('SabTextJam1L2A').innerText = `${SabKondisi1L2A.time}`
    }
    if(SabKondisi2L2A){
        document.getElementById('SabTextJam2L2A').innerText = `${SabKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (SabKondisi1L2A) SabCekWaktuL2A(SabKondisi1L2A, 'SabSwitch1L2A', 'SabTimer1L2A');
        if (SabKondisi2L2A) SabCekWaktuL2A(SabKondisi2L2A, 'SabSwitch2L2A', 'SabTimer2L2A');
    }, 1000);
}

function SabCekWaktuL2A(SabDataWaktuL2A, SabSwitchIdL2A, SabTimerIdL2A) {
    const SabCurrentTimeL2A = new Date();
    const SabCurrentDayL2A = SabCurrentTimeL2A.getDay();
    const SabCurrentHourL2A = SabCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (SabCurrentDayL2A === SabDataWaktuL2A.SbdayL2A && SabCurrentHourL2A === SabDataWaktuL2A.time) {
        if (!SabDataWaktuL2A.SabStartTimeL2A) {
            SabDataWaktuL2A.SabStartTimeL2A = new Date().toISOString();
            localStorage.setItem(SabSwitchIdL2A === 'SabSwitch1L2A' ? 'SabtuKondisi1L2A' : 'SabtuKondisi2L2A', JSON.stringify(SabDataWaktuL2A));
        }
        controlLedSabL2A('on');  // Nyalakan LED
        document.getElementById(SabSwitchIdL2A).checked = true;

        const SabStartTimeL2A = new Date(SabDataWaktuL2A.SabStartTimeL2A);
        const SabDetikLewatL2A = Math.floor((SabCurrentTimeL2A - SabStartTimeL2A) / 1000);
        const SabRemainingDetikL2A = SabDataWaktuL2A.duration * 60 - SabDetikLewatL2A;

        if (SabRemainingDetikL2A > 0) {
            SabStartTimerL2A(SabTimerIdL2A, SabRemainingDetikL2A, SabSwitchIdL2A);
        } else {
            SabResetWaktuL2A(SabSwitchIdL2A, SabTimerIdL2A);
        }
    }
}

function SabResetWaktuL2A(SabSwitchIdL2A, SabTimerIdL2A) {
    document.getElementById(SabSwitchIdL2A).checked = false;
    document.getElementById(SabTimerIdL2A).innerText = '';
    document.getElementById(SabTimerIdL2A).style.display = 'none';

    const SbkeyL2A = SabSwitchIdL2A === 'SabSwitch1L2A' ? 'SabtuKondisi1L2A' : 'SabtuKondisi2L2A';
    const SabDataWaktuL2A = JSON.parse(localStorage.getItem(SbkeyL2A));
    if (SabDataWaktuL2A) {
        SabDataWaktuL2A.SabStartTimeL2A = null;
        localStorage.setItem(SbkeyL2A, JSON.stringify(SabDataWaktuL2A));
        controlLedSabL2A('off');  // Matikan LED
    }
}

function SabStartTimerL2A(SabTimerIdL2A, SabInSecL2A, SabSwitchIdL2A) {
    let SabRemainingWakL2A = SabInSecL2A;

    const SabTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(SabRemainingWakL2A / 60);
        const Detik = SabRemainingWakL2A % 60;

        document.getElementById(SabTimerIdL2A).style.display = 'block';
        document.getElementById(SabTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        SabRemainingWakL2A--;

        if(SabRemainingWakL2A < 0){
            clearInterval(SabTimerIntervalL2A);
            SabResetWaktuL2A(SabSwitchIdL2A, SabTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(SabRemainingWakL2A));
        }
    }, 1000);
}

window.onload = SabTampilanWaktuL2A;


document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi1L2A');
    document.getElementById('SabTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi2L2A');
    document.getElementById('SabTextJam2L2A').innerText = 'No Time';
});