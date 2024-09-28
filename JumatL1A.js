// NAVBAR
const HomeJumL1A = document.getElementById("iconHome");
HomeJumL1A.addEventListener("click", () => {
  window.location.href = "Home.html";
});

//SERVER
function controlLedJumL1A(state) {
    const url = `http://192.168.4.101/ledL1A?state=${state}`;
    fetch(url)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}

// HARI JUMAT.....
function setHariJumatL1A(JumTimeIdL1A, JumDurasiIdL1A, JumSwitchIdL1A, JumNotifIdL1A, JumTimerIdL1A) {
    const JumTimeValueL1A = document.getElementById(JumTimeIdL1A).value;
    const JumDurasiValueL1A = document.getElementById(JumDurasiIdL1A).value;
    
    if (JumTimeValueL1A && JumDurasiValueL1A ) {
        const JdayL1A = 5;
        const JumDataWaktuL1A = { 
            time: JumTimeValueL1A, 
            duration: JumDurasiValueL1A, 
            JdayL1A: JdayL1A, 
            JumStartTimeL1A: null };

        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.101/set?time=${JumTimeValueL1A}&duration=${JumDurasiValueL1A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
            if (JumSwitchIdL1A === 'JumSwitch1L1A') {
            localStorage.setItem('JumatKondisi1L1A', JSON.stringify(JumDataWaktuL1A));
            document.getElementById(JumNotifIdL1A).innerText = `${JumTimeValueL1A}`;
            } else if (JumSwitchIdL1A === 'JumSwitch2L1A') {
            localStorage.setItem('JumatKondisi2L1A', JSON.stringify(JumDataWaktuL1A));
            document.getElementById(JumNotifIdL1A).innerText = `${JumTimeValueL1A}`;
            }
            JumTampilanWaktuL1A();
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function JumTampilanWaktuL1A() {
    const JumKondisi1L1A = JSON.parse(localStorage.getItem('JumatKondisi1L1A'));
    const JumKondisi2L1A = JSON.parse(localStorage.getItem('JumatKondisi2L1A'));

    if(JumKondisi1L1A){
        document.getElementById('JumTextJam1L1A').innerText = `${JumKondisi1L1A.time}`
    }
    if(JumKondisi2L1A){
        document.getElementById('JumTextJam2L1A').innerText = `${JumKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (JumKondisi1L1A) JumCekWaktuL1A(JumKondisi1L1A, 'JumSwitch1L1A', 'JumTimer1L1A');
        if (JumKondisi2L1A) JumCekWaktuL1A(JumKondisi2L1A, 'JumSwitch2L1A', 'JumTimer2L1A');
    }, 1000);
}

function JumCekWaktuL1A(JumDataWaktuL1A, JumSwitchIdL1A, JumTimerIdL1A) {
    const JumCurrentTimeL1A = new Date();
    const JumCurrentDayL1A = JumCurrentTimeL1A.getDay();
    const JumCurrentHourL1A = JumCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (JumCurrentDayL1A === JumDataWaktuL1A.JdayL1A && JumCurrentHourL1A === JumDataWaktuL1A.time) {
        if (!JumDataWaktuL1A.JumStartTimeL1A) {
            JumDataWaktuL1A.JumStartTimeL1A = new Date().toISOString();
            localStorage.setItem(JumSwitchIdL1A === 'JumSwitch1L1A' ? 'JumatKondisi1L1A' : 'JumatKondisi2L1A', JSON.stringify(JumDataWaktuL1A));
        }
        controlLedJumL1A('on');  // Nyalakan LED
        document.getElementById(JumSwitchIdL1A).checked = true;

        const JumStartTimeL1A = new Date(JumDataWaktuL1A.JumStartTimeL1A);
        const JumDetikLewatL1A = Math.floor((JumCurrentTimeL1A - JumStartTimeL1A) / 1000);
        const JumRemainingDetikL1A = JumDataWaktuL1A.duration * 60 - JumDetikLewatL1A;

        if (JumRemainingDetikL1A > 0) {
            JumStartTimerL1A(JumTimerIdL1A, JumRemainingDetikL1A, JumSwitchIdL1A);
        } else {
            JumResetWaktuL1A(JumSwitchIdL1A, JumTimerIdL1A);
        }
    }
}

function JumResetWaktuL1A(JumSwitchIdL1A, JumTimerIdL1A) {
    document.getElementById(JumSwitchIdL1A).checked = false;
    document.getElementById(JumTimerIdL1A).innerText = '';
    document.getElementById(JumTimerIdL1A).style.display = 'none';

    const JkeyL1A = JumSwitchIdL1A === 'JumSwitch1L1A' ? 'JumatKondisi1L1A' : 'JumatKondisi2L1A';
    const JumDataWaktuL1A = JSON.parse(localStorage.getItem(JkeyL1A));
    if (JumDataWaktuL1A) {
        JumDataWaktuL1A.JumStartTimeL1A = null;
        localStorage.setItem(JkeyL1A, JSON.stringify(JumDataWaktuL1A));
        controlLedJumL1A('off');  // Matikan LED
    }
}

function JumStartTimerL1A(JumTimerIdL1A, JumInSecL1A, JumSwitchIdL1A) {
    let JumRemainingWakL1A = JumInSecL1A;

    const JumTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(JumRemainingWakL1A / 60);
        const Detik = JumRemainingWakL1A % 60;

        document.getElementById(JumTimerIdL1A).style.display = 'block';
        document.getElementById(JumTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        JumRemainingWakL1A--;

        if(JumRemainingWakL1A < 0){
            clearInterval(JumTimerIntervalL1A);
            JumResetWaktuL1A(JumSwitchIdL1A, JumTimerIdL1A);
            localStorage.setItem('TimerEnd', JSON.stringify(JumRemainingWakL1A));
        }
    }, 1000);
}

window.onload = JumTampilanWaktuL1A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi1L1A');
    document.getElementById('JumTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi2L1A');
    document.getElementById('JumTextJam2L1A').innerText = 'No Time';
});