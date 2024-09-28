// NAVBAR
const HomeRabL2P = document.getElementById("iconHome");
HomeRabL2P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedRabL2P(state) {
    const urlRabL2A = `http://192.168.4.100/ledL2A?state=${state}`;
    const urlRabL2P = `http://192.168.4.100/ledL2P?state=${state}`;
    fetch(urlRabL2A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlRabL2P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI RABU.....
function setHariRabuL2P(RabTimeIdL2P, RabDurasiIdL2P, RabSwitchIdL2P, RabNotifIdL2P, RabTimerIdL2P) {
    const RabTimeValueL2P = document.getElementById(RabTimeIdL2P).value;
    const RabDurasiValueL2P = document.getElementById(RabDurasiIdL2P).value;
    
    if (RabTimeValueL2P && RabDurasiValueL2P ) {
        const RdayL2P = 3;
        const RabDataWaktuL2P = { 
            time: RabTimeValueL2P, 
            duration: RabDurasiValueL2P, 
            RdayL2P: RdayL2P, 
            RabStartTimeL2P: null };
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${RabTimeValueL2P}&duration=${RabDurasiValueL2P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (RabSwitchIdL2P === 'RabSwitch1L2P') {
            localStorage.setItem('RabuKondisi1L2P', JSON.stringify(RabDataWaktuL2P));
            document.getElementById(RabNotifIdL2P).innerText = `${RabTimeValueL2P}`;
            } else if (RabSwitchIdL2P === 'RabSwitch2L2P') {
            localStorage.setItem('RabuKondisi2L2P', JSON.stringify(RabDataWaktuL2P));
            document.getElementById(RabNotifIdL2P).innerText = `${RabTimeValueL2P}`;
            };
            RabTampilanWaktuL2P();
        })
    .catch(error => {
        console.error("Error: ", error);
    });    
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function RabTampilanWaktuL2P() {
    const RabKondisi1L2P = JSON.parse(localStorage.getItem('RabuKondisi1L2P'));
    const RabKondisi2L2P = JSON.parse(localStorage.getItem('RabuKondisi2L2P'));

    if(RabKondisi1L2P){
        document.getElementById('RabTextJam1L2P').innerText = `${RabKondisi1L2P.time}`
    }
    if(RabKondisi2L2P){
        document.getElementById('RabTextJam2L2P').innerText = `${RabKondisi2L2P.time}`
    }

    setInterval(() =>{
        if (RabKondisi1L2P) RabCekWaktuL2P(RabKondisi1L2P, 'RabSwitch1L2P', 'RabTimer1L2P');
        if (RabKondisi2L2P) RabCekWaktuL2P(RabKondisi2L2P, 'RabSwitch2L2P', 'RabTimer2L2P');
    }, 1000);
}

function RabCekWaktuL2P(RabDataWaktuL2P, RabSwitchIdL2P, RabTimerIdL2P) {
    const RabCurrentTimeL2P = new Date();
    const RabCurrentDayL2P = RabCurrentTimeL2P.getDay();
    const RabCurrentHourL2P = RabCurrentTimeL2P.toTimeString().slice(0, 5); 

    if (RabCurrentDayL2P === RabDataWaktuL2P.RdayL2P && RabCurrentHourL2P === RabDataWaktuL2P.time) {
        if (!RabDataWaktuL2P.RabStartTimeL2P) {
            RabDataWaktuL2P.RabStartTimeL2P = new Date().toISOString();
            localStorage.setItem(RabSwitchIdL2P === 'RabSwitch1L2P' ? 'RabuKondisi1L2P' : 'RabuKondisi2L2P', JSON.stringify(RabDataWaktuL2P));
        }
        controlLedRabL2P('on');  // Nyalakan LED
        document.getElementById(RabSwitchIdL2P).checked = true;

        const RabStartTimeL2P = new Date(RabDataWaktuL2P.RabStartTimeL2P);
        const RabDetikLewatL2P = Math.floor((RabCurrentTimeL2P - RabStartTimeL2P) / 1000);
        const RabRemainingDetikL2P = RabDataWaktuL2P.duration * 60 - RabDetikLewatL2P;

        if (RabRemainingDetikL2P > 0) {
            RabStartTimerL2P(RabTimerIdL2P, RabRemainingDetikL2P, RabSwitchIdL2P);
        } else {
            RabResetWaktuL2P(RabSwitchIdL2P, RabTimerIdL2P);
        }
    }
}

function RabResetWaktuL2P(RabSwitchIdL2P, RabTimerIdL2P) {
    document.getElementById(RabSwitchIdL2P).checked = false;
    document.getElementById(RabTimerIdL2P).innerText = '';
    document.getElementById(RabTimerIdL2P).style.display = 'none';

    const RkeyL2P = RabSwitchIdL2P === 'RabSwitch1L2P' ? 'RabuKondisi1L2P' : 'RabuKondisi2L2P';
    const RabDataWaktuL2P = JSON.parse(localStorage.getItem(RkeyL2P));
    if (RabDataWaktuL2P) {
        RabDataWaktuL2P.RabStartTimeL2P = null;
        localStorage.setItem(RkeyL2P, JSON.stringify(RabDataWaktuL2P));
        controlLedRabL2P('off');  // Matikan LED
    }
}

function RabStartTimerL2P(RabTimerIdL2P, RabInSecL2P, RabSwitchIdL2P) {
    let RabRemainingWakL2P = RabInSecL2P;

    const RabTimerIntervalL2P = setInterval(() => {
        const Menit = Math.floor(RabRemainingWakL2P / 60);
        const Detik = RabRemainingWakL2P % 60;

        document.getElementById(RabTimerIdL2P).style.display = 'block';
        document.getElementById(RabTimerIdL2P).innerText = `${Menit}: ${Detik}`;
        
        RabRemainingWakL2P--;

        if(RabRemainingWakL2P < 0){
            clearInterval(RabTimerIntervalL2P);
            RabResetWaktuL2P(RabSwitchIdL2P, RabTimerIdL2P);
            localStorage.setItem('TimeEndRabL2P', JSON.stringify(RabRemainingWakL2P));
        }
    }, 1000);
}

window.onload = RabTampilanWaktuL2P;
document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi1L2P');
    document.getElementById('RabTextJam1L2P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi2L2P');
    document.getElementById('RabTextJam2L2P').innerText = 'No Time';
});