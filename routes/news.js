const LocalStrategy = require('passport-local').Strategy;
const express = require('express')
const axios = require('axios')
const newsr=express.Router()
const app=express()
const moment = require('moment')
const exp = require('constants')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('API_KEY');
const mysql = require('mysql')

const math = require('math')
const { Router, response } = require('express')
const path = require('path');


app.locals.moment = moment;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'overalls',
    database: 'usersDB'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});


module.exports = function(app, passport) {

    app.get('/category',async (req,res)=>{

        var token = req.headers['postman-token']
        var url = `https://newsapi.org/v2/everything?domains=techcrunch.com&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
        const news_get =await axios.get(url)

        if(req.user && token) {
            // res.send("You are logged in and in POSTMAN")
            res.json({articles:news_get.data.articles})
        }
        if(!req.user && token){

            res.sendStatus(401)

        }
        if(req.user && !token){
            // res.send("You are logged in and in BROWSER")
            res.render('category',{articles:news_get.data.articles})
    
        }
        if(!req.user && !token){
            // res.send("You are NOT logged in and in BROWSER")
            res.redirect('login');

        }

    })

    app.get('/category/sports',async(req,res)=>{
        var url = `http://newsapi.org/v2/everything?q=sports&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
        const news_get =await axios.get(url);

        var token = req.headers['postman-token']
        if(token){
            res.json({articles:news_get.data.articles})
        } else{

        try {
            
            res.status(200).render('category'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }}
    });
    app.get('/category/technology',async(req,res)=>{

        var url = `https://newsapi.org/v2/everything?domains=techcrunch.com&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
        const news_get =await axios.get(url)

        var token = req.headers['postman-token']
        if(token){
            res.json({articles:news_get.data.articles})
        } else{

        try {
            
            res.render('category'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }}
    });
    app.get('/category/entertainment',async(req,res)=>{

        var url = `http://newsapi.org/v2/everything?q=entertainment&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
        const news_get =await axios.get(url)

        var token = req.headers['postman-token']
        if(token){
            res.json({articles:news_get.data.articles})
        } else{
        try {
            
            res.render('category'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }}
    });
    app.get('/category/business',async(req,res)=>{

        var url = `http://newsapi.org/v2/everything?q=business&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
        const news_get =await axios.get(url)
        var token = req.headers['postman-token']
        if(token){
            res.json({articles:news_get.data.articles})
        } else{


        try {
            
            res.render('category'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }}
    });
    app.get('/category/science',async(req,res)=>{
        var url = 'http://newsapi.org/v2/everything?q=science&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08';
        const news_get =await axios.get(url)

        var token = req.headers['postman-token']
        if(token){
            res.json({articles:news_get.data.articles})
        } else{

        try {
            
            
            res.render('category'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }}
    });
    const zip = (a, b) => a.reduce((c, x, i) => c.concat(x, b[i]), []);

    const searchORFunction = (search) =>{
        
        var array = [];
        array.push([search.indexOf(" or "),search.indexOf(" or ")+4]);
        array.push([search.indexOf(" OR "),search.indexOf(" OR ")+4]);
        array.push([search.indexOf(" oR "),search.indexOf(" oR ")+4]);
        array.push([search.indexOf(" Or "),search.indexOf(" Or ")+4]);
        
        for(var i=0;i<array.length;i++){
            
            if(array[i][0]>=1){
                var firstWordRange = [0,array[i][0]];
                var secondWordRange = [array[i][1],search.length]
            } 
        }

        var results = [search.substring(firstWordRange[0],firstWordRange[1]),search.substring(secondWordRange[0],secondWordRange[1])];
        // console.log(results);
        return results;
        

    }
    app.post('/search',async(req,res)=>{
        const search=req.body.search

        if(search.indexOf(" or ")===-1){
            if(search.indexOf(" OR ")!==-1) {
                console.log(searchORFunction(search)[1]);
                
            } else if(search.indexOf(" Or ")!==-1){
                console.log(searchORFunction(search)[1]);
                
            } else if(search.indexOf(" oR ")!==-1){
                console.log(searchORFunction(search)[1]);
    
            }
            else{
                console.log(searchORFunction(search)[1]);
            }
        }
        else{
            console.log(searchORFunction(search)[1]);
            
        }

        var url = `http://newsapi.org/v2/everything?q=${searchORFunction(search)[0]}+AND+${searchORFunction(search)[1]}&sortBy=publishedAtey=c311a717afc94a8a8ee4c60a86822b08`

        const news_get =await axios.get(url);



        var token = req.headers['postman-token']
        if(token){
            res.json({articles:news_get.data.articles})
        } else{
    
        try {
            console.log(news_get.data.articles)
            res.render('myDashboard',{username:req.user,articles:news_get.data.articles,subjects:[]})
            
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }}
    })


    app.get('/', 
    async(req,res)=>{


        try {
            var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08';
    
            const news_get =await axios.get(url)
            // console.log(news_get.data.articles)
            
            res.render('news'
            ,{articles:news_get.data.articles}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    });

    


    app.get('/news/user', isLoggedIn, async (req, res) => {
        var newsArray = [];
        var username = req.user;
        console.log("Your username is "+req.user)
        // var username ="erica";
        var sports = false;
        var technology = false;
        var business = false;
        var science = false;
        var entertainment = false;
        var subjects=[];
        var url1 = '';


        // var username ="erica";
        connection.query('SELECT subject FROM mySubjects WHERE username=?',[username],function(error,results,fields){
            if(error){
                throw error;
            }
            if(results.length>0){
                results.forEach((result)=>{
                    subjects.push(result.subject);
                })
            } else{
                console.log("theres nothing here")
            }
            console.log("The subjects for the dashboard are "+ subjects);
            console.log(subjects.length);


            if(subjects.includes("sports")) {
                sports=true;
            }
            if(subjects.includes("technology")) {
                technology=true;
            }
            if(subjects.includes("entertainment")) {
                entertainment=true;
            }
            if(subjects.includes("science")) {
                science=true;
            }
            if(subjects.includes("business")) {
                business=true;
            }

            
            // res.render('settings',{username:req.user,message: "",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

        })

        try {
            var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08';
    
            const news_get =await axios.get(url)

            // console.log(news_get.data.articles)
            console.log(subjects)
            if(subjects.length==1){
                console.log("the subject length is 1")
                url1 = `http://newsapi.org/v2/everything?q=${subjects[0]}&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
                console.log(url1);
            }
            if(subjects.length==2){
                console.log("the subject length is 2")
                url1 = `http://newsapi.org/v2/everything?q=${subjects[0]}+AND+${subjects[1]}&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
                console.log(url1);

            }
            if(subjects.length==3){
                console.log("the subject length is 3");
                url1 = `http://newsapi.org/v2/everything?q=${subjects[0]}+AND+${subjects[1]}+AND+${subjects[2]}&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
                console.log(url1);

            }
            if(subjects.length==4){
                console.log("the subject length is 4")
                url1 = `http://newsapi.org/v2/everything?q=${subjects[0]}+AND+${subjects[1]}+AND+${subjects[2]}+AND+${subjects[3]}&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
                console.log(url1);

            }
            if(subjects.length==5){
                console.log("the subject length is 5")
                url1 = `http://newsapi.org/v2/everything?q=${subjects[0]}+AND+${subjects[1]}+AND+${subjects[2]}+AND+${subjects[3]}+AND+${subjects[4]}&sortBy=publishedAt&apiKey=c311a717afc94a8a8ee4c60a86822b08`;
                console.log(url1);


            }



            const news_get2 =await axios.get(url1)
            console.log(news_get2.data.articles)

            res.render('myDashboard'
            ,{username:req.user,articles:news_get2.data.articles,subjects:subjects}
            )
    
        } catch (error) {
            if(error.response){
                console.log(error)
            }
    
        }
    

        // res.render('myDashboard',{username:req.user});
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
        console.log(req.user);
    });

    app.get('/test',function(req,res){
        console.log("Here is the req "+req);
        console.log("Here is the req.user "+req.user);
        res.json(req.user);
    });

    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/news/user'
    }));

    passport.use(new LocalStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
        (req,username, password, done) => 

        {
            if(username && password) {

                connection.query('SELECT * FROM users WHERE username = ? AND password = ?',[username,password],function(error,results,fields){
                    if(error){throw error}
                    if(results.length>0){
                        console.log('you GOT LOGGED IN!')
                        return done(null, username);
                    } else{
                        console.log('INVALID USERNAME PASSWORD')
                        return done(null, false,{message:"You failed to log in."});
                    }


                })


                // return done(null, {username: username});
            } else {


                // return done(null, false);
            }
        }
        
        
    ));

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
 
        return done(null, user);
    }); 

    function isLoggedIn(req, res, done) {
        

            if(req.user){
                return done();
            }
            return res.redirect('/login');

        

        

        // if(req.isAuthenticated()) {
        //     return next();
        // } else {
        //     return res.redirect('/login');
        // }
    }






    app.get('/aboutUs',isLoggedIn,function(req,res) {
        //this needs to show the current SETTINGS FROM SQL -__- render the array in CHECKBOXES!!
        res.render('settings',{username:req.user,message: ""})
    })

    app.get('/signUp',function(request,response) {
        response.render('signUp')
    })

    function renderMySettingsPage(){
        var username ="erica";
        var sports = false;
        var technology = false;
        var business = false;
        var science = false;
        var entertainment = false;
        var subjects=[];


        var username ="erica";
        connection.query('SELECT subject FROM mySubjects WHERE username=?',[username],function(error,results,fields){
            if(error){
                throw error;
            }
            if(results.length>0){
                results.forEach((result)=>{
                    subjects.push(result.subject);
                })
            } else{
                console.log("theres nothing here")
            }
            console.log("The subjects are "+ subjects)
            if(subjects.includes("sports")) {
                sports=true;
            }
            if(subjects.includes("technology")) {
                technology=true;
            }
            if(subjects.includes("entertainment")) {
                entertainment=true;
            }
            if(subjects.includes("science")) {
                science=true;
            }
            if(subjects.includes("business")) {
                business=true;
            }
            res.render('settings',{username:req.user,message: "",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

        })

    }

    app.get('/mySettings',isLoggedIn,function(req,res){
        var username=req.user;
        var sports = false;
        var technology = false;
        var business = false;
        var science = false;
        var entertainment = false;
        var subjects=[];


        connection.query('SELECT subject FROM mySubjects WHERE username=?',[username],function(error,results,fields){
            if(error){
                throw error;
            }
            if(results.length>0){
                results.forEach((result)=>{
                    subjects.push(result.subject);
                })
            } else{
                console.log("theres nothing here")
            }
            console.log("The subjects are "+ subjects)
            if(subjects.includes("sports")) {
                sports=true;
            }
            if(subjects.includes("technology")) {
                technology=true;
            }
            if(subjects.includes("entertainment")) {
                entertainment=true;
            }
            if(subjects.includes("science")) {
                science=true;
            }
            if(subjects.includes("business")) {
                business=true;
            }
            res.render('settings',{username:req.user,message: "",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

        })


    })

    app.post('/mySettings',function(request,response){
           //replace with current session USERNAME
    var username = request.user;
    var sports = false;
    var technology = false;
    var business = false;
    var science = false;
    var entertainment = false;
    
    var subject = "";

    connection.query('DELETE FROM mySubjects WHERE username=?',[username],function(error,results,fields){
        if(error){
            throw error;
        }
        if(results>0){
            console.log("The deletion results are "+results);
        }

    })

    if(request.body.sports){
        var subject = "sports";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)   
            sports=true;      
        }) 

    }
    if(request.body.science){
        var subject = "science";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 

    }
    if(request.body.technology){
        var subject = "technology";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 
    }
    if(request.body.entertainment){
        var subject = "entertainment";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 
    }
    if(request.body.business){
        var subject = "business";
        connection.query('INSERT INTO mySubjects(username,subject) VALUES(?,?)',[username,subject],function(error,results,fields) {
            if (error) {
                console.log(error)
            }
            console.log(results)         
        }) 
    }

    //if the request has no settings
    if(!request.body.sports&&!request.body.science&&!request.body.technology&&!request.body.entertainment&&!request.body.business){
        response.render("settings",{username:request.user,message:"You have to select at least one...",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})

    } else{
        response.redirect('/news/user');
    }
    

    // response.render("settings",{username:request.user,message:"Settings were updated.",sports:sports,technology:technology,entertainment:entertainment,science:science,business:business})
    

})

    app.post('/signUp',function(request,response){
        let username = request.body.username;
        let password = request.body.password;
    
        if (username && password) {
    
            connection.query('SELECT * FROM users WHERE username = ?',username, function(error, results, fields) {
                if (error) {
                    throw error
                }
                if (results.length > 0) {
                    
                    response.status(401)
                    .send({message: "The username already exists!"})
                                    
                }
                else {
    
                    connection.query('INSERT INTO users(username,password) VALUES(?,?)',[username,password],function(error,results,fields) {
                        if (error) {
                            console.log(error)
                        }
    
                        request.session['username'] = username;
                        // console.log("your username is " + request.session['username'])
                        

                        response.status(200)
                        .send({message: "Successfully signed up! Your username is " + request.session['username']})
                        
                        //start a session
    
                        
                    })
                    
                }
                // response.end();
    
            });
    
        }         
        else {
            response.status(401)
            .send({message: "Please enter username and password!"})
                }
    

    })



}