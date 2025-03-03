import express from "express"
import userModel from "../../models/Users.js"
const router=express.Router()


router.get("/getall",async(req,res)=>{
    try {
        let getall=await userModel.find({})
        console.log(getall);
        res.status(200).json(getall)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.get("/getbyid/:id",async (req,res)=>{
    try {
        let userID=req.params.id
        let getData=await userModel.findOne({_id:userID})
        res.status(200).json(getData)

    } catch (error) {
        console.log(error)
        res.status(500).json({error})        
    }
})


router.put("/updateuser/:id",async(req,res)=>{
    try {
        let userInput=req.params.id
        let userdata=req.body
        await userModel.updateOne  ({_id:userInput}, {$set:userdata})
        res.status(200).json({msg:"updated data"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.delete("/deleteone/:id",async(req,res)=>{
    try {
        let userid=req.params.id
        await userModel.deleteOne({_id:userid})
        res.status(200).json({msg:"user deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


router.delete("/deleteall",async(req,res)=>{
    try {
        await userModel.deleteMany({})
        console.log("deleted");
        res.status(200).json({msg:"deleted data"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


export default router