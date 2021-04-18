import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  res.send("hey hey");
});

export { router as signoutRouter };
