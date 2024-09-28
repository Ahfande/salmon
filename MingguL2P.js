// NAVBAR
const HomeML2P = document.getElementById("iconHome");
HomeML2P.addEventListener("click", () => {
  window.location.href = "Home.html";
});


//SERVER
function controlLedMinL2P(state) {
    const urlMinL2A = `http://192.168.4.100/ledL2A?state=${state}`;
    const urlMinL2P = `http://192.168.4.100/ledL2P?state=${state}`;
    fetch(urlMinL2A)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    fetch(urlMinL2P)
      .then(response => response.text())
      .then(data => {
        console.log("Response from ESP8266: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
}


// HARI MINGGU.....
function setHariMingguL2P(MinTimeIdL2P, MinDurasiIdL2P, MinSwitchIdL2P, MinNotifIdL2P, MinTimerIdL2P) {
    const MinTimeValueL2P = document.getElementById(MinTimeIdL2P).value;
    const MinDurasiValueL2P = document.getElementById(MinDurasiIdL2P).value;
    
    if (MinTimeValueL2P && MinDurasiValueL2P ) {
        const MdayL2P = 0;
        const MinDataWaktuL2P = { 
            time: MinTimeValueL2P, 
            duration: MinDurasiValueL2P, 
            MdayL2P: MdayL2P, 
            MinStartTimeL2P: null };
        
        // Mengirimkan request ke ESP8266 dengan fetch()
        fetch(`http://192.168.4.100/set?time=${MinTimeValueL2P}&duration=${MinDurasiValueL2P}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from ESP8266: ", data);
        if (MinSwitchIdL2P === 'MinSwitch1L2P') {
            localStorage.setItem('MingguKondisi1L2P', JSON.stringify(MinDataWaktuL2P));
            document.getElementById(MinNotifIdL2P).innerText = `${MinTimeValueL2P}`;
        } else if (MinSwitchIdL2P === 'MinSwitch2L2P') {
            localStorage.setItem('MingguKondisi2L2P', JSON.stringify(MinDataWaktuL2P));
            document.getElementById(MinNotifIdL2P).innerText = `${MinTimeValueL2P}`;
        };
        MinTampilanWaktuL2P();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function MinTampilanWaktuL2P() {
    const MinKondisi1L2P = JSON.parse(localStorage.getItem('MingguKondisi1L2P'));
    const MinKondisi2L2P = JSON.parse(localStorage.getItem('MingguKondisi2L2P'));

    if(MinKondisi1L2P){
        document.getElementById('MinTextJam1L2P').innerText = `${MinKondisi1L2P.time}`
    }
    if(MinKondisi2L2P){
        document.getElementById('MinTextJam2L2P').innerText = `${MinKondisi2L2P.time}`
    }

    setInterval(() =>{
        if (MinKondisi1L2P) MinCekWaktuL2P(MinKondisi1L2P, 'MinSwitch1L2P', 'MinTimer1L2P');
        if (MinKondisi2L2P) MinCekWaktuL2P(MinKondisi2L2P, 'MinSwitch2L2P', 'MinTimer2L2P');
    }, 1000);
}

function MinCekWaktuL2P(MinDataWaktuL2P, MinSwitchIdL2P, MinTimerIdL2P) {
    const MinCurrentTimeL2P = new Date();
    const MinCurrentDayL2P = MinCurrentTimeL2P.getDay();
    const MinCurrentHourL2P = MinCurrentTimeL2P.toTimeString().slice(0, 5); 

    if (MinCurrentDayL2P === MinDataWaktuL2P.MdayL2P && MinCurrentHourL2P === MinDataWaktuL2P.time) {
        if (!MinDataWaktuL2P.MinStartTimeL2P) {
            MinDataWaktuL2P.MinStartTimeL2P = new Date().toISOString();
            localStorage.setItem(MinSwitchIdL2P === 'MinSwitch1L2P' ? 'MingguKondisi1L2P' : 'MingguKondisi2L2P', JSON.stringify(MinDataWaktuL2P));
        }
        controlLedMinL2P('on');  // Nyalakan LED
        document.getElementById(MinSwitchIdL2P).checked = true;

        const MinStartTimeL2P = new Date(MinDataWaktuL2P.MinStartTimeL2P);
        const MinDetikLewatL2P = Math.floor((MinCurrentTimeL2P - MinStartTimeL2P) / 1000);
        const MinRemainingDetikL2P = MinDataWaktuL2P.duration * 60 - MinDetikLewatL2P;

        if (MinRemainingDetikL2P > 0) {
            MinStartTimerL2P(MinTimerIdL2P, MinRemainingDetikL2P, MinSwitchIdL2P);
        } else {
            MinResetWaktuL2P(MinSwitchIdL2P, MinTimerIdL2P);
        }
    }
}

function MinResetWaktuL2P(MinSwitchIdL2P, MinTimerIdL2P) {
    document.getElementById(MinSwitchIdL2P).checked = false;
    document.getElementById(MinTimerIdL2P).innerText = '';
    document.getElementById(MinTimerIdL2P).style.display = 'none';

    const MkeyL2P = MinSwitchIdL2P === 'MinSwitch1L2P' ? 'MingguKondisi1L2P' : 'MingguKondisi2L2P';
    const MinDataWaktuL2P = JSON.parse(localStorage.getItem(MkeyL2P));
    if (MinDataWaktuL2P) {
        MinDataWaktuL2P.MinStartTimeL2P = null;
        localStorage.setItem(MkeyL2P, JSON.stringify(MinDataWaktuL2P));
        controlLedMinL2P('off');  // Matikan LED
    }
}

function MinStartTimerL2P(MinTimerIdL2P, MinInSecL2P, MinSwitchIdL2P) {
    let MinRemainingWakL2P = MinInSecL2P;

    const MinTimerIntervalL2P = setInterval(() => {
        const Menit = Math.floor(MinRemainingWakL2P / 60);
        const Detik = MinRemainingWakL2P % 60;

        document.getElementById(MinTimerIdL2P).style.display = 'block';
        document.getElementById(MinTimerIdL2P).innerText = `${Menit}: ${Detik}`;
        
        MinRemainingWakL2P--;

        if(MinRemainingWakL2P < 0){
            clearInterval(MinTimerIntervalL2P);
            MinResetWaktuL2P(MinSwitchIdL2P, MinTimerIdL2P);
            localStorage.setItem('TimeEndMinL2P', JSON.stringify(MinRemainingWakL2P));
        }
    }, 1000);
}
window.onload = MinTampilanWaktuL2P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi1L2P');
    document.getElementById('MinTextJam1L2P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi2L2P');
    document.getElementById('MinTextJam2L2P').innerText = 'No Time';
});