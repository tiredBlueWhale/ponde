import Utils from './utils.js';
import { qrcode } from './../third_party/qr_code.js';

export let QRScanner = {};
QRScanner.canvasWidth = 400;
QRScanner.canvasHeight = 400;
QRScanner.canvasX_Offset = 0;
QRScanner.canvasY_Offset = 0;
QRScanner.videoElement = null;
QRScanner.videoElementWidth = null;
QRScanner.videoElementHeight = null;
QRScanner.canvas = null;
QRScanner.resultFunction = null;

// Serve via HTTPS
QRScanner.openScanner = function (canvas, canvasWidth, canvasHeight, func) {
    if (!("mediaDevices" in navigator) || !("getUserMedia" in navigator.mediaDevices)) {
        alert('Sorry your browser does not supporting scanning');
        return;
    }

    QRScanner.canvasWidth = canvasWidth;
    QRScanner.canvasHeight = canvasHeight;
    QRScanner.canvas = canvas;
    QRScanner.resultFunction = func;

    if (!QRScanner.videoElement) {
        console.log('video element null');

        QRScanner.videoElement = document.createElement('video');
        QRScanner.videoElement.id = 'video';
        QRScanner.videoElement.muted = true;
        QRScanner.videoElement.playsInline = true;

        // let pageContainer = document.getElementById('page_container');
        // pageContainer.appendChild(QRScanner.videoElement);

    }

    navigator.mediaDevices.getUserMedia(getConstraints()).then(stream => {
        QRScanner.videoElement.srcObject = stream;
        QRScanner.videoElement.play();

        QRScanner.videoElementWidth = stream.getTracks()[0].getSettings().width;
        QRScanner.videoElementHeight = stream.getTracks()[0].getSettings().height;
        QRScanner.canvasX_Offset = (QRScanner.canvasWidth - QRScanner.videoElementWidth) / 2;
        QRScanner.canvasY_Offset = (QRScanner.canvasHeight - QRScanner.videoElementHeight) / 2;

        console.log(QRScanner.videoElementWidth, QRScanner.videoElementHeight);

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

QRScanner.pauseScanner = function () {
    if (QRScanner.videoElement) QRScanner.videoElement.pause();
}


function scanImage() {
    if (!QRScanner.videoElement.paused && !QRScanner.videoElement.ended) {

        QRScanner.canvas.drawImage(QRScanner.videoElement, QRScanner.canvasX_Offset, QRScanner.canvasY_Offset);

        // QRScanner.canvas.drawImage(QRScanner.videoElement, 0, 0);
        qrcode.canvasWidth = QRScanner.canvasWidth < QRScanner.videoElementWidth ? QRScanner.canvasWidth : QRScanner.videoElementWidth;
        qrcode.canvasHeight = QRScanner.canvasHeight < QRScanner.videoElementHeight ? QRScanner.canvasHeight : QRScanner.videoElementHeight;
        qrcode.imagedata = QRScanner.canvas.getImageData(
            QRScanner.canvasX_Offset,
            QRScanner.canvasY_Offset,
            // 0, 0,
            qrcode.canvasWidth,
            qrcode.canvasHeight
        );

        // testImageData();

        // console.log(qrcode.canvasWidth, qrcode.canvasHeight);
        // console.log(qrcode.imagedata);
        try {
            var result = qrcode.process(QRScanner.canvas);
            QRScanner.resultFunction(result);
        } catch (err) {
            QRScanner.resultFunction('No QR-Code!');
            // console.log(err);
            if (err !== "Couldn't find enough finder patterns")
                new Error(err);
        }

        setTimeout(scanImage, 1000 / 60);
    }
}

function getConstraints() {
    return {
        audio: false,
        video: {
            canvasWidth: { min: 400, ideal: 1280, max: 1920 },
            canvasHeight: { min: 400, ideal: 720, max: 1080 },
            // canvasWidth: QRScanner.canvasWidth,
            // canvasHeight: QRScanner.canvasHeight,
            facingMode: "environment"
        }
    };
}

var test = false;
var tempCanvas;

function testImageData() {
    qrcode.imagedata

    var data = qrcode.imagedata.data;

    // for (var i = 0; i < data.length; i += 4) {
    //     if (data[i] > 250) {
    //         data[i] = 0;
    //         data[i + 1] = 255;
    //     }
    // }

    if (test) {
        document.getElementById('page_container').removeChild(tempCanvas);
    }

    tempCanvas = document.createElement("canvas");
    tempCanvas.id = 'temp';

    document.getElementById('page_container').appendChild(tempCanvas);
    test = true;

    var tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width =  qrcode.canvasWidth,
    tempCanvas.height =  qrcode.canvasWidth,

    tempCtx.putImageData(qrcode.imagedata, 0, 0);



    var img = new Image();
    img.onload = function () {
        tempCtx.drawImage(img, 0, 0);
    }
    img.src = tempCanvas.toDataURL();


    // QRScanner.canvas.clearRect(0, 0, QRScanner.canvasWidth, QRScanner.canvasHeight);



    // set the temp canvas size == the canvas size


    // put the modified pixels on the temp canvas


    // use the tempCanvas.toDataURL to create an img object

}