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

exports.selectOption=async(req,res)=>{
    const {date,option}=req.body
    try{
        const newDate=new Date(date)
        const menu=await Menu.findOne({date:newDate})
        if(!menu){
            return res.status(404).json({message:"Menu not found"})
        }
        menu.choices.push({userId:req.user,option})
        await menu.save()
        res.status(201).json({message:"Option selected successfully"})
    }catch(err){
        res.status(500).json({message:err.toString()})
    }
}
