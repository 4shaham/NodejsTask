import { Sequelize } from "sequelize-typescript";
import User from "../model/userModel";
import Project from "../model/projectModel";





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

     
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        
     }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
     });
     
    
     await sequelize.sync({ force: false })
}








 export default sequelize


