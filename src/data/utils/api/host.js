/******************************************************************************/
// import area

import basic from './basic'


/******************************************************************************/
// variables area

const sessionUrl = 'sessionState'

class Host {
    checkSession(url) {
        let promise = new Promise((resolve, reject) => {
            let sessionQuery = `${url}/${sessionUrl}`
            
            return basic.get(sessionQuery)
            .then(response => {
                resolve(response.body)
            })
            .catch(error => {
                if(error.code === 0)
                    resolve(false)
                else
                    reject(error)
            })
        })

        return promise
    }
}

export default new Host()