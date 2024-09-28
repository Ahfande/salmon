// function globalTimerCheck() {
//     const KamKondisi1L1A = JSON.parse(localStorage.getItem('KamisKondisi1L1A'));
//     const KamKondisi2L1A = JSON.parse(localStorage.getItem('KamisKondisi2L1A'));

//     const currentTime = new Date().toTimeString().slice(0, 5);
//     const currentDay = new Date().getDay();

//     if (KamKondisi1L1A && currentDay === KamKondisi1L1A.KdayL1A && currentTime === KamKondisi1L1A.time) {
//         KamCekWaktuL1A(KamKondisi1L1A, 'KamSwitch1L1A', 'KamTimer1L1A');
//     }

//     if (KamKondisi2L1A && currentDay === KamKondisi2L1A.KdayL1A && currentTime === KamKondisi2L1A.time) {
//         KamCekWaktuL1A(KamKondisi2L1A, 'KamSwitch2L1A', 'KamTimer2L1A');
//     }
//     console.log("BANG BISA BANG...")
// }

// // Interval pengecekan setiap detik untuk berjalan di semua halaman
// setInterval(globalTimerCheck, 1000);

function globalTimerCheck() {
    const SabKondisi1L1A = JSON.parse(localStorage.getItem('SabtuKondisi1L1A'));
    const SabKondisi2L1A = JSON.parse(localStorage.getItem('SabtuKondisi2L1A'));

    const currentTime = new Date().toTimeString().slice(0, 5);
    const currentDay = new Date().getDay();

    let conditionMatched = false;

    if (SabKondisi1L1A) {
        console.log(`Checking Sabtu Kondisi 1, Waktu Set: ${SabKondisi1L1A.time}`);
    }
    if (SabKondisi2L1A) {
        console.log(`Checking Sabtu Kondisi 2, Waktu Set: ${SabKondisi2L1A.time}`);
    }

    if (SabKondisi1L1A && currentDay === SabKondisi1L1A.SbdayL1A && currentTime === SabKondisi1L1A.time) {
        SabCekWaktuL1A(SabKondisi1L1A, 'SabSwitch1L1A', 'SabTimer1L1A');
        conditionMatched = true;
        console.log("BANG BISA BANG...");
    }
    
    if (SabKondisi2L1A && currentDay === SabKondisi2L1A.SbdayL1A && currentTime === SabKondisi2L1A.time) {
        SabCekWaktuL1A(SabKondisi2L1A, 'SabSwitch2L1A', 'SabTimer2L1A');
        conditionMatched = true;
        console.log("BANG BISA BANG 2...");
    }

    if (!conditionMatched) {
        console.log('Aduhhh Gabisa Bang...');
    }
}

// Interval pengecekan setiap detik untuk berjalan di semua halaman
setInterval(globalTimerCheck, 1000);

function updateTimerDisplay() {
    const SabKondisi1L1A = JSON.parse(localStorage.getItem('SabtuKondisi1L1A'));
    const currentTime = new Date();
    
    if (SabKondisi1L1A && SabKondisi1L1A.SabStartTimeL1A) {
        const startTime = new Date(SabKondisi1L1A.SabStartTimeL1A);
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        const remainingSeconds = SabKondisi1L1A.duration * 60 - elapsedSeconds;
        
        if (remainingSeconds > 0) {
            document.getElementById('SabTimer1L1A').innerText = `${Math.floor(remainingSeconds / 60)}:${remainingSeconds % 60}`;
        } else {
            document.getElementById('SabTimer1L1A').innerText = 'Timer selesai';
        }
    }
}

window.onload = function() {
    globalTimerCheck();
    updateTimerDisplay();
    setInterval(globalTimerCheck, 1000); // Memeriksa setiap menit
};


// function globalTimerCheck() {
//     const MinKondisi1L1A = JSON.parse(localStorage.getItem('MingguKondisi1L1A'));
//     const MinKondisi2L1A = JSON.parse(localStorage.getItem('MingguKondisi2L1A'));

//     const currentTime = new Date().toTimeString().slice(0, 5);
//     const currentDay = new Date().getDay();

//     let conditionMatched = false;

//     if (MinKondisi1L1A) {
//         console.log(`Checking Minggu Kondisi 1, Waktu Set: ${MinKondisi1L1A.time}`);
//     }
//     if (MinKondisi2L1A) {
//         console.log(`Checking Minggu Kondisi 2, Waktu Set: ${MinKondisi2L1A.time}`);
//     }

//     if (MinKondisi1L1A && currentDay === MinKondisi1L1A.MindayL1A && currentTime === MinKondisi1L1A.time) {
//         MinCekWaktuL1A(MinKondisi1L1A, 'MinSwitch1L1A', 'MinTimer1L1A');
//         conditionMatched = true;
//         console.log("BANG BISA BANG...");
//     }

//     if (MinKondisi2L1A && currentDay === MinKondisi2L1A.MindayL1A && currentTime === MinKondisi2L1A.time) {
//         MinCekWaktuL1A(MinKondisi2L1A, 'MinSwitch2L1A', 'MinTimer2L1A');
//         conditionMatched = true;
//     }

//     if (!conditionMatched) {
//         console.log('Aduhhh Gabisa Bang...');
//     }
// }

// // Interval pengecekan setiap detik untuk berjalan di semua halaman
// setInterval(globalTimerCheck, 1000);