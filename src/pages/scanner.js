import { QRScanner } from './../services/qr_scanner.js';

var activeButton = null;

let Scanner = {
    before_render: async () => {
        
    },
    render: async () => {
        let view =
        `
        <div id="qrResult">-</div>
        <canvas id="canvas"></canvas>
        <div id="button_container">
            <button id="0" class="button_scanner active">IN</button>
            <button id="2" class="button_scanner">ACTIVITY</button>
            <button id="1" class="button_scanner">OUT</button>
        </div>
        `
        return view
    },
    after_render: async () => {
        setupScanner();
        setupButton();
    },
    before_close: async () => {

    },
    after_close: async () => {
        QRScanner.pauseScanner();
    },
    navbar: () => {
        return {
            back: false,
            title: 'Scanner',
            buttons: null
        }
    }
}

function setupScanner() {
    let pageContainer = document.getElementById("page_container");
    let width = pageContainer.offsetWidth;
    let height = pageContainer.offsetHeight;
    let canvas = document.getElementById("canvas");

    canvas.style.width = width;
    canvas.style.height = height;
    canvas.width = width;
    canvas.height = height;

    QRScanner.openScanner(canvas.getContext('2d'), width, height, codeScanned);
}

function setupButton() {
    document.querySelectorAll('.button_scanner').forEach((item, i) => {
        if (i === 0) activeButton = item;
        item.addEventListener('click', function () {
            activeButton.className = "button_scanner"
            this.className += " active";
            activeButton = this;
        })
    })
}

function codeScanned(value) {
    if (value.length <= 4) {
        document.getElementById('qrResult').innerText = value;
        let status = activeButton.id;
    } else {
        document.getElementById('qrResult').innerText = value;
    }

}

export default Scanner;