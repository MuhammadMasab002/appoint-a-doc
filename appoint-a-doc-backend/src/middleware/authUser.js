import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    const token =
      bearer && bearer.startsWith("Bearer ")
        ? bearer.slice(7)
        : req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login again",
      });
    }

    // verify token
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded_token || !decoded_token.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login again",
      });
    }

    req.body.userId = decoded_token.userId;

    next();
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default authUser;
