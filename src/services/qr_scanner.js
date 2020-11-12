import Utils from './utils.js';
import { qrcode } from './../third_party/qr_code.js';

export let QRScanner = {};
QRScanner.width = 400;
QRScanner.height = 400;
QRScanner.videoElement = null;
QRScanner.context = null;
QRScanner.resultFunctin = null;

// Serve via HTTPS
QRScanner.openScanner = function (context, width, height, func) {
    if (!("mediaDevices" in navigator) || !("getUserMedia" in navigator.mediaDevices)) {
        alert('Sorry your browser does not supporting scanning');
        return;
    }
    
    QRScanner.width = width;
    QRScanner.height = height;
    QRScanner.context = context;
    QRScanner.resultFunctin = func;

    if (!QRScanner.videoElement) {
        console.log('video element null');
        QRScanner.videoElement = document.createElement('video');
    }

    navigator.mediaDevices.getUserMedia(getConstraints()).then(stream => {
        QRScanner.videoElement.srcObject = stream;
        QRScanner.videoElement.play();

        QRScanner.videoElement.addEventListener('play', function () {
            console.log('playing');
            scanImage();
        });
    }, false)
        .catch(err => {
            console.log(`Error getting userMedia, error = ${err}`);
            alert(`Error getting userMedia, error = ${err}`);
        });
}

QRScanner.pauseScanner = function() {
    if(QRScanner.videoElement) QRScanner.videoElement.pause();
}


function scanImage() {
    if (!QRScanner.videoElement.paused && !QRScanner.videoElement.ended) {
        QRScanner.context.drawImage(QRScanner.videoElement, 0, 0);
        qrcode.width = QRScanner.width
        qrcode.height = QRScanner.height
        qrcode.imagedata = QRScanner.context.getImageData(0, 0, QRScanner.width, QRScanner.height);

        try {
            var result = qrcode.process(QRScanner.context);
            QRScanner.resultFunctin(result);
        } catch (err) {
            QRScanner.resultFunctin('No QR-Code!');
            if (err !== "Couldn't find enough finder patterns")
                new Error(err);
        }
        setTimeout(scanImage, 1000 / 30);
    }
}

function getConstraints() {
    return {
        audio: false,
        video: {
            width: QRScanner.width,
            height: QRScanner.height,
            facingMode: "environment" 
        }
    };
}