import User from "../models/userModel.js";

export const createUser = async (req, res) => {
    // enter only Name, ID auto create, Score default = 0
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).json({ message: "OK"});
    } catch(err) {
        if (err.name === "ValidationError") {
            res.status(400).json({ error: "Bad Request" });
        } else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
};

export const getUser = async (req, res) => {
    // find from user ID for old user
    const userId = req.parmas.id;
    const user = await User.findById(userId);
    if(!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
};

export const rankUser = async (req, res) => {
    // rank user by score -> id
    
};