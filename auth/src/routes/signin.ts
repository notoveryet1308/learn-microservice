import express, { Request, Response } from "express";
import { body } from "express-validator";
import JWT from "jsonwebtoken";

import { Password } from "../utils/password";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-req";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email is not a valid !!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password !!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials!");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials!");
    }

    const userJwt = JWT.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
