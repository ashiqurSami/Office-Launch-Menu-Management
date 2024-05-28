const express=require('express');
const router=express.Router();
const {addMenu}=require('../controllers/menu_controller');
const authMiddleware=require('../middlewares/auth_middleware')


router.post('/add-menu',authMiddleware,addMenu)




module.exports=router;