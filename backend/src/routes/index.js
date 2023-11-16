import { signUpRoute } from "./signUpRoute.js";
import { loginRoute } from "./loginRoute.js";
import { testRoute } from "./testRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { testEmailRoute } from "./testEmailRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";
import { forgotPasswordRoute } from "./forgotPasswordRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthURLRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { getAllUsers, insertOneUser } from "./users.js";
import { getAllFeatures, insertFeatures } from "./featuresAndAppliances.js";

export const routes = [
  testRoute,
  signUpRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
  getAllUsers,
  insertOneUser,
  getAllFeatures, 
  insertFeatures,
];
