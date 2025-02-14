const path = require('path');
const express = require('express');
const multer = require('multer')

const app = express();
app.set('view engine', 'ejs');      //view engine set to ejs
app.set('views', path.resolve('./views'));  //and its location is ./

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './uploads');
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage});  // jo bhi file upload hogi usse upload folder me daal do

app.use(express.json());
app.use(express.urlencoded({extended: false}));  //it help to pass form data

app.get('/', (req, res) => {
    return res.render("homepage");
})

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/')
})

app.listen(3000);