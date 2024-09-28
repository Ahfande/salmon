// NAVBAR
const HomeSabL2P = document.getElementById("iconHome");
HomeSabL2P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedSabL2P(state) {
    const urlL2P = `http://192.168.4.100/ledL2P?state=${state}`;
    const urlL2A = `http://192.168.4.100/ledL2A?state=${state}`;
    fetch(urlL2P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlL2A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI SABTU.....
function setHariSabtuL2P(SabTimeIdL2P, SabDurasiIdL2P, SabSwitchIdL2P, SabNotifIdL2P, SabTimerIdL2P) {
    const SabTimeValueL2P = document.getElementById(SabTimeIdL2P).value;
    const SabDurasiValueL2P = document.getElementById(SabDurasiIdL2P).value;
    
    if (SabTimeValueL2P && SabDurasiValueL2P ) {
        const SbdayL2P = 6;
        const SabDataWaktuL2P = { 
            time: SabTimeValueL2P, 
            duration: SabDurasiValueL2P, 
            SbdayL2P: SbdayL2P, 
            SabStartTimeL2P: null };
        
         // Mengirimkan request ke ESP8266 dengan fetch()
         fetch(`http://192.168.4.100/set?time=${SabTimeValueL2P}&duration=${SabDurasiValueL2P}`)
         .then(response => response.text())
         .then(data => {
             console.log("Response from ESP8266: ", data);
            if (SabSwitchIdL2P === 'SabSwitch1L2P') {
            localStorage.setItem('SabtuKondisi1L2P', JSON.stringify(SabDataWaktuL2P));
            document.getElementById(SabNotifIdL2P).innerText = `${SabTimeValueL2P}`;
            } else if (SabSwitchIdL2P === 'SabSwitch2L2P') {
            localStorage.setItem('SabtuKondisi2L2P', JSON.stringify(SabDataWaktuL2P));
            document.getElementById(SabNotifIdL2P).innerText = `${SabTimeValueL2P}`;
            };
        SabTampilanWaktuL2P();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SabTampilanWaktuL2P() {
    const SabKondisi1L2P = JSON.parse(localStorage.getItem('SabtuKondisi1L2P'));
    const SabKondisi2L2P = JSON.parse(localStorage.getItem('SabtuKondisi2L2P'));

    if(SabKondisi1L2P){
        document.getElementById('SabTextJam1L2P').innerText = `${SabKondisi1L2P.time}`
    }
    if(SabKondisi2L2P){
        document.getElementById('SabTextJam2L2P').innerText = `${SabKondisi2L2P.time}`
    }

    setInterval(() =>{
        if (SabKondisi1L2P) SabCekWaktuL2P(SabKondisi1L2P, 'SabSwitch1L2P', 'SabTimer1L2P');
        if (SabKondisi2L2P) SabCekWaktuL2P(SabKondisi2L2P, 'SabSwitch2L2P', 'SabTimer2L2P');
    }, 1000);
}

function SabCekWaktuL2P(SabDataWaktuL2P, SabSwitchIdL2P, SabTimerIdL2P) {
    const SabCurrentTimeL2P = new Date();
    const SabCurrentDayL2P = SabCurrentTimeL2P.getDay();
    const SabCurrentHourL2P = SabCurrentTimeL2P.toTimeString().slice(0, 5); 

    if (SabCurrentDayL2P === SabDataWaktuL2P.SbdayL2P && SabCurrentHourL2P === SabDataWaktuL2P.time) {
        if (!SabDataWaktuL2P.SabStartTimeL2P) {
            SabDataWaktuL2P.SabStartTimeL2P = new Date().toISOString();
            localStorage.setItem(SabSwitchIdL2P === 'SabSwitch1L2P' ? 'SabtuKondisi1L2P' : 'SabtuKondisi2L2P', JSON.stringify(SabDataWaktuL2P));
        }
        controlLedSabL2P('on');  // Nyalakan LED
        document.getElementById(SabSwitchIdL2P).checked = true;

        const SabStartTimeL2P = new Date(SabDataWaktuL2P.SabStartTimeL2P);
        const SabDetikLewatL2P = Math.floor((SabCurrentTimeL2P - SabStartTimeL2P) / 1000);
        const SabRemainingDetikL2P = SabDataWaktuL2P.duration * 60 - SabDetikLewatL2P;

        if (SabRemainingDetikL2P > 0) {
            SabStartTimerL2P(SabTimerIdL2P, SabRemainingDetikL2P, SabSwitchIdL2P);
        } else {
            SabResetWaktuL2P(SabSwitchIdL2P, SabTimerIdL2P);
        }
    }
}

function SabResetWaktuL2P(SabSwitchIdL2P, SabTimerIdL2P) {
    document.getElementById(SabSwitchIdL2P).checked = false;
    document.getElementById(SabTimerIdL2P).innerText = '';
    document.getElementById(SabTimerIdL2P).style.display = 'none';

    const SbkeyL2P = SabSwitchIdL2P === 'SabSwitch1L2P' ? 'SabtuKondisi1L2P' : 'SabtuKondisi2L2P';
    const SabDataWaktuL2P = JSON.parse(localStorage.getItem(SbkeyL2P));
    if (SabDataWaktuL2P) {
        SabDataWaktuL2P.SabStartTimeL2P = null;
        localStorage.setItem(SbkeyL2P, JSON.stringify(SabDataWaktuL2P));
        controlLedSabL2P('off');  // Matikan LED
    }
}

function SabStartTimerL2P(SabTimerIdL2P, SabInSecL2P, SabSwitchIdL2P) {
    let SabRemainingWakL2P = SabInSecL2P;

    const SabTimerIntervalL2P = setInterval(() => {
        const Menit = Math.floor(SabRemainingWakL2P / 60);
        const Detik = SabRemainingWakL2P % 60;

        document.getElementById(SabTimerIdL2P).style.display = 'block';
        document.getElementById(SabTimerIdL2P).innerText = `${Menit}: ${Detik}`;
        
        SabRemainingWakL2P--;

        if(SabRemainingWakL2P < 0){
            clearInterval(SabTimerIntervalL2P);
            SabResetWaktuL2P(SabSwitchIdL2P, SabTimerIdL2P);
            console.log()
            localStorage.setItem('TimeEndSabL2P', JSON.stringify(SabRemainingWakL2P));
        }
    }, 1000);
}

window.onload = SabTampilanWaktuL2P;


document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi1L2P');
    document.getElementById('SabTextJam1L2P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi2L2P');
    document.getElementById('SabTextJam2L2P').innerText = 'No Time';
});