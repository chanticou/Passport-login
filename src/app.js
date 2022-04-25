import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import path from 'path'
import UserModel from './schema/mongoschema.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local"
import * as url from 'url';
import {
    Console
} from 'console'
const __filename = url.fileURLToPath(
    import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.',
    import.meta.url));
    


const app = express()


const PORT = process.env.PORT||8080
const server = app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))



app.use(express.urlencoded({extended:true}))
//STATIC FILES
app.use(express.static(path.join(__dirname+'/public')))
// app.use(express.static(__dirname+'/public'))


// Handlebars engine
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'handlebars')


//session & mongoose configuration
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://chantal:logaritmoC@cluster0.dpj6h.mongodb.net/studyGroups?retryWrites=true&w=majority',
        // ttl:10000
    }),
    
    secret:'gd45fs15s8',
    resave:false,
    saveUninitialized:false
},err=>{
    if(err) throw Error('Cant be connected')
    console.log('DB connected')
}))

//PASSPORT
//inicializo
app.use(passport.initialize())
//vinculo con la session a ´passport
//passport va a estar acticvo mientras mi sesion este abierta
app.use(passport.session())

//serializacion
passport.serializeUser((user,done)=>{
    return done(null, user.id)
})
//deserializacion
passport.deserializeUser((id,done)=>{
    UserModel.findById(id,(err, user)=>{
        return done(err,user)
    })
})

//etseategia de passport de registro
passport.use('registro', new LocalStrategy(
    {
        passReqToCallback:true
    },
    (req,emailSignup,passwordSignup,done)=>{
        UserModel.findOne({emailSignup:emailSignup}, (err,user)=>{
            if(err) return done(err)
            if(user) return done(null, false, {message:'user already exits'})
            const newUser ={
                email:emailSignup,
                password:passwordSignup
            }
            UserModel.create(newUser, (err,userCreated)=>{
                if(err) return done(err)
                return done(null, userCreated)
            })
        })
    }
))


app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/profile', (req,res)=>{
    res.render('profile')
})

app.get('/signup', (req,res)=>{
    res.render('signup')
})

app.post('/', (req,res)=>{
    // if(req.session.loginUser.emailSignup === req.body.emailHome & req.session.loginUser.passwordSignup === req.body.passwordHome ) return res.render('profile')
    // res.render('signup')

})

app.post('/signup',passport.authenticate('registro', {
    failureRedirect: '/signup'
}) ,async (req,res)=>{
    res.redirect('/profile')
    // const {emailSignup, passwordSignup} = req.body
    // const user = await UserModel.findOne({emailSignup})
    // console.log(user)
 
 
    // if(req.body.emailSignup === undefined || req.body.emailSignup === '' || req.body.passwordSignup === undefined || req.body.passwordSignup === '')  return res.send('Datos incorrectos')
    // if(!req.session.loginUser){
    //     req.session.loginUser= req.body
    //      return res.redirect ('profile')
    // }else{
    //     return res.redirect('/')
    // }


})


