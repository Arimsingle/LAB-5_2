var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
app.use(express.static('./public'));
app.set('views', './views')
app.set('view engine', 'ejs')
app.post('/admin', urlencodedParser, (req, res) => {
    session = req.session
    session.email = req.body.email
    password = req.body.password
    if (session.email == '' && password == '240311' || password == '') {
        res.send(`<html>
        <head>
        <title>Admin</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        </head>
        <body>
        <h1 style="align:center;">
        Please Login Frist
        </h1>
        <a href="/" class="btn btn-primary">Login</a>
        </body>
        </html>`)
    }
    else {
        res.render('user', { email: req.session.email })
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
app.listen(8000);