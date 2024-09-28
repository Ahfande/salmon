// NAVBAR
const HomeSabL1A = document.getElementById("iconHome");
HomeSabL1A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedSabL1A(state) {
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

// HARI SABTU.....
function setHariSabtuL1A(SabTimeIdL1A, SabDurasiIdL1A, SabSwitchIdL1A, SabNotifIdL1A, SabTimerIdL1A) {
    const SabTimeValueL1A = document.getElementById(SabTimeIdL1A).value;
    const SabDurasiValueL1A = document.getElementById(SabDurasiIdL1A).value;
    
    if (SabTimeValueL1A && SabDurasiValueL1A ) {
        const SbdayL1A = 6;
        const SabDataWaktuL1A = { 
            time: SabTimeValueL1A, 
            duration: SabDurasiValueL1A, 
            SbdayL1A: SbdayL1A, 
            SabStartTimeL1A: null };
        
         // Mengirimkan request ke ESP8266 dengan fetch()
         fetch(`http://192.168.4.100/set?time=${SabTimeValueL1A}&duration=${SabDurasiValueL1A}`)
         .then(response => response.text())
         .then(data => {
             console.log("Response from ESP8266: ", data);
            if (SabSwitchIdL1A === 'SabSwitch1L1A') {
            localStorage.setItem('SabtuKondisi1L1A', JSON.stringify(SabDataWaktuL1A));
            document.getElementById(SabNotifIdL1A).innerText = `${SabTimeValueL1A}`;
            } else if (SabSwitchIdL1A === 'SabSwitch2L1A') {
            localStorage.setItem('SabtuKondisi2L1A', JSON.stringify(SabDataWaktuL1A));
            document.getElementById(SabNotifIdL1A).innerText = `${SabTimeValueL1A}`;
            };
        SabTampilanWaktuL1A();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SabTampilanWaktuL1A() {
    const SabKondisi1L1A = JSON.parse(localStorage.getItem('SabtuKondisi1L1A'));
    const SabKondisi2L1A = JSON.parse(localStorage.getItem('SabtuKondisi2L1A'));

    if(SabKondisi1L1A){
        document.getElementById('SabTextJam1L1A').innerText = `${SabKondisi1L1A.time}`
    }
    if(SabKondisi2L1A){
        document.getElementById('SabTextJam2L1A').innerText = `${SabKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (SabKondisi1L1A) SabCekWaktuL1A(SabKondisi1L1A, 'SabSwitch1L1A', 'SabTimer1L1A');
        if (SabKondisi2L1A) SabCekWaktuL1A(SabKondisi2L1A, 'SabSwitch2L1A', 'SabTimer2L1A');
    }, 1000);
}

function SabCekWaktuL1A(SabDataWaktuL1A, SabSwitchIdL1A, SabTimerIdL1A) {
    const SabCurrentTimeL1A = new Date();
    const SabCurrentDayL1A = SabCurrentTimeL1A.getDay();
    const SabCurrentHourL1A = SabCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (SabCurrentDayL1A === SabDataWaktuL1A.SbdayL1A && SabCurrentHourL1A === SabDataWaktuL1A.time) {
        if (!SabDataWaktuL1A.SabStartTimeL1A) {
            SabDataWaktuL1A.SabStartTimeL1A = new Date().toISOString();
            localStorage.setItem(SabSwitchIdL1A === 'SabSwitch1L1A' ? 'SabtuKondisi1L1A' : 'SabtuKondisi2L1A', JSON.stringify(SabDataWaktuL1A));
        }
        controlLedSabL1A('on');  // Nyalakan LED
        document.getElementById(SabSwitchIdL1A).checked = true;

        const SabStartTimeL1A = new Date(SabDataWaktuL1A.SabStartTimeL1A);
        const SabDetikLewatL1A = Math.floor((SabCurrentTimeL1A - SabStartTimeL1A) / 1000);
        const SabRemainingDetikL1A = SabDataWaktuL1A.duration * 60 - SabDetikLewatL1A;

        if (SabRemainingDetikL1A > 0) {
            SabStartTimerL1A(SabTimerIdL1A, SabRemainingDetikL1A, SabSwitchIdL1A);
        } else {
            SabResetWaktuL1A(SabSwitchIdL1A, SabTimerIdL1A);
        }
    }
}

function SabResetWaktuL1A(SabSwitchIdL1A, SabTimerIdL1A) {
    document.getElementById(SabSwitchIdL1A).checked = false;
    document.getElementById(SabTimerIdL1A).innerText = '';
    document.getElementById(SabTimerIdL1A).style.display = 'none';

    const SbkeyL1A = SabSwitchIdL1A === 'SabSwitch1L1A' ? 'SabtuKondisi1L1A' : 'SabtuKondisi2L1A';
    const SabDataWaktuL1A = JSON.parse(localStorage.getItem(SbkeyL1A));
    if (SabDataWaktuL1A) {
        SabDataWaktuL1A.SabStartTimeL1A = null;
        localStorage.setItem(SbkeyL1A, JSON.stringify(SabDataWaktuL1A));
        controlLedSabL1A('off');  // Matikan LED
        console.log("coba set disini");
        localStorage.setItem('TimeEndSabL1A', JSON.stringify(SabRemainingWakL1A));
    }
}

function SabStartTimerL1A(SabTimerIdL1A, SabInSecL1A, SabSwitchIdL1A) {
    let SabRemainingWakL1A = SabInSecL1A;

    const SabTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(SabRemainingWakL1A / 60);
        const Detik = SabRemainingWakL1A % 60;

        document.getElementById(SabTimerIdL1A).style.display = 'block';
        document.getElementById(SabTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        SabRemainingWakL1A--;

        if(SabRemainingWakL1A < 0){
            clearInterval(SabTimerIntervalL1A);
            SabResetWaktuL1A(SabSwitchIdL1A, SabTimerIdL1A);
           
        }
    }, 1000);
}

window.onload = SabTampilanWaktuL1A;


document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi1L1A');
    document.getElementById('SabTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi2L1A');
    document.getElementById('SabTextJam2L1A').innerText = 'No Time';
});