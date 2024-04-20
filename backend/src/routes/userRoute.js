import express from "express";

import * as userController from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getNewUserId);
router.get("/", userController.getUser);
router.get("/", userController.getTopRank);
router.get("/", userController.getUserRank);
router.get("/", userController.getUserBestScore);


export default router;