import Utils from './utils.js';
import { qrcode } from './../third_party/qr_code.js';

export let QRScanner = {};
// QRScanner.canvasWidth = 400;
// QRScanner.canvasHeight = 400;
// QRScanner.canvasX_Offset = 0;
// QRScanner.canvasY_Offset = 0;
// QRScanner.videoElement = null;
// QRScanner.videoElementWidth = null;
// QRScanner.videoElementHeight = null;
// QRScanner.canvas = null;

// QRScanner.resultFunction = null;

var resultFunction;
var videoElement;
var width;
var height;

var canvas;
var ctx;

// Serve via HTTPS
QRScanner.openScanner = function (_resultFunction) {
    if (!("mediaDevices" in navigator) || !("getUserMedia" in navigator.mediaDevices)) {
        alert('Sorry your browser does not supporting scanning');
        return;
    }

    resultFunction = _resultFunction;
    videoElement = document.getElementById('scanner');

    navigator.mediaDevices.getUserMedia(getConstraints()).then(stream => {
        videoElement.srcObject = stream;
        videoElement.play();

        if (!document.getElementById('qr_code_canvas')) {
            console.log('Canvas does not exist');
            width = stream.getTracks()[0].getSettings().width;
            height = stream.getTracks()[0].getSettings().height;

            resultFunction(`Resolution: ${width} x ${height}`);

            canvas          = document.createElement('canvas');
            canvas.id       = 'qr_code_canvas';
            canvas.width    = width;
            canvas.height   = height
            ctx = canvas.getContext("2d");
        }
       
        videoElement.addEventListener('play', function () {
            console.log('playing');
            scanImage();
        });
    }, false)
        .catch(err => {
            console.log(`Error getting userMedia, error = ${err}`);
            alert(`Error getting userMedia, error = ${err}`);
        });
}

QRScanner.pauseScanner = function () {
    if (videoElement) videoElement.pause();
}

QRScanner.startScanner = function (_resultFunction) {
    QRScanner.openScanner(_resultFunction);
}


function scanImage() {
    if (!videoElement.paused && !videoElement.ended) {

        ctx.drawImage(videoElement, 0, 0);
        qrcode.width = canvas.width 
        qrcode.height = canvas.height 
        qrcode.imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        try {
            var result = qrcode.process(QRScanner.canvas);
            resultFunction(result);
        } catch (err) {
            // resultFunction('No QR-Code!');
            // console.log(err);
            if (err !== "Couldn't find enough finder patterns")
                new Error(err);
        }

        setTimeout(scanImage, 1000 / 60);
    }
}

function getConstraints() {
    let videoResolution = Utils.getDeviceType() ?
        {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 }
        } :
        {
            width: { min: 1024, ideal: 720, max: 1080 },
            height: { min: 576, ideal: 1280, max: 1920 }
        };
    return {
        audio: false,
        video: videoResolution,
        facingMode: "environment",
    };
}