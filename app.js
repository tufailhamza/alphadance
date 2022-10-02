const express = require('express');
const path = require('path');
const port =8000 ;
const app = express();
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hamza',{useNewUrlParser:true});


const contactschema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  desc: String
});

var Contact = mongoose.model('Contact', contactschema);

app.use("/static", express.static('static'));
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'));

app.get('/', (req, res) => {
    res.status(200).render('home.pug')
  })
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
  })
app.post('/contact',(req,res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.status(200).render('home.pug')
  }).catch(()=>
  {
    res.status(400).send("item not saved")
  })
})
  
app.listen(port,()=>
{
 console.log(`port stated at ${port}`);
})