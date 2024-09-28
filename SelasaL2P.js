// NAVBAR
const HomeSelL2P = document.getElementById("iconHome");
HomeSelL2P.addEventListener("click", () => {
  window.location.href = "Home.html";
});


//SERVER
function controlLedSelL2P(state) {
    const urlSelL2A = `http://192.168.4.100/ledL2A?state=${state}`;
    const urlSelL2P = `http://192.168.4.100/ledL2P?state=${state}`;
    fetch(urlSelL2A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlSelL2P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI SELASA.....
function setHariSelasaL2P(SelTimeIdL2P, SelDurasiIdL2P, SelSwitchIdL2P, SelNotifIdL2P, SelTimerIdL2P) {
    const SelTimeValueL2P = document.getElementById(SelTimeIdL2P).value;
    const SelDurasiValueL2P = document.getElementById(SelDurasiIdL2P).value;
    
    if (SelTimeValueL2P && SelDurasiValueL2P ) {
        const SdayL2P = 2;
        const SelDataWaktuL2P = { 
            time: SelTimeValueL2P, 
            duration: SelDurasiValueL2P, 
            SdayL2P: SdayL2P, 
            SelStartTimeL2P: null };
        
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${SelTimeValueL2P}&duration=${SelDurasiValueL2P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (SelSwitchIdL2P === 'SelSwitch1L2P') {
            localStorage.setItem('SelasaKondisi1L2P', JSON.stringify(SelDataWaktuL2P));
            document.getElementById(SelNotifIdL2P).innerText = `${SelTimeValueL2P}`;
            } else if (SelSwitchIdL2P === 'SelSwitch2L2P') {
            localStorage.setItem('SelasaKondisi2L2P', JSON.stringify(SelDataWaktuL2P));
            document.getElementById(SelNotifIdL2P).innerText = `${SelTimeValueL2P}`;
        };
        SelTampilanWaktuL2P();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function SelTampilanWaktuL2P() {
    const SelKondisi1L2P = JSON.parse(localStorage.getItem('SelasaKondisi1L2P'));
    const SelKondisi2L2P = JSON.parse(localStorage.getItem('SelasaKondisi2L2P'));

    if(SelKondisi1L2P){
        document.getElementById('SelTextJam1L2P').innerText = `${SelKondisi1L2P.time}`
    }
    if(SelKondisi2L2P){
        document.getElementById('SelTextJam2L2P').innerText = `${SelKondisi2L2P.time}`
    }

    setInterval(() =>{
        if (SelKondisi1L2P) SelCekWaktuL2P(SelKondisi1L2P, 'SelSwitch1L2P', 'SelTimer1L2P');
        if (SelKondisi2L2P) SelCekWaktuL2P(SelKondisi2L2P, 'SelSwitch2L2P', 'SelTimer2L2P');
    }, 1000);
}

function SelCekWaktuL2P(SelDataWaktuL2P, SelSwitchIdL2P, SelTimerIdL2P) {
    const SelCurrentTimeL2P = new Date();
    const SelCurrentDayL2P = SelCurrentTimeL2P.getDay();
    const SelCurrentHourL2P = SelCurrentTimeL2P.toTimeString().slice(0, 5); 

    if (SelCurrentDayL2P === SelDataWaktuL2P.SdayL2P && SelCurrentHourL2P === SelDataWaktuL2P.time) {
        if (!SelDataWaktuL2P.SelStartTimeL2P) {
            SelDataWaktuL2P.SelStartTimeL2P = new Date().toISOString();
            localStorage.setItem(SelSwitchIdL2P === 'SelSwitch1L2P' ? 'SelasaKondisi1L2P' : 'SelasaKondisi2L2P', JSON.stringify(SelDataWaktuL2P));
        }
        controlLedSelL2P('on');  // Nyalakan LED
        document.getElementById(SelSwitchIdL2P).checked = true;

        const SelStartTimeL2P = new Date(SelDataWaktuL2P.SelStartTimeL2P);
        const SelDetikLewatL2P = Math.floor((SelCurrentTimeL2P - SelStartTimeL2P) / 1000);
        const SelRemainingDetikL2P = SelDataWaktuL2P.duration * 60 - SelDetikLewatL2P;

        if (SelRemainingDetikL2P > 0) {
            SelStartTimerL2P(SelTimerIdL2P, SelRemainingDetikL2P, SelSwitchIdL2P);
        } else {
            SelResetWaktuL2P(SelSwitchIdL2P, SelTimerIdL2P);
        }
    }
}

function SelResetWaktuL2P(SelSwitchIdL2P, SelTimerIdL2P) {
    document.getElementById(SelSwitchIdL2P).checked = false;
    document.getElementById(SelTimerIdL2P).innerText = '';
    document.getElementById(SelTimerIdL2P).style.display = 'none';

    const SkeyL2P = SelSwitchIdL2P === 'SelSwitch1L2P' ? 'SelasaKondisi1L2P' : 'SelasaKondisi2L2P';
    const SelDataWaktuL2P = JSON.parse(localStorage.getItem(SkeyL2P));
    if (SelDataWaktuL2P) {
        SelDataWaktuL2P.SelStartTimeL2P = null;
        localStorage.setItem(SkeyL2P, JSON.stringify(SelDataWaktuL2P));
        controlLedSelL2P('off');  // Matikan LED
    }
}

function SelStartTimerL2P(SelTimerIdL2P, SelInSecL2P, SelSwitchIdL2P) {
    let SelRemainingWakL2P = SelInSecL2P;

    const SelTimerIntervalL2P = setInterval(() => {
        const Menit = Math.floor(SelRemainingWakL2P / 60);
        const Detik = SelRemainingWakL2P % 60;

        document.getElementById(SelTimerIdL2P).style.display = 'block';
        document.getElementById(SelTimerIdL2P).innerText = `${Menit}: ${Detik}`;
        
        SelRemainingWakL2P--;

        if(SelRemainingWakL2P < 0){
            clearInterval(SelTimerIntervalL2P);
            SelResetWaktuL2P(SelSwitchIdL2P, SelTimerIdL2P);
            localStorage.setItem('TimeEndSelL2P', JSON.stringify(SelRemainingWakL2P));
        }
    }, 1000);
}

window.onload = SelTampilanWaktuL2P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi1L2P');
    document.getElementById('SelTextJam1L2P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi2L2P');
    document.getElementById('SelTextJam2L2P').innerText = 'No Time';
});