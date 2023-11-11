const userToken = require("../data/userToken.json");

const auth = async (req, res, next) => {
  try {
    const token = req.query.token;
    if (!token) {
      throw new Error();
    }
    const check = userToken.find((e) => e.token === token);

    if (check) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};
module.exports = auth;
