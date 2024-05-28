const Menu= require('../models/Menu');

exports.addMenu=async(req,res)=>{
    const {date,options}=req.body 
    try{
        const menu=new Menu({date,options})
        await menu.save()
        res.status(201).json({message:"Menu added successfully"})
    }catch(err){
        res.status(500).json({message:err.toString()})
    }
}