const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('users/signup.ejs'); // temporary
})

router.post('/signup', async (req, res) => {
    
    try{
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        await User.create(req.body);
        res.redirect('/user/login');
    }catch{
        res.send('there was an error')
    }
}) 

// genSalt(10): string that is 10 characters in length and randomly generated to be used as encryption for the password
// req.body = {username: 'David', password: 'Yim'} -> req.body = {username: 'David', password: '2jdsfijklsdf2034}


router.get('/login', (req, res) => {
    res.render('users/login.ejs') // temporary
})

router.post('/login', async (req, res) => {
    // the same as line 27 -> const{username} = req.body; const username = req.body.username;
   const user = await User.findOne({username: req.body.username});
   
    // if username entered does not exist in the DB:
   if(!user){
    res.send('user does not exist')
   }else{
    const passmatches = bcrypt.compareSync(req.body.password, user.password);
    if(passmatches){
        req.session.username = req.body.username;
        req.session.loggedIn = true;
        res.redirect('/fruits');
    } else {
    res.send('wrong password')
   } 
}})

// comparing the password typed into the form and the encyrpted password in the DB
// if they match, user will be redirected to the fruits main page 

// LOGOUT ROUTE
// destroy the session and have the user go back to the main page
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    })
})

module.exports = router