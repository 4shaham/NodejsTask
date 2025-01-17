import bcrypt from "bcrypt";
import IHashingService from "../../interface/utils/IHashingService";



export default class HashingServices implements IHashingService {
     
  async hashing(password: string): Promise<string> {
    return await bcrypt.hash(password,10);
  }

  async compare(password:string,hashedPassword:string): Promise<boolean> {
    try {
      let match = await bcrypt.compare(password,hashedPassword);
      return match; 
    } catch (error) {
       throw error 
    }
  }

}
