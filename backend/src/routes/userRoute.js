import express from "express";

import * as userController from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getNewUserId);
router.get("/", userController.getUser);
router.get("/topRank", userController.getTopRank);
router.get("/userRank", userController.getUserRank);
router.post("/bestScore", userController.getUserBestScore);


export default router;