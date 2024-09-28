// Sensor
const WebSocket =  require('ws');
const wss = new WebSocket.Server({port: 8080})

wss.on('connection', ws => {
    console.log("Connected");

    setInterval(() =>{
        const NilaiSensor = Math.floor(Math.random() *50);
        ws.send(JSON.stringify({temperature: NilaiSensor}))
    }, 1000);
});