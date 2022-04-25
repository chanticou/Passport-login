// import express from 'express'
// //voy a utilizar otro modulo de express llamado router que me permite importar rutas
// //nos sirve para crear multiples rutas y mantenerlas ne archivos separados
// //entonces yo ahora voy a decir router.get en evz de app.het
// const router = express.Router()


// router.get('/',(req,res)=>{
//     res.render('home')
// })

// router.get('/profile', (req,res)=>{
//     res.render('profile')
// })

// router.get('/signup', (req,res)=>{
//     res.render('signup')
// })

// router.post('/', (req,res)=>{
//     if(req.session.loginUser.emailSignup === req.body.emailHome & req.session.loginUser.passwordSignup === req.body.passwordHome ) return res.render('profile')
//     res.render('signup')

// })

// router.post('/signup', (req,res)=>{
    
//     if(req.body.emailSignup === undefined || req.body.emailSignup === '' || req.body.passwordSignup === undefined || req.body.passwordSignup === '')  return res.send('Datos incorrectos')
//     if(!req.session.loginUser){
//         req.session.loginUser= req.body
//          return res.redirect ('profile')
//     }else{
//         return res.redirect('/')
//     }


// })


// export default router;