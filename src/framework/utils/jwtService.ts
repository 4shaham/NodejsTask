import IJwtService, {
  DecodedJwt,
  tokenData,
} from "../../interface/utils/IJWTService";
import Jwt from "jsonwebtoken";

export default class JwtService implements IJwtService {
  createToken(data: tokenData): string {
    try {
      let secret: string = process.env.JWT_SECRET_key!;
      let token = Jwt.sign(data,secret,{expiresIn:"1h"});
      console.log(token)
      return token;
    } catch (error) {
        console.log("shaham")
      throw error;
    }
  }

  verify(token: string): DecodedJwt | null {
    try {
      const decoded = Jwt.verify(
        token,
        process.env.JWT_SECRET_key!
      ) as DecodedJwt;
      return decoded;

    } catch (error) {
      if (error instanceof Jwt.TokenExpiredError) {
        return null; // Token has expired
      } else {
        console.error("JWT Verification Error:", error);
        throw new Error("JWT Verification Error");
      }
    }

  }

}
