
let Tasks = {
    before_render: async () => {
       
    },
    render: async () => {
        // let posts = await getPostsList()
        let view = 
        `
        <section class="section">
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
            back: null,
            title: 'Tasks',
            buttons: null
        }
    }
}

export default Tasks;