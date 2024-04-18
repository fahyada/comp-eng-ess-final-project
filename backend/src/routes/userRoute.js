import express from "express";

import * as userController from "../controllers/userControllers.js";

const router = express.Router();

router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.get("/", userController.getRankUser);
router.get("/", userController.getUserRank);
router.get("/", userController.getUserBestScore);

export default router;