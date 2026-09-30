import foodModel from "../../models/product/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(__dirname, "../../uploads");



// add to item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })

    try{
        await food.save();
        res.json({success:true, message:"Food Added"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

// all food list
const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove food item
const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        if (food && food.image) {
            fs.unlink(path.join(uploadDir, food.image), () => {});
        }
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addFood, listFood, removeFood};