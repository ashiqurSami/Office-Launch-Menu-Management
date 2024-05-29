const express=require('express');
const router=express.Router();
const {addMenu, getMenu, selectOption, getAllMenuSelections}=require('../controllers/menu_controller');
const authMiddleware=require('../middlewares/auth_middleware')


router.post('/add-menu',authMiddleware,addMenu)
router.get('/get-menu/:date',authMiddleware,getMenu)
router.post('/select',authMiddleware,selectOption)
router.get('/all',authMiddleware,getAllMenuSelections)

module.exports=router;