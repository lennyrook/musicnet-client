/******************************************************************************/
// import area

import basic from './basic'

import { 
    zeroResults, 
    threeResults, 
    twentyResults 
} from './dummies'

/******************************************************************************/
// variables area

const searchUrl = 'search'

class Music {
    search(url, payload) {
        const term = payload.term
        const filter = payload.filter
        
        let promise = new Promise((resolve, reject) => {
            let query = `${url}/${searchUrl}`
            

            // NOTE: test purposes 
            if(term === 'Kaninchen')
                resolve(zeroResults)
            else if(term === 'pop')
                resolve(threeResults)
            else if(term === 'Linkin Park')
                resolve(twentyResults)
            else
                resolve([])

            // return basic.get(query)
            // .then(response => {
            //     resolve(response.body)
            // })
            // .catch(error => {
            //     if(error.code === 0)
            //         resolve(false)
            //     else
            //         reject(error)
            // })
        })

        return promise
    }
}

export default new Music()