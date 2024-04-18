import User from "../models/userModel.js";
import Counter from "../models/counterModel.js";

export const createUser = async (req, res) => {
    // enter only Name, ID auto create, Score default = 0
    try {
        //Find counter and increment seq automatic
        const counter = await Counter.findOneAndUpdate({}, {$inc: {seq: 1}}, { upsert: true ,new: true});

        //Create new user
        const newUser = new User({
            id: counter.seq, 
            name: req.body, //input only name
            score: 0,
        });
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
    const userId = req.body;
    const user = await User.findById(userId);
    if(!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
};

export const getTopRank = async (req, res) => {
    // rank user by score -> id
    try {
        const rankedUser = await User.find().sort({ score: -1, id: 1}).limit(5);
        res.status(200).json(rankedUser);
    } catch (err) {
        res.status(500).send("Error to ranking");
    }
};

export const getUserRank = async (req, res) => {
    try {
        const userId = req.parmas.id;
        const rankedUser = await User.find().sort({ score: -1, id: 1});
        const userIndex = rankedUser.findIndex(userId);

        if (userIndex === -1) {
            res.status(404).send("User not found");
            return;
        }

        const userRank = userIndex + 1;
        res.status(200).json(userRank);
    } catch (err) {
        res.status(500).send("Error to find the rank");
    }
};