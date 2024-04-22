import express from "express";

import * as userController from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getNewUserId);
router.get("/allUser", userController.getAllUser);
router.put("/:id", userController.updateScore);
router.get("/userId", userController.getUser);
router.get("/topRank", userController.getTopRank);
router.get("/userRank/:id", userController.getUserRank);
// router.post("/bestScore", userController.getUserBestScore);


export default router;