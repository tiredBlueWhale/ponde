"use strict";

import Footer from './components/footer.js';
import Navbar from './components/navbar.js';

import Error from './pages/error.js';
import Scanner from './pages/scanner.js';
import Kids from './pages/kids.js';
import KidsDetail from './pages/kids-detail.js';
import Tasks from './pages/tasks.js';

import Utils from './services/utils.js'

const routes = {
    '/': Kids,
    '/kids/id': KidsDetail,
    '/scanner': Scanner,
    '/tasks': Tasks,
    // '/register'     : Register
};

// Lazy load view element:
const header = null || document.getElementById('header_container');
const content = null || document.getElementById('page_container');
const footer = null || document.getElementById('footer_container');

var activePage = null

// console.log(Utils.getDeviceType());

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    //Before Page change
    let request = Utils.parseRequestURL()
    if (activePage) await activePage.after_close();
    activePage = routes[request.resource] ? routes[request.resource] : Error;

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render(activePage.navbar());
    await Navbar.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    //After Page change
    await activePage.before_render();
    content.innerHTML = await activePage.render();
    await activePage.after_render();

}

export const update = async () => {
    content.innerHTML = await activePage.render();
    await activePage.after_render();
}


// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);

//PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }
