// // NAVBAR
const HomeSelL1P = document.getElementById("iconHome");
HomeSelL1P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedSelL1P(state) {
    const urlSelL1A = `http://192.168.4.100/ledL1A?state=${state}`;
    const urlSelL1P = `http://192.168.4.100/ledL1P?state=${state}`;
    fetch(urlSelL1A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlSelL1P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI SELASA.....
function setHariSelasaL1P(SelTimeIdL1P, SelDurasiIdL1P, SelSwitchIdL1P, SelNotifIdL1P, SelTimerIdL1P) {
    const SelTimeValueL1P = document.getElementById(SelTimeIdL1P).value;
    const SelDurasiValueL1P = document.getElementById(SelDurasiIdL1P).value;
    
    if (SelTimeValueL1P && SelDurasiValueL1P ) {
        const SdayL1P = 2;
        const SelDataWaktuL1P = { 
            time: SelTimeValueL1P, 
            duration: SelDurasiValueL1P, 
            SdayL1P: SdayL1P, 
            SelStartTimeL1P: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${SelTimeValueL1P}&duration=${SelDurasiValueL1P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (SelSwitchIdL1P === 'SelSwitch1L1P') {
            localStorage.setItem('SelasaKondisi1L1P', JSON.stringify(SelDataWaktuL1P));
            document.getElementById(SelNotifIdL1P).innerText = `${SelTimeValueL1P}`;
            } else if (SelSwitchIdL1P === 'SelSwitch2L1P') {
            localStorage.setItem('SelasaKondisi2L1P', JSON.stringify(SelDataWaktuL1P));
            document.getElementById(SelNotifIdL1P).innerText = `${SelTimeValueL1P}`;
        };
        SelTampilanWaktuL1P();
    })
        .catch(error => {
            console.error("Error: ", error);
        });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SelTampilanWaktuL1P() {
    const SelKondisi1L1P = JSON.parse(localStorage.getItem('SelasaKondisi1L1P'));
    const SelKondisi2L1P = JSON.parse(localStorage.getItem('SelasaKondisi2L1P'));

    if(SelKondisi1L1P){
        document.getElementById('SelTextJam1L1P').innerText = `${SelKondisi1L1P.time}`
    }
    if(SelKondisi2L1P){
        document.getElementById('SelTextJam2L1P').innerText = `${SelKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (SelKondisi1L1P) SelCekWaktuL1P(SelKondisi1L1P, 'SelSwitch1L1P', 'SelTimer1L1P');
        if (SelKondisi2L1P) SelCekWaktuL1P(SelKondisi2L1P, 'SelSwitch2L1P', 'SelTimer2L1P');
    }, 1000);
}

function SelCekWaktuL1P(SelDataWaktuL1P, SelSwitchIdL1P, SelTimerIdL1P) {
    const SelCurrentTimeL1P = new Date();
    const SelCurrentDayL1P = SelCurrentTimeL1P.getDay();
    const SelCurrentHourL1P = SelCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (SelCurrentDayL1P === SelDataWaktuL1P.SdayL1P && SelCurrentHourL1P === SelDataWaktuL1P.time) {
        if (!SelDataWaktuL1P.SelStartTimeL1P) {
            SelDataWaktuL1P.SelStartTimeL1P = new Date().toISOString();
            localStorage.setItem(SelSwitchIdL1P === 'SelSwitch1L1P' ? 'SelasaKondisi1L1P' : 'SelasaKondisi2L1P', JSON.stringify(SelDataWaktuL1P));
        }
        controlLedSelL1P('on');  // Nyalakan LED
        document.getElementById(SelSwitchIdL1P).checked = true;

        const SelStartTimeL1P = new Date(SelDataWaktuL1P.SelStartTimeL1P);
        const SelDetikLewatL1P = Math.floor((SelCurrentTimeL1P - SelStartTimeL1P) / 1000);
        const SelRemainingDetikL1P = SelDataWaktuL1P.duration * 60 - SelDetikLewatL1P;

        if (SelRemainingDetikL1P > 0) {
            SelStartTimerL1P(SelTimerIdL1P, SelRemainingDetikL1P, SelSwitchIdL1P);
        } else {
            SelResetWaktuL1P(SelSwitchIdL1P, SelTimerIdL1P);
        }
    }
}

function SelResetWaktuL1P(SelSwitchIdL1P, SelTimerIdL1P) {
    document.getElementById(SelSwitchIdL1P).checked = false;
    document.getElementById(SelTimerIdL1P).innerText = '';
    document.getElementById(SelTimerIdL1P).style.display = 'none';

    const SkeyL1P = SelSwitchIdL1P === 'SelSwitch1L1P' ? 'SelasaKondisi1L1P' : 'SelasaKondisi2L1P';
    const SelDataWaktuL1P = JSON.parse(localStorage.getItem(SkeyL1P));
    if (SelDataWaktuL1P) {
        SelDataWaktuL1P.SelStartTimeL1P = null;
        localStorage.setItem(SkeyL1P, JSON.stringify(SelDataWaktuL1P));
        controlLedSelL1P('off');  // Matikan LED
    }
}

function SelStartTimerL1P(SelTimerIdL1P, SelInSecL1P, SelSwitchIdL1P) {
    let SelRemainingWakL1P = SelInSecL1P;

    const SelTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(SelRemainingWakL1P / 60);
        const Detik = SelRemainingWakL1P % 60;

        document.getElementById(SelTimerIdL1P).style.display = 'block';
        document.getElementById(SelTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        SelRemainingWakL1P--;

        if(SelRemainingWakL1P < 0){
            clearInterval(SelTimerIntervalL1P);
            SelResetWaktuL1P(SelSwitchIdL1P, SelTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(SelRemainingWakL1P));
        }
    }, 1000);
}

window.onload = SelTampilanWaktuL1P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi1L1P');
    document.getElementById('SelTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi2L1P');
    document.getElementById('SelTextJam2L1P').innerText = 'No Time';
});