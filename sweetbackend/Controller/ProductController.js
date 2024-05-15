const productdata=require("../Models/ProductModel");

exports.createProducts=async(req,res)=>{
    const NewProduct=req.body;
    if(NewProduct!=null){
        const oldProduct= await productdata.findOne({name:NewProduct.name})
        if(oldProduct){
            return res.status(400).send("Product already Exists")

        }
        await productdata.create(NewProduct)
            .then((data)=>{console.log("Data inside the creation"+data)
            res.status(201)
            .send("Product Created Successfully")})
            .catch((err)=>{
                res.status(400).send({error:err})
            })
    }
    else{
        res.status(400).send("Product not created")
    }
}
exports.getAllProducts=async(req,res)=>{
    try{
        const products=await productdata.find()
        res.json(products);

    }catch(err){
        res.status(500).json({message:err.message});
    }
};
exports.getProductById=async(req,res)=>{
    const productId=req.params.id
    
    try{
        const product=await productdata.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});

        }
        res.json(product);
    }catch(err){
        console.log("Error Fetching Product Details: ",err);
        res.status(500).json({message:"Internal server error"})
    }
}

        


exports.getProduct = async (req, res) => {
    
    const { q } = req.query;
    
    productdata.find({
        $or: [
            { category: { $regex: new RegExp(q, 'i') } },
            { name: { $regex: new RegExp(q, 'i') } }
        ]
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}