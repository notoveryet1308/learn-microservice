import express from "express";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  console.log("/api/users/currentUser", { currentUser: req.currentUser || null });
  
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
