// NAVBAR
const HomeJumL1P = document.getElementById("iconHome");
HomeJumL1P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedJumL1P(state) {
    const urlJumL1A = `http://192.168.4.100/ledL1A?state=${state}`;
    const urlJumL1P = `http://192.168.4.100/ledL1P?state=${state}`;
    fetch(urlJumL1A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlJumL1P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI JUMAT.....
function setHariJumatL1P(JumTimeIdL1P, JumDurasiIdL1P, JumSwitchIdL1P, JumNotifIdL1P, JumTimerIdL1P) {
    const JumTimeValueL1P = document.getElementById(JumTimeIdL1P).value;
    const JumDurasiValueL1P = document.getElementById(JumDurasiIdL1P).value;
    
    if (JumTimeValueL1P && JumDurasiValueL1P ) {
        const JdayL1P = 5;
        const JumDataWaktuL1P = { 
            time: JumTimeValueL1P, 
            duration: JumDurasiValueL1P, 
            JdayL1P: JdayL1P, 
            JumStartTimeL1P: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${JumTimeValueL1P}&duration=${JumDurasiValueL1P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (JumSwitchIdL1P === 'JumSwitch1L1P') {
            localStorage.setItem('JumatKondisi1L1P', JSON.stringify(JumDataWaktuL1P));
            document.getElementById(JumNotifIdL1P).innerText = `${JumTimeValueL1P}`;
            } else if (JumSwitchIdL1P === 'JumSwitch2L1P') {
            localStorage.setItem('JumatKondisi2L1P', JSON.stringify(JumDataWaktuL1P));
            document.getElementById(JumNotifIdL1P).innerText = `${JumTimeValueL1P}`;
            }
            JumTampilanWaktuL1P();
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function JumTampilanWaktuL1P() {
    const JumKondisi1L1P = JSON.parse(localStorage.getItem('JumatKondisi1L1P'));
    const JumKondisi2L1P = JSON.parse(localStorage.getItem('JumatKondisi2L1P'));

    if(JumKondisi1L1P){
        document.getElementById('JumTextJam1L1P').innerText = `${JumKondisi1L1P.time}`
    }
    if(JumKondisi2L1P){
        document.getElementById('JumTextJam2L1P').innerText = `${JumKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (JumKondisi1L1P) JumCekWaktuL1P(JumKondisi1L1P, 'JumSwitch1L1P', 'JumTimer1L1P');
        if (JumKondisi2L1P) JumCekWaktuL1P(JumKondisi2L1P, 'JumSwitch2L1P', 'JumTimer2L1P');
    }, 1000);
}

function JumCekWaktuL1P(JumDataWaktuL1P, JumSwitchIdL1P, JumTimerIdL1P) {
    const JumCurrentTimeL1P = new Date();
    const JumCurrentDayL1P = JumCurrentTimeL1P.getDay();
    const JumCurrentHourL1P = JumCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (JumCurrentDayL1P === JumDataWaktuL1P.JdayL1P && JumCurrentHourL1P === JumDataWaktuL1P.time) {
        if (!JumDataWaktuL1P.JumStartTimeL1P) {
            JumDataWaktuL1P.JumStartTimeL1P = new Date().toISOString();
            localStorage.setItem(JumSwitchIdL1P === 'JumSwitch1L1P' ? 'JumatKondisi1L1P' : 'JumatKondisi2L1P', JSON.stringify(JumDataWaktuL1P));
        }
        controlLedJumL1P('on');  // Nyalakan LED
        document.getElementById(JumSwitchIdL1P).checked = true;

        const JumStartTimeL1P = new Date(JumDataWaktuL1P.JumStartTimeL1P);
        const JumDetikLewatL1P = Math.floor((JumCurrentTimeL1P - JumStartTimeL1P) / 1000);
        const JumRemainingDetikL1P = JumDataWaktuL1P.duration * 60 - JumDetikLewatL1P;

        if (JumRemainingDetikL1P > 0) {
            JumStartTimerL1P(JumTimerIdL1P, JumRemainingDetikL1P, JumSwitchIdL1P);
        } else {
            JumResetWaktuL1P(JumSwitchIdL1P, JumTimerIdL1P);
        }
    }
}

function JumResetWaktuL1P(JumSwitchIdL1P, JumTimerIdL1P) {
    document.getElementById(JumSwitchIdL1P).checked = false;
    document.getElementById(JumTimerIdL1P).innerText = '';
    document.getElementById(JumTimerIdL1P).style.display = 'none';

    const JkeyL1P = JumSwitchIdL1P === 'JumSwitch1L1P' ? 'JumatKondisi1L1P' : 'JumatKondisi2L1P';
    const JumDataWaktuL1P = JSON.parse(localStorage.getItem(JkeyL1P));
    if (JumDataWaktuL1P) {
        JumDataWaktuL1P.JumStartTimeL1P = null;
        localStorage.setItem(JkeyL1P, JSON.stringify(JumDataWaktuL1P));
        controlLedJumL1P('off');  // Matikan LED
    }
}

function JumStartTimerL1P(JumTimerIdL1P, JumInSecL1P, JumSwitchIdL1P) {
    let JumRemainingWakL1P = JumInSecL1P;

    const JumTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(JumRemainingWakL1P / 60);
        const Detik = JumRemainingWakL1P % 60;

        document.getElementById(JumTimerIdL1P).style.display = 'block';
        document.getElementById(JumTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        JumRemainingWakL1P--;

        if(JumRemainingWakL1P < 0){
            clearInterval(JumTimerIntervalL1P);
            JumResetWaktuL1P(JumSwitchIdL1P, JumTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(JumRemainingWakL1P));
        }
    }, 1000);
}

window.onload = JumTampilanWaktuL1P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi1L1P');
    document.getElementById('JumTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi2L1P');
    document.getElementById('JumTextJam2L1P').innerText = 'No Time';
});