const Address = require('../Models/AddressModel');



exports.createAddress = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, mobilenum, pincode, locality, address, city, state, alternatephonenumber, addresstype } = req.body;

        
        let existingUser = await Address.findOne({ userId });

        if (!existingUser) {
           
            existingUser = new Address({ userId, Address: [] });
        }

        
        existingUser.Address.push({
            name,
            mobilenum,
            pincode,
            locality,
            address,
            city,
            state,
            alternatephonenumber,
            addresstype
        });

       
        await existingUser.save();

        res.status(201).json({ success: true, message: 'Address created successfully', address: existingUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create address', error: error.message });
    }
};



exports.getAddressesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        
        const addresses = await Address.find({ userId });

        res.status(200).json({ success: true, addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get addresses', error: error.message });
    }
};



exports.getAddressByUserIdAndAddressId = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        // Find the address based on both user ID and address ID
        const address = await Address.findOne({ userId, 'Address._id': addressId }, { 'Address.$': 1 });

        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        res.status(200).json({ success: true, address });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get address', error: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const updateData = req.body;

       
        const address = await Address.findOneAndUpdate(
            { userId, 'Address._id': addressId },
            { $set: { 'Address.$': updateData } },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Address updated successfully', address });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update address', error: error.message });
    }
};


exports.deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        
        await Address.findOneAndUpdate(
            { userId },
            { $pull: { Address: { _id: addressId } } }
        );

        res.status(200).json({ success: true, message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete address', error: error.message });
    }
};
