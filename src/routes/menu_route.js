const express=require('express');
const router=express.Router();
const {addMenu, getMenu, getAllMenuSelections, addOrUpdateSelection}=require('../controllers/menu_controller');
const authMiddleware=require('../middlewares/auth_middleware')


router.post('/add-menu',authMiddleware,addMenu)
router.get('/get-menu/:date',authMiddleware,getMenu)
router.post('/select',authMiddleware,addOrUpdateSelection)
router.get('/all',authMiddleware,getAllMenuSelections)

module.exports=router;