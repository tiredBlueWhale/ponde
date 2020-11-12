import Utils from './../services/utils.js'

let KidsDetail = {
    before_render: async () => {
       
    },
    render: async () => {

        let request = Utils.parseRequestURL()
        console.log(request);
        // let posts = await getPostsList()
        let view =  /*html*/`
           <h1>Kids Detail</h1>
           <h1> Post Id : ${request.id}</h1>
        `
        return view
    }
    ,after_render: async () => {
    },
    after_close: async () => { 
    },
    navbar: () => {
        return {
            back: true,
            title: 'Kids Detail',
            buttons: null,
        }
    }
}

export default KidsDetail;