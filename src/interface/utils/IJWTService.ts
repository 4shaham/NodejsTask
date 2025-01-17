
import exp from "constants";


export interface tokenData{
    email:string,
    id:number
}


export interface DecodedJwt {
       email:string;
       id:number;
       exp:number; 
       iat:number; 
}




export default interface IJwtService {
  createToken(data:tokenData):string;
  verify(token:string):DecodedJwt|null;
}
