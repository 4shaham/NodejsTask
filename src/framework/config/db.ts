import { Sequelize } from "sequelize-typescript";
import User from "../model/userModel";
import Project from "../model/projectModel";
import { StatusCode } from "../../enums/statusCode";
import Errors from "../../errors/errors";





// const sequelize = new Sequelize(
//      process.env.DB as string,  
//      process.env.USER as string,
//      process.env.PASSWORD as string,
//      {
//        host:process.env.HOST,
//        dialect:"mysql"
//      }
// );



const sequelize = new Sequelize(process.env.DB as string,process.env.USER as string,process.env.PASSWORD,{
  host:process.env.HOST as string,
  dialect: 'mysql',
  port:3306,
});




export  const connectDb=async()=>{

   
   try {
      await sequelize.authenticate()
      await sequelize.sync({ force: false })
   } catch (error) {
       throw new Errors("Database connection Error",StatusCode.internalServer)
   }    

}








 export default sequelize


