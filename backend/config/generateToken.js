import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id },                     
    "hdfjkhaskfskdjnksjfh",       
    { expiresIn: "30d" }          
  );
};

export default generateToken;
