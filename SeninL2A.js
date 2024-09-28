// NAVBAR
const HomeSenL2A = document.getElementById("iconHome");
HomeSenL2A.addEventListener("click", () => {
  window.location.href = "Home.html";
});


//SERVER
function controlLedSenL2A(state) {
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

// HARI SENIN.....
function setHariSeninL2A(SenTimeIdL2A, SenDurasiIdL2A, SenSwitchIdL2A, SenNotifIdL2A, SenTimerIdL2A) {
    const SenTimeValueL2A = document.getElementById(SenTimeIdL2A).value;
    const SenDurasiValueL2A = document.getElementById(SenDurasiIdL2A).value;
    
    if (SenTimeValueL2A && SenDurasiValueL2A ) {
        const SndayL2A = 1;
        const SenDataWaktuL2A = { 
            time: SenTimeValueL2A, 
            duration: SenDurasiValueL2A, 
            SndayL2A: SndayL2A, 
            SenStartTimeL2A: null };
        
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${SenTimeValueL2A}&duration=${SenDurasiValueL2A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
        if (SenSwitchIdL2A === 'SenSwitch1L2A') {
            localStorage.setItem('SeninKondisi1L2A', JSON.stringify(SenDataWaktuL2A));
            document.getElementById(SenNotifIdL2A).innerText = `${SenTimeValueL2A}`;
        } else if (SenSwitchIdL2A === 'SenSwitch2L2A') {
            localStorage.setItem('SeninKondisi2L2A', JSON.stringify(SenDataWaktuL2A));
            document.getElementById(SenNotifIdL2A).innerText = `${SenTimeValueL2A}`;
        };
        SenTampilanWaktuL2A();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SenTampilanWaktuL2A() {
    const SenKondisi1L2A = JSON.parse(localStorage.getItem('SeninKondisi1L2A'));
    const SenKondisi2L2A = JSON.parse(localStorage.getItem('SeninKondisi2L2A'));

    if(SenKondisi1L2A){
        document.getElementById('SenTextJam1L2A').innerText = `${SenKondisi1L2A.time}`
    }
    if(SenKondisi2L2A){
        document.getElementById('SenTextJam2L2A').innerText = `${SenKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (SenKondisi1L2A) SenCekWaktuL2A(SenKondisi1L2A, 'SenSwitch1L2A', 'SenTimer1L2A');
        if (SenKondisi2L2A) SenCekWaktuL2A(SenKondisi2L2A, 'SenSwitch2L2A', 'SenTimer2L2A');
    }, 1000);
}

function SenCekWaktuL2A(SenDataWaktuL2A, SenSwitchIdL2A, SenTimerIdL2A) {
    const SenCurrentTimeL2A = new Date();
    const SenCurrentDayL2A = SenCurrentTimeL2A.getDay();
    const SenCurrentHourL2A = SenCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (SenCurrentDayL2A === SenDataWaktuL2A.SndayL2A && SenCurrentHourL2A === SenDataWaktuL2A.time) {
        if (!SenDataWaktuL2A.SenStartTimeL2A) {
            SenDataWaktuL2A.SenStartTimeL2A = new Date().toISOString();
            localStorage.setItem(SenSwitchIdL2A === 'SenSwitch1L2A' ? 'SeninKondisi1L2A' : 'SeninKondisi2L2A', JSON.stringify(SenDataWaktuL2A));
        }
        controlLedSenL2A('on');  // Nyalakan LED
        document.getElementById(SenSwitchIdL2A).checked = true;

        const SenStartTimeL2A = new Date(SenDataWaktuL2A.SenStartTimeL2A);
        const SenDetikLewatL2A = Math.floor((SenCurrentTimeL2A - SenStartTimeL2A) / 1000);
        const SenRemainingDetikL2A = SenDataWaktuL2A.duration * 60 - SenDetikLewatL2A;

        if (SenRemainingDetikL2A > 0) {
            SenStartTimerL2A(SenTimerIdL2A, SenRemainingDetikL2A, SenSwitchIdL2A);
        } else {
            SenResetWaktuL2A(SenSwitchIdL2A, SenTimerIdL2A);
        }
    }
}

function SenResetWaktuL2A(SenSwitchIdL2A, SenTimerIdL2A) {
    document.getElementById(SenSwitchIdL2A).checked = false;
    document.getElementById(SenTimerIdL2A).innerText = '';
    document.getElementById(SenTimerIdL2A).style.display = 'none';

    const SnkeyL2A = SenSwitchIdL2A === 'SenSwitch1L2A' ? 'SeninKondisi1L2A' : 'SeninKondisi2L2A';
    const SenDataWaktuL2A = JSON.parse(localStorage.getItem(SnkeyL2A));
    if (SenDataWaktuL2A) {
        SenDataWaktuL2A.SenStartTimeL2A = null;
        localStorage.setItem(SnkeyL2A, JSON.stringify(SenDataWaktuL2A));
        controlLedSenL2A('off');  // Matikan LED
    }
}

function SenStartTimerL2A(SenTimerIdL2A, SenInSecL2A, SenSwitchIdL2A) {
    let SenRemainingWakL2A = SenInSecL2A;

    const SenTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(SenRemainingWakL2A / 60);
        const Detik = SenRemainingWakL2A % 60;

        document.getElementById(SenTimerIdL2A).style.display = 'block';
        document.getElementById(SenTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        SenRemainingWakL2A--;

        if(SenRemainingWakL2A < 0){
            clearInterval(SenTimerIntervalL2A);
            SenResetWaktuL2A(SenSwitchIdL2A, SenTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(SenRemainingWakL2A));
        }
    }, 1000);
}

window.onload = SenTampilanWaktuL2A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SeninKondisi1L2A');
    document.getElementById('SenTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SeninKondisi2L2A');
    document.getElementById('SenTextJam2L2A').innerText = 'No Time';
});