const mysql = require ('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log('Connection to database succeded.');
    else 
        console.log('Connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        
});

app.listen(3000, ()=>console.log('Express server is running at port no: 3000'));

//get all
app.get('/items',(_req,res)=>{
    mysqlconnection.query('SELECT * FROM items',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);    
    })
});

//get item
app.get('/items/:id' ,(req,res)=>{
    mysqlconnection.query('SELECT * FROM items WHERE id = ?', [req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete
app.delete('/items/:id', (req,res)=>{
    mysqlconnection.query('DELETE FROM items WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send('Entry deleted');
        else
        console.log(err);
    })
});

router.post('/create', function(req, res, next) {
    var name = req.body.name;
    var qty = req.body.qty;
    var amount = req.body.amount;
  
    var sql = `INSERT INTO items (name, qty, amount, active, created_at) VALUES ("${name}", "${qty}", "${amount}", 1, NOW())`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success', id: result.insertId})
    })
  });

//put method
router.put('/update/:id', function(req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var qty = req.body.qty;
    var amount = req.body.amount;
  
    var sql = `UPDATE products SET name="${name}", sku="${qty}", price="${amount}" WHERE id=${id}`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success'})
    })
  })