const cart=require("../Models/CartModel");

//create cart
exports.createCart = async (req, res) => {
    const userId = req.params.userId;
    const pId = req.body.product;
 
    try {
     
        let currentUser = await cart.findOne({ userId });
 
        if (!currentUser) {
           
            currentUser = new cart({ userId });
        }
 
        
        const alreadyAdded = currentUser.product.includes(pId);
 
        if (alreadyAdded) {
            
            currentUser.product.pull(pId);
        } else {
           
            currentUser.product.push(pId);
        }
 
        
        await currentUser.save();
 
        res.json(currentUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//Get all wishlist by userID
exports.getcartItems = async (req, res) => {
  const userId=req.params.userId
    try {
      
      const cartItems = await cart.find({userId});
      
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


