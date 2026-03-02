
const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

router.get("/categories", async (req, res,next) => {
  try {
    const data = await fs.readFile("categories.json", "utf-8");
    const categories = JSON.parse(data);
    res.send(categories);
  } catch (error) {
next(error) 
 }
});

router.get(`/categories/:id`, async (req, res,next) => {
  try {
    const id = Number(req.params.id);
    const data = await fs.readFile("categories.json", "utf-8");
    const categories = JSON.parse(data);
    const category = categories.find((c) => c.id === id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.send(category);
  } catch (error) {
next(error)  
}
});

router.post("/categories", async (req, res,next) => {
  const data = req.body;
  try {
    const readData = await fs.readFile("categories.json", "utf-8");
    const parsedData = JSON.parse(readData);
    parsedData.push(data);
    const newData = parsedData;
    await fs.writeFile(
      "categories.json",
      JSON.stringify(newData, null, 2),
      "utf-8"
    );
    res.json({ success: "Added new category." });
  } catch (error) {
next(error)  
}
});
router.put("/categories/:id",async(req,res,next)=>{
  try {
    const id = Number(req.params.id)
    const data = req.body
    const readData = await fs.readFile("categories.json","utf-8")
    const categoryData = JSON.parse(readData)
    const category = categoryData.find(c => c.id === id)
    if(!category){
      return res.status(404).json({error: "Can not found category."})
    }
    Object.assign(category,{...data,id:category.id})
    await fs.writeFile("categories.json",JSON.stringify(categoryData,null,2),"utf-8")
    res.status(200).json({success:"Updated category."})
  } catch (error) {
next(error)  
}
})
router.delete("/categories/:id",async(req,res,next)=>{
  try {
    const id  = Number(req.params.id)
    const readData = await fs.readFile("categories.json","utf-8")
    const data = JSON.parse(readData)
    const index = data.findIndex(i => i.id === id)
    if(index === -1){
      return res.status(404).json({error:"Id not found."})
    }
    data.slice(index,1)
    await fs.writeFile("categories.json",JSON.stringify(data,null,2))
    res.status(200).json({success:"Deleted category."})
  } catch (error) {
next(error) 
 }
})
module.exports = router;
