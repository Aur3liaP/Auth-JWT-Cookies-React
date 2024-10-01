import {db} from "../utils/db.js"

export const User = {

    create: (credentials) => {
        const query = "INSERT INTO users (username, password) VALUES (? , ?)"
        const params = [credentials.username, credentials.password]

        return new Promise((resolve, reject) => { // permet de le rendre asynchrone
            db.run(query, params, (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    },

    findUserByUsername : (username) => {
        const query = "SELECT * FROM users WHERE username = ?"
        const params = [username]

        return new Promise((resolve, reject) => {
            db.get(query, params ,(err, row) => {
                if (err) {
                    reject(err)
                } resolve(row)
            })
        })
    }
}