import Utils from './../services/utils.js';

var additonalButtons = [];

let Navbar = {
    render: async (mobileNavbar) => {
        additonalButtons = [];
        let view = Utils.getDeviceType() ?
            `
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <a href="/#/">Kids</a>
            <a href="/#/scanner">Scanner</a>
            <a href="/#/tasks">Tasks</a>
        </nav>
        `
            :
        `
        <div class="navbar_mobile">
            <div class="navbar_mobile_left">
                ${setBackButton(mobileNavbar.back)}
            </div>
            <div class="navbar_mobile_title">
                ${mobileNavbar.title}
            </div>
            <div class="navbar_mobile_right">
                ${setButtons(mobileNavbar.buttons)}
            </div>
        </div>
        `
        return view
    },
    after_render: async () => {
        let backButton = document.getElementById('button_back');
        if (backButton) backButton.addEventListener('click', () => window.history.back());
        additonalButtons.forEach(button => {
            document.getElementById(button[1]).addEventListener('click', () => {
                button[0]();
            });
        });
    }

}

function setBackButton(bool) {
    return bool ? '<button id="button_back" class="button_navbar">back</button>' : '';
}

function setButtons(buttons) {
    if (buttons) {
        var buttonsReturn = '';
        for (const button of buttons) {
            buttonsReturn += `<button id="${button[1]}" class="button_navbar">${button[1]}</button>`
            additonalButtons.push(button);
        }
        return buttonsReturn;
    } else {
        return '';
    }
}

export default Navbar;