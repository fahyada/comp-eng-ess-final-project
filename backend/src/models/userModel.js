import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
})

const User = mongoose.model("User", userSchema);

export default User;