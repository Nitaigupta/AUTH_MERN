const express = require('express');
const router = express.Router();

const{signup,login} = require('../Controllers/Auth');
const{auth,isStudent,isAdmin}=require('../middleware/auth');

router.post('/login', login);
router.post('/signup', signup);

//test
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome To Test Route"
    });
});

//protected routes
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome Student"
    });
});

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome Admin"
    });
});
module.exports = router;