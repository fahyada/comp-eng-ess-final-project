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
            name: req.body.name, //input only name
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

export const getNewUserId = async (req, res) => {
    // find from user ID for old user
    const counter = await Counter.find();
    res.status(200).json(counter);
};

export const getAllUser = async (req, res) => {
    // find from user ID for old user
    const users = await User.find();
    res.status(200).json(users);
};

export const updateScore = async (req, res) => {
    try {
        const { id } = req.params;
        const { score } = req.body;
    
        await User.findOneAndUpdate({ id: parseInt(id) }, { score });

        res.status(200).json({ success: true, message: 'Score updated successfully'});
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getUser = async (req, res) => {
    // find from user ID for old user
    try {
        const { id } = req.params;
        const user = await User.findOne({ id: parseInt(id)});
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user: user, message: 'User retrieved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
      }
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
        const { id } = req.params;
    
        const user = await User.findOne({ id: id });
        const userScore = user.score;
    
        const rank = await User.countDocuments({ 
          $or: [
            { score: { $gt: userScore } },
            { score: userScore, id: { $lt: id } }
          ]
        }) + 1;
    
        res.status(200).json({ success: true, rank: rank, message: 'User rank retrieved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
      }
};

//not use //

export const getUserBestScore = async (req, res) => {
    try {
        const userCurScore = req.body.score;

        const user = await User.findById(req.body.id);
        const userOldScore = user.score;

        if(userCurScore > userOldScore){
            user.score = userCurScore;
        }

        await user.save();
        res.status(200).json(user.score);

    } catch (err) {
        res.status(500).send("Error to find the rank");
    }
};