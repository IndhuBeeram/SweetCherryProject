
const Wishlist=require("../Models/WishlistModel");

exports.createWishlist = async (req, res) => {
    const userId = req.params.userId;
    const pId = req.body.product;
 
    try {
     
        let currentUser = await Wishlist.findOne({ userId });
 
        if (!currentUser) {
           
            currentUser = new Wishlist({ userId });
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


//Get all bookmarks by userID
exports.getwishlistItems = async (req, res) => {
  const userId=req.params.userId
    try {
      
      const wishlist = await Wishlist.find({userId});
      
      res.status(200).json(wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


