import { registerUser } from "../services/user-service.js";
import * as userService from "../services/user-service.js";


export const home = (req, res) => {
    res.send('<h1>URL Shorter</h1>');
};
export const login = async(req, res) => {
    try{
        const{ email,password} = req.body;
        const token = await userService.login(email,password);
        res.json({ token, email});
    } catch(err){
        res.status(400).json({message:err.message});
    }
};
export const register = async(req, res) => {
    const userInfo=req.body;
    try{
    const doc = await registerUser(userInfo);
    res.json({message:'Register sucsessfully',id:doc._id});
    }
    catch(err){
        res.json({error:'Something went wrong During Register',err:err})
        console.log('register fail',err);
    }
    // console.log(userInfo);
    // res.send('<h1>Register</h1>');
};