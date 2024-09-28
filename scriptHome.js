// //Sensor
// function NilaiSensor(){
//     fetch('http://192.168.4.104/suhu')
//     .then(response => response.text())
//     .then(data =>{
//         document.getElementById('temperature').innerText = `${data.temperature}`
//     })
//     .catch(error => console.log('Error bang', error));
// }
// setInterval(NilaiSensor, 1000);

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

// Tanggal
let tanggal = new Date().getDate();
document.getElementById("tanggal").textContent = tanggal;
// Hari
const namaHari = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum`at",
  "Sabtu",
];
let hari = new Date().getDay();
document.getElementById("day").textContent = namaHari[hari];

// Jam
function realTime() {
  const textJam = document.getElementById("textJam");
  const now = new Date();

  let jam = now.getHours();
  let menit = now.getMinutes();
  let detik = now.getSeconds();

  jam = jam < 10 ? "0" + jam : jam;
  menit = menit < 10 ? "0" + menit : menit;
  detik = detik < 10 ? "0" + detik : detik;

  const JamBerjalan = `${jam}:${menit}`;
  textJam.textContent = JamBerjalan;
}
setInterval(realTime, 1000);
realTime();

// Lateral
const TextLate1 = document.getElementById("TextLate1");
const TextLate2 = document.getElementById("TextLate2");
const TextLate3 = document.getElementById("TextLate3");
const TextLate4 = document.getElementById("TextLate4");

const textInput1 = document.getElementById("textInput1");
const textInput2 = document.getElementById("textInput2");
const textInput3 = document.getElementById("textInput3");
const textInput4 = document.getElementById("textInput4");

const textVar1 = document.getElementById("textVar1");
const textVar2 = document.getElementById("textVar2");
const textVar3 = document.getElementById("textVar3");
const textVar4 = document.getElementById("textVar4");

const PopUp = document.getElementById("PopUp");
const PopUp2 = document.getElementById("PopUp2");
const PopUp3 = document.getElementById("PopUp3");
const PopUp4 = document.getElementById("PopUp4");

const back = document.getElementById("back");
const back2 = document.getElementById("back2");
const back3 = document.getElementById("back3");
const back4 = document.getElementById("back4");

function showPopUp() {
  PopUp.style.display = "block";
  setTimeout(() => {
    PopUp.classList.add("show");
  }, 50);
}
function showPopUp2() {
  PopUp2.style.display = "block";
  setTimeout(() => {
    PopUp2.classList.add("show");
  }, 50);
}
function showPopUp3() {
  PopUp3.style.display = "block";
  setTimeout(() => {
    PopUp3.classList.add("show");
  }, 50);
}
function showPopUp4() {
  PopUp4.style.display = "block";
  setTimeout(() => {
    PopUp4.classList.add("show");
  }, 50);
}

// PopUp
// LATERAL 1
document.getElementById("PenyiramanL1").addEventListener("click", () => {
  window.location.href = "JadwalL1A.html";
});
document.getElementById("PemupukanL1").addEventListener("click", () => {
  window.location.href = "JadwalL1P.html";
});

// LATERAL 2
document.getElementById("PenyiramanL2").addEventListener("click", () => {
  window.location.href = "JadwalL2A.html";
});
document.getElementById("PemupukanL2").addEventListener("click", () => {
  window.location.href = "JadwalL2P.html";
});

// LATERAL 3
document.getElementById("PenyiramanL3").addEventListener("click", () => {
  window.location.href = "JadwalL3A.html";
});
document.getElementById("PemupukanL3").addEventListener("click", () => {
  window.location.href = "JadwalL3P.html";
});

// LATERAL 4
document.getElementById("PenyiramanL4").addEventListener("click", () => {
  window.location.href = "JadwalL4A.html";
});
document.getElementById("PemupukanL4").addEventListener("click", () => {
  window.location.href = "JadwalL4P.html";
});

// close
function closePopUp() {
  PopUp.classList.remove("show");
  setTimeout(() => {
    PopUp.style.display = "none";
  }, 300);
}

function closePopUp2() {
  PopUp2.classList.remove("show");
  setTimeout(() => {
    PopUp2.style.display = "none";
  }, 300);
}
function closePopUp3() {
  PopUp3.classList.remove("show");
  setTimeout(() => {
    PopUp3.style.display = "none";
  }, 300);
}
function closePopUp4() {
  PopUp4.classList.remove("show");
  setTimeout(() => {
    PopUp4.style.display = "none";
  }, 300);
}

TextLate1.addEventListener("click", () => {
  showPopUp();
});
TextLate2.addEventListener("click", () => {
  showPopUp2();
});
TextLate3.addEventListener("click", () => {
  showPopUp3();
});
TextLate4.addEventListener("click", () => {
  showPopUp4();
});

back.addEventListener("click", () => {
  closePopUp();
});
back2.addEventListener("click", () => {
  closePopUp2();
});
back3.addEventListener("click", () => {
  closePopUp3();
});
back4.addEventListener("click", () => {
  closePopUp4();
});

// VAR 1
textVar1.addEventListener("click", () => {
  document.getElementById("VarInput1").style.display = "block";
});
document.getElementById("check1").addEventListener("click", () => {
  const var1 = document.getElementById("textInput1").value;
  localStorage.setItem("textVar1", var1);
  textVar1.textContent = var1;
  document.getElementById("VarInput1").style.display = "none";
});
document.getElementById("cancel1").addEventListener("click", () => {
  document.getElementById("VarInput1").style.display = "none";
});

function updateVar1() {
  const SaveVar1 = localStorage.getItem("textVar1");
  if (SaveVar1) {
    textVar1.textContent = SaveVar1;
  }
}
window.addEventListener("load", updateVar1);

// VAR 2
textVar2.addEventListener("click", () => {
  document.getElementById("VarInput2").style.display = "block";
});
document.getElementById("check2").addEventListener("click", () => {
  const var2 = document.getElementById("textInput2").value;
  localStorage.setItem("textVar2", var2);
  textVar2.textContent = var2;
  document.getElementById("VarInput2").style.display = "none";
});
document.getElementById("cancel2").addEventListener("click", () => {
  document.getElementById("VarInput2").style.display = "none";
});

function updateVar2() {
  const SaveVar2 = localStorage.getItem("textVar2");
  if (SaveVar2) {
    textVar2.textContent = SaveVar2;
  }
}
window.addEventListener("load", updateVar2);

// VAR 3
textVar3.addEventListener("click", () => {
  document.getElementById("VarInput3").style.display = "block";
});
document.getElementById("check3").addEventListener("click", () => {
  const var3 = document.getElementById("textInput3").value;
  localStorage.setItem("textVar3", var3);
  textVar3.textContent = var3;
  document.getElementById("VarInput3").style.display = "none";
});
document.getElementById("cancel3").addEventListener("click", () => {
  document.getElementById("VarInput3").style.display = "none";
});

function updateVar3() {
  const SaveVar3 = localStorage.getItem("textVar3");
  if (SaveVar3) {
    textVar3.textContent = SaveVar3;
  }
}
window.addEventListener("load", updateVar3);

// VAR 4
textVar4.addEventListener("click", () => {
  document.getElementById("VarInput4").style.display = "block";
});
document.getElementById("check4").addEventListener("click", () => {
  const var4 = document.getElementById("textInput4").value;
  localStorage.setItem("textVar4", var4);
  textVar4.textContent = var4;
  document.getElementById("VarInput4").style.display = "none";
});
document.getElementById("cancel4").addEventListener("click", () => {
  document.getElementById("VarInput4").style.display = "none";
});
function updateVar4() {
  const SaveVar4 = localStorage.getItem("textVar4");
  if (SaveVar4) {
    textVar4.textContent = SaveVar4;
  }
}
window.addEventListener("load", updateVar4);

// BUTTON AIR
const btnOff = document.getElementById("btnAirOff");
const btnOn = document.getElementById("btnAirOn");
const nyoba = document.getElementById("nyoba");

function StatusAir(nyala) {
  localStorage.setItem("StatusAir", nyala ? "on" : "off");
  TampilanStatus();
}

function TampilanStatus() {
  const status = localStorage.getItem("StatusAir");
}

btnOn.addEventListener("click", () => {
  StatusAir(true);
});
btnOff.addEventListener("click", () => {
  StatusAir(false);
});
window.onload = TampilanStatus;
