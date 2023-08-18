const bcrypt = require("bcrypt");

exports.hashpassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

exports.comparePassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};
