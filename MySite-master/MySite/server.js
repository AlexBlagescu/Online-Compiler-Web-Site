const express = require('express');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://User:UserPassword@mywebsitedb-aesgf.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const session = require('express-session');
const sessionExpire = 1000 * 7200;
const app = express();    

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    resave: false,
    secret: "kappa",
    saveUninitialized: false,
    name: "SID",
    cookie: {
        maxAge: sessionExpire, 
        sameSite: true,
        secure: false
    }
}));

app.get('/', (req, res) => {
    const { userId } = req.session;
    console.log(req.session.userId);
    if (req.session.userId == undefined) {
        res.render('index'); 
    }
    else {
        rendMessage2 = "SuccesLOGIN!";
        res.render('index', {
            message1:"sadasdas",
            message2: rendMessage2, 
            name: emailPassCheck[0].Name, 
            userId: req.session.userId
        });
    }
})

app.get('/index.html', (req, res) => {
    const {userId} = req.session;
    res.render('index');
})

app.post('/register', async(req,res) => {
    const {email, name, password} = req.body;
    const database = client.db("sitedb");
    emailCheck = await database.collection("details").find({Email: email}).toArray();
    allUsers = await database.collection("details").find({}).toArray();
    let newUserId;
    if (allUsers.length == 0) {
        newUserId = 0;
    } else {
        newUserId = allUsers[allUsers.length - 1].id + 1;
    }

    let rendMessage1 = '';
    if (emailCheck.length == 0) {
        await database.collection("details").insertOne({
            Name: name,
            Email: email,
            Password: password,
            id: newUserId
        });
        rendMessage1 = 'Succes!';
    } else {
        //PRINT ERROR MESSAGE
        rendMessage1 = 'Erorr!';
    }
    res.render('index', {
        message1: rendMessage1
    });
})

app.post('/signin', async(req, res) => {
    const {emailLogin, passwordLogin} = req.body;
    const database = client.db("sitedb");
    emailPassCheck = await database.collection("details").find({Email: emailLogin, Password: passwordLogin}).toArray();
    if (emailPassCheck.length == 1) {
        let rendMessage2 = "SuccesLOGIN!";
        req.session.userId = emailPassCheck[0].id;
        req.session.save();
        res.render('index', {
            message1:"sadasdas",
            message2: rendMessage2, 
            name: emailPassCheck[0].Name,
            userId: req.session.userId
        });
    } else {
        let rendMessage2 = "ErrorLOGIN!";
        res.render('index', {
            message1:"sadasdas",
            message2: rendMessage2
        });
    }
});

app.post('/accSucces', (req, res) => {
    res.redirect('/');
});
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');

})

app.get("*", (req, res) => { 
    res.render('error');
})

app.listen(3000, () => {
    console.log("SERVER CONENCTED!");
    client.connect(async(err, client) => {
        console.log("DATABASE CONENCTED");
    });
});
