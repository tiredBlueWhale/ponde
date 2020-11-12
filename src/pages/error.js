let Error = {
    before_render: async () => {
        
    },
    render : async () => {
        let view =  
        `
        <section class="section">
            <h1> 404 Error </h1>
            <p> Something went wront </p>
            <p> <a href="/#/">Kids</a> </p>
        </section>
        `
        return view
    },
    after_render: async () => {
    },
    after_close: async () => {
    },
    navbar: () => {
        return {
            back: false,
            title: 'Page not Found',
            buttons: null
        }
    }
}
export default Error;