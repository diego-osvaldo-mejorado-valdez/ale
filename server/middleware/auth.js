import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(400).json({
        message: "Provide token",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

    if (!decode) {
      return response.status(400).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    request.userId = decode.id;

    next();
    
  } catch (error) {
    return response.status(500).json({
      message: "You are not logged in",
      error: true,
      success: false,
    });
  }
};

export default auth;