/******************************************************************************/
// import area

import xhr from 'xhr'


/******************************************************************************/
// variables area

let xhrOptions = {
    json: true,
    timeout: 2000
}

class Api {
    constructor(endpoint='') {
        this.className = this.constructor.name
        this.endpoint = endpoint
    }

    get(url) {
        let promise = new Promise((resolve, reject) => {

            xhr.get(url, xhrOptions, (error, response, body) => {
                
                if(error)
                    reject({error: error, code: response.statusCode})
                else if (response.statusCode >= 400)
                    reject(response)
                else
                    resolve(response)
            })

            
        })

        return promise
    }
}

export default new Api()