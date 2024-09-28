// NAVBAR
const HomeSelL1A = document.getElementById("iconHome");
HomeSelL1A.addEventListener("click", () => {
  window.location.href = "Home.html";
});


//SERVER
function controlLedSelL1A(state) {
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

// HARI SELASA.....
function setHariSelasaL1A(SelTimeIdL1A, SelDurasiIdL1A, SelSwitchIdL1A, SelNotifIdL1A, SelTimerIdL1A) {
    const SelTimeValueL1A = document.getElementById(SelTimeIdL1A).value;
    const SelDurasiValueL1A = document.getElementById(SelDurasiIdL1A).value;
    
    if (SelTimeValueL1A && SelDurasiValueL1A ) {
        const SdayL1A = 2;
        const SelDataWaktuL1A = { 
            time: SelTimeValueL1A, 
            duration: SelDurasiValueL1A, 
            SdayL1A: SdayL1A, 
            SelStartTimeL1A: null };
        
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${SelTimeValueL1A}&duration=${SelDurasiValueL1A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (SelSwitchIdL1A === 'SelSwitch1L1A') {
            localStorage.setItem('SelasaKondisi1L1A', JSON.stringify(SelDataWaktuL1A));
            document.getElementById(SelNotifIdL1A).innerText = `${SelTimeValueL1A}`;
            } else if (SelSwitchIdL1A === 'SelSwitch2L1A') {
            localStorage.setItem('SelasaKondisi2L1A', JSON.stringify(SelDataWaktuL1A));
            document.getElementById(SelNotifIdL1A).innerText = `${SelTimeValueL1A}`;
        };
        SelTampilanWaktuL1A();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SelTampilanWaktuL1A() {
    const SelKondisi1L1A = JSON.parse(localStorage.getItem('SelasaKondisi1L1A'));
    const SelKondisi2L1A = JSON.parse(localStorage.getItem('SelasaKondisi2L1A'));

    if(SelKondisi1L1A){
        document.getElementById('SelTextJam1L1A').innerText = `${SelKondisi1L1A.time}`
    }
    if(SelKondisi2L1A){
        document.getElementById('SelTextJam2L1A').innerText = `${SelKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (SelKondisi1L1A) SelCekWaktuL1A(SelKondisi1L1A, 'SelSwitch1L1A', 'SelTimer1L1A');
        if (SelKondisi2L1A) SelCekWaktuL1A(SelKondisi2L1A, 'SelSwitch2L1A', 'SelTimer2L1A');
    }, 1000);
}

function SelCekWaktuL1A(SelDataWaktuL1A, SelSwitchIdL1A, SelTimerIdL1A) {
    const SelCurrentTimeL1A = new Date();
    const SelCurrentDayL1A = SelCurrentTimeL1A.getDay();
    const SelCurrentHourL1A = SelCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (SelCurrentDayL1A === SelDataWaktuL1A.SdayL1A && SelCurrentHourL1A === SelDataWaktuL1A.time) {
        if (!SelDataWaktuL1A.SelStartTimeL1A) {
            SelDataWaktuL1A.SelStartTimeL1A = new Date().toISOString();
            localStorage.setItem(SelSwitchIdL1A === 'SelSwitch1L1A' ? 'SelasaKondisi1L1A' : 'SelasaKondisi2L1A', JSON.stringify(SelDataWaktuL1A));
        }
        controlLedSelL1A('on');  // Nyalakan LED
        document.getElementById(SelSwitchIdL1A).checked = true;

        const SelStartTimeL1A = new Date(SelDataWaktuL1A.SelStartTimeL1A);
        const SelDetikLewatL1A = Math.floor((SelCurrentTimeL1A - SelStartTimeL1A) / 1000);
        const SelRemainingDetikL1A = SelDataWaktuL1A.duration * 60 - SelDetikLewatL1A;

        if (SelRemainingDetikL1A > 0) {
            SelStartTimerL1A(SelTimerIdL1A, SelRemainingDetikL1A, SelSwitchIdL1A);
        } else {
            SelResetWaktuL1A(SelSwitchIdL1A, SelTimerIdL1A);
        }
    }
}

function SelResetWaktuL1A(SelSwitchIdL1A, SelTimerIdL1A) {
    document.getElementById(SelSwitchIdL1A).checked = false;
    document.getElementById(SelTimerIdL1A).innerText = '';
    document.getElementById(SelTimerIdL1A).style.display = 'none';

    const SkeyL1A = SelSwitchIdL1A === 'SelSwitch1L1A' ? 'SelasaKondisi1L1A' : 'SelasaKondisi2L1A';
    const SelDataWaktuL1A = JSON.parse(localStorage.getItem(SkeyL1A));
    if (SelDataWaktuL1A) {
        SelDataWaktuL1A.SelStartTimeL1A = null;
        localStorage.setItem(SkeyL1A, JSON.stringify(SelDataWaktuL1A));
        controlLedSelL1A('off');  // Matikan LED
    }
}

function SelStartTimerL1A(SelTimerIdL1A, SelInSecL1A, SelSwitchIdL1A) {
    let SelRemainingWakL1A = SelInSecL1A;

    const SelTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(SelRemainingWakL1A / 60);
        const Detik = SelRemainingWakL1A % 60;

        document.getElementById(SelTimerIdL1A).style.display = 'block';
        document.getElementById(SelTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        SelRemainingWakL1A--;

        if(SelRemainingWakL1A < 0){
            clearInterval(SelTimerIntervalL1A);
            SelResetWaktuL1A(SelSwitchIdL1A, SelTimerIdL1A);
            localStorage.setItem('TimerEnd', JSON.stringify(SelRemainingWakL1A));
        }
    }, 1000);
}

window.onload = SelTampilanWaktuL1A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi1L1A');
    document.getElementById('SelTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi2L1A');
    document.getElementById('SelTextJam2L1A').innerText = 'No Time';
});