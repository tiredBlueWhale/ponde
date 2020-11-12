import Utils from './../services/utils.js';

let Footer = {
    render: async () => {
        let view = Utils.getDeviceType() ?
        `
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                   footer
                </p>
            </div>
        </footer>
        `
        :
        `
        <nav class="mobile_footer">
            <a class="button_footer" href="/#/scanner">Scanner</a>
            <a class="button_footer" href="/#/">Kids</a>
            <a class="button_footer" href="/#/tasks">Tasks</a>
        </nav>
        `
        ;
        return view
    },
    after_render: async () => { }
}

export default Footer;