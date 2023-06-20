const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'room_booking'
});

app.get('/requests', (req,res) => {
    db.query('SELECT * FROM requests',
        (err,result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
})

app.delete('/delete/:id',(req,res) => {
    const id = req.params.id;

    db.query('DELETE FROM requests WHERE id=?', id,
        (err,result) => {
            if(err){
                console.log(err);
                res.status(500).send('There is an error deleting this request');
            }else{
                console.log(result);
                res.send(result)
            }
        }
    );
})

app.listen(3001, () => {
    console.log('listening... on the configured port...');
})