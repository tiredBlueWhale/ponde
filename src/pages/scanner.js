import { QRScanner } from './../services/qr_scanner.js';

var activeButton = null;

let Scanner = {
    before_render: async () => {
        
    },
    render: async () => {
        let view =
        `
        <button id="button_scan_start">Start Scanning</button>
        <video id="scanner" muted playsInline></video> 
        <!-- <video id="scanner"></video> -->
        <div id="qrResult">-</div>
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
        setupButtons();
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
    QRScanner.openScanner(codeScanned);
}

function setupButtons() {
    document.querySelectorAll('.button_scanner').forEach((item, i) => {
        if (i === 0) activeButton = item;
        item.addEventListener('click', function () {
            activeButton.className = "button_scanner"
            this.className += " active";
            activeButton = this;
        })
    })
    document.getElementById('button_scan_start').addEventListener('click', () => {
        QRScanner.openScanner(codeScanned);
    })
}

function codeScanned(value) {
   
    if (value.length <= 4) {
        console.log(value);
        document.getElementById('qrResult').innerText = value;
        let status = activeButton.id;
    } else {
        document.getElementById('qrResult').innerText = value;
    }

}

export default Scanner;