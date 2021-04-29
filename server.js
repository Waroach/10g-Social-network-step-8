
//Teamates Name/UserName/Location
// Brent / Waroach / San Francisco - but perminant Address is SLC Utah
// Nick / PandasPajamas / Concord,CA / 
// Sergio / toshi5o3 / Portland, OR
// Gaby / GabyC_0 / Los Banos, CA 
// Allison / Allison / Texas
// Benajeer / Benajeer /

// Who lives closest to the Loch Ness
// One of our Teamates ALLISON was able to name 10 fish.
// We decided we want 10 Gs in cash to appear each time we sneeze
// A person on our team had two kids exchange a tray back and forth to
// demonstrate how the internet works -- Allison had her daughter pass a tray to her son, then the son passed the tray back


const express = require('express') // 
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
// Step 5 - set up multer for storing uploaded files
const multer = require('multer');
// step 6
// var imgModel = require('./model');
const PORT = process.env.PORT || '3000'








require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

// step 7
app.get('./', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});


// Step 8 - the POST handler for processing the uploaded file
 
// app.post('/', upload.single('image'), (req, res, next) => {
 
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// part of STEP 5
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

// step 6
const imgModel = require('./models');



// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

  
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    