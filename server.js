const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webrtc = require("wrtc");
var cors = require('cors')

let senderStream;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
  origin: 'https://event-hunter-fe.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.post("/consumer", async ({ body }, res) => {
    const peer = new webrtc.RTCPeerConnection({
           iceServers: [
                {
                    urls: "stun:hk-turn1.xirsys.com",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:80?transport=udp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:3478?transport=udp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:80?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:3478?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turns:hk-turn1.xirsys.com:443?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turns:hk-turn1.xirsys.com:5349?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
            ]
    });
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }

    res.json(payload);
});

app.post('/broadcast', async ({ body }, res) => {
    console.log('36')
    const peer = new webrtc.RTCPeerConnection({
           iceServers: [
                {
                    urls: "stun:hk-turn1.xirsys.com",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:80?transport=udp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:3478?transport=udp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:80?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turn:hk-turn1.xirsys.com:3478?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turns:hk-turn1.xirsys.com:443?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
                {
                    urls: "turns:hk-turn1.xirsys.com:5349?transport=tcp",
                    username: "BM2fqgwrCLH8xyCGQgg5mBVS0hHjRXL0g0hbQqxIE-cX9Nq4UsZSnD3PIwyd77z5AAAAAGIRFEVjYW9kdW5nNTY2",
                    credential: "27231c68-919d-11ec-b184-0242ac120004",
                },
            ]
    });
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }

    res.json(payload);
});

function handleTrackEvent(e, peer) {
    senderStream = e.streams[0];
};


app.listen(process.env.PORT || 5000, () => console.log('server started'));