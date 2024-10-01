import sqlite3 from "sqlite3"

sqlite3.verbose() // avoir un detail des erreurs

export const db = new sqlite3.Database('./src/utils/LoginChicks.sqlite')

export const initDB = () => {
    const sqlContent = `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
        )
    ` // query lancée au demarrage

db.exec(sqlContent, (err) => {
    if (err){
        console.info(`Failed to load sql query: ${err}`)
    } else {
        console.info("SQL content loaded")
    }
})

}