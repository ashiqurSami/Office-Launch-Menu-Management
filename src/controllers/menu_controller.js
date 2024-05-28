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

exports.getMenu=async(req,res)=>{
    try{
        const date=req.params
        const newDate=new Date(date.date)
        const menu=await Menu.findOne({date:newDate})
        res.status(201).json({menu,message:"Menu added successfully"})
    }catch(err){
        res.status(500).json({message:err.toString()})
    }
}   

