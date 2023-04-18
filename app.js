const express = require("express");
const path = require("path");
const mongoose=require('mongoose');
const bodyParser=require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactcricket',{useNewUrlParser:true});
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
const app=express();
const port=8000;

//define mongoose schema
var contactSchema=new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded())

// PUG specific stuff
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const ritik = {  };
   res.status(200).render('home.pug', ritik);

})

app.get('/contact', (req, res) => {
    const ritik = {  };
   res.status(200).render('contact.pug', ritik);

})

app.post('/contact', (req, res) => {
    console.log(req.body);
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the database')
        }).catch((err)=>{
            console.log(err);
        res.status(400).send('“item was not saved to the databse”')
    });
   //res.status(200).render('contact.pug');

})

//STart the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
 }); 