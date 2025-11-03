import jwt from "jsonwebtoken";

// create an activation code and token.
export const createActivationToken = (user) => {
  // creating a 4 digit Activation Code.
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};
