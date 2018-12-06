// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send('Hello Cs2300!!!!!!'));


// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const  sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:',(err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log('YEAH!!!!!!!!!!');
});

db.run('CREATE TABLE langs(name text)'); 
db.close();
