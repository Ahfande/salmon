// NAVBAR
const Home = document.getElementById("iconHome");
const MenuIcon = document.getElementById("menu-icon");
const MenuSide = document.getElementById("menu-side");
const MenuBatal = document.getElementById("menu-batal");

MenuIcon.addEventListener("click", () => {
  MenuSide.style.display = "flex";
  MenuIcon.style.display = "none";
});

MenuBatal.addEventListener("click", () => {
  MenuSide.style.display = "none";
  MenuIcon.style.display = "flex";
});

Home.addEventListener("click", () => {
  window.location.href = "Home.html";
});

// SET TIMER
const switch1 = document.getElementById('switch1');
switch1.addEventListener('change', ()=>{
    localStorage.setItem('Switch1Checked', switch1.checked);
});

const RealTime = localStorage.getItem("InputTime1");
let TimerInterval1;

function notifSucces(){
    const notif = document.getElementById("notif");
    notif.style.display = "block";
    setTimeout(()=>{
        notif.style.display = "none";
    },2500);
};

document.getElementById("timeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const minute1 = parseInt(document.getElementById("minute1").value);
    const second1 = parseInt(document.getElementById("second1").value);
    const totalTime1 = minute1 * 60 + second1;
    localStorage.setItem("InputTime1", totalTime1);
    notifSucces();
});

// Timer Run
function TimerMulai(durasi) {  
    localStorage.setItem('timerStart', Date.now());
    localStorage.setItem('timerStatus1', 'running');
    TimerInterval1 = setInterval(updateWaktu, 1000);
};

// Timer 1 Stop
function TimerBerhenti() {
    clearInterval(TimerInterval1);
    localStorage.setItem('timerStatus1', 'stopped');
    document.getElementById('textTimer1').style.display = 'none';
    localStorage.setItem('Switch1Checked', 'false');

};
// --------------------//
function updateWaktu() {
    const start = parseInt(localStorage.getItem('timerStart'));
    const duration = parseInt(localStorage.getItem('InputTime1'));
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const remaining = duration - elapsed;

    if (remaining <= 0) {
        clearInterval(TimerInterval1);
        document.getElementById('textTimer1').style.display = 'none';
        localStorage.setItem('timerStatus1', 'stopped');
        const SavedSwitch1 = localStorage.getItem('Switch1Checked')== 'false';
        switch1.checked = SavedSwitch1;
        return;
    };
    let minute1 = parseInt(remaining / 60, 10);
    let second1 = parseInt(remaining % 60, 10);
    minute1 = minute1 < 10 ? "0" + minute1 : minute1;
    second1 = second1 < 10 ? "0" + second1 : second1;
    document.getElementById('textTimer1').style.display = 'block';
    document.getElementById('textTimer1').textContent = minute1 + ":" + second1;
};

function PeriksaTimer() {
    const status = localStorage.getItem('timerStatus1');
    
    if (status === 'running') {
      updateWaktu();
      document.getElementById('textTimer1').style.display = 'block';
      TimerInterval1 = setInterval(updateWaktu, 1000);
      const SavedSwitch1 = localStorage.getItem('Switch1Checked')== 'true';
      switch1.checked = SavedSwitch1;
    };
};

window.addEventListener('load', PeriksaTimer);

// Switch
switch1.addEventListener("change", () => {
    if (switch1.checked) {
      const realTime = parseInt(localStorage.getItem('timerRemaining'));
      TimerMulai(realTime);
    } else {
      TimerBerhenti();
    }
});