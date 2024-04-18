import express from "express";

import * as userController from "../controllers/userControllers.js";

const router = express.Router();

router.get("/:id", userController.getUser);
router.post("/", userController.createUser);

export default router;