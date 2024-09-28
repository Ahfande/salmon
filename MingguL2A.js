// NAVBAR
// // NAVBAR
const HomeML2A = document.getElementById("iconHome");
HomeML2A.addEventListener("click", () => {
  window.location.href = "Home.html";
});


//SERVER
function controlLedMinL2A(state) {
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


// HARI MINGGU.....
function setHariMingguL2A(MinTimeIdL2A, MinDurasiIdL2A, MinSwitchIdL2A, MinNotifIdL2A, MinTimerIdL2A) {
    const MinTimeValueL2A = document.getElementById(MinTimeIdL2A).value;
    const MinDurasiValueL2A = document.getElementById(MinDurasiIdL2A).value;
    
    if (MinTimeValueL2A && MinDurasiValueL2A ) {
        const MdayL2A = 0;
        const MinDataWaktuL2A = { 
            time: MinTimeValueL2A, 
            duration: MinDurasiValueL2A, 
            MdayL2A: MdayL2A, 
            MinStartTimeL2A: null };
        
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${MinTimeValueL2A}&duration=${MinDurasiValueL2A}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
        if (MinSwitchIdL2A === 'MinSwitch1L2A') {
            localStorage.setItem('MingguKondisi1L2A', JSON.stringify(MinDataWaktuL2A));
            document.getElementById(MinNotifIdL2A).innerText = `${MinTimeValueL2A}`;
        } else if (MinSwitchIdL2A === 'MinSwitch2L2A') {
            localStorage.setItem('MingguKondisi2L2A', JSON.stringify(MinDataWaktuL2A));
            document.getElementById(MinNotifIdL2A).innerText = `${MinTimeValueL2A}`;
        };
        MinTampilanWaktuL2A();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function MinTampilanWaktuL2A() {
    const MinKondisi1L2A = JSON.parse(localStorage.getItem('MingguKondisi1L2A'));
    const MinKondisi2L2A = JSON.parse(localStorage.getItem('MingguKondisi2L2A'));

    if(MinKondisi1L2A){
        document.getElementById('MinTextJam1L2A').innerText = `${MinKondisi1L2A.time}`
    }
    if(MinKondisi2L2A){
        document.getElementById('MinTextJam2L2A').innerText = `${MinKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (MinKondisi1L2A) MinCekWaktuL2A(MinKondisi1L2A, 'MinSwitch1L2A', 'MinTimer1L2A');
        if (MinKondisi2L2A) MinCekWaktuL2A(MinKondisi2L2A, 'MinSwitch2L2A', 'MinTimer2L2A');
    }, 1000);
}

function MinCekWaktuL2A(MinDataWaktuL2A, MinSwitchIdL2A, MinTimerIdL2A) {
    const MinCurrentTimeL2A = new Date();
    const MinCurrentDayL2A = MinCurrentTimeL2A.getDay();
    const MinCurrentHourL2A = MinCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (MinCurrentDayL2A === MinDataWaktuL2A.MdayL2A && MinCurrentHourL2A === MinDataWaktuL2A.time) {
        if (!MinDataWaktuL2A.MinStartTimeL2A) {
            MinDataWaktuL2A.MinStartTimeL2A = new Date().toISOString();
            localStorage.setItem(MinSwitchIdL2A === 'MinSwitch1L2A' ? 'MingguKondisi1L2A' : 'MingguKondisi2L2A', JSON.stringify(MinDataWaktuL2A));
        }
        controlLedMinL2A('on');  // Nyalakan LED
        document.getElementById(MinSwitchIdL2A).checked = true;

        const MinStartTimeL2A = new Date(MinDataWaktuL2A.MinStartTimeL2A);
        const MinDetikLewatL2A = Math.floor((MinCurrentTimeL2A - MinStartTimeL2A) / 1000);
        const MinRemainingDetikL2A = MinDataWaktuL2A.duration * 60 - MinDetikLewatL2A;

        if (MinRemainingDetikL2A > 0) {
            MinStartTimerL2A(MinTimerIdL2A, MinRemainingDetikL2A, MinSwitchIdL2A);
        } else {
            MinResetWaktuL2A(MinSwitchIdL2A, MinTimerIdL2A);
        }
    }
}

function MinResetWaktuL2A(MinSwitchIdL2A, MinTimerIdL2A) {
    document.getElementById(MinSwitchIdL2A).checked = false;
    document.getElementById(MinTimerIdL2A).innerText = '';
    document.getElementById(MinTimerIdL2A).style.display = 'none';

    const MkeyL2A = MinSwitchIdL2A === 'MinSwitch1L2A' ? 'MingguKondisi1L2A' : 'MingguKondisi2L2A';
    const MinDataWaktuL2A = JSON.parse(localStorage.getItem(MkeyL2A));
    if (MinDataWaktuL2A) {
        MinDataWaktuL2A.MinStartTimeL2A = null;
        localStorage.setItem(MkeyL2A, JSON.stringify(MinDataWaktuL2A));
        controlLedMinL2A('off');  // Matikan LED
    }
}

function MinStartTimerL2A(MinTimerIdL2A, MinInSecL2A, MinSwitchIdL2A) {
    let MinRemainingWakL2A = MinInSecL2A;

    const MinTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(MinRemainingWakL2A / 60);
        const Detik = MinRemainingWakL2A % 60;

        document.getElementById(MinTimerIdL2A).style.display = 'block';
        document.getElementById(MinTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        MinRemainingWakL2A--;

        if(MinRemainingWakL2A < 0){
            clearInterval(MinTimerIntervalL2A);
            MinResetWaktuL2A(MinSwitchIdL2A, MinTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(MinRemainingWakL2A));
        }
    }, 1000);
}
window.onload = MinTampilanWaktuL2A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi1L2A');
    document.getElementById('MinTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi2L2A');
    document.getElementById('MinTextJam2L2A').innerText = 'No Time';
});