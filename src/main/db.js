
const sqlite3 = require('better-sqlite3')

let db = null

function initDB(){
    db = sqlite3('foo.db', {verbose: console.log})
    db.exec(`
        CREATE table if not exists cards(
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            a text not null,
            created_at TIMESTAMP DEFAULT (strftime('%s', 'now')) NOT NULL,
            updated_at TIMESTAMP DEFAULT (strftime('%s', 'now')) NOT NULL 
        );
        
    `)
}

function foo(){
    const result = db.prepare('select * from cards order by created_at limit 10').all()
    if(result.length == 0){
        db.prepare('INSERT INTO cards(a) values(?)').run('hello');
        return foo()
    }
    return result
}

module.exports = {
    foo,
    initDB,
}