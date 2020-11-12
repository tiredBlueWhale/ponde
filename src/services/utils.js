const Utils = {
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL: () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/");
        let request = {
            resource: r[r.length - 2] == "id" ? /.*id/g.exec(url)[0] : url,
            id: r[r.length - 2] == "id" ? r[r.length - 1] : null,
        }
        return request;
    },
    getDeviceType: () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return false;
        }
        if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return false;
        }
        return true;
    }
}

export default Utils;