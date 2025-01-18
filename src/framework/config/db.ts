import { Sequelize } from "sequelize-typescript";
import User from "../model/userModel";
import Project from "../model/projectModel";





const sequelize = new Sequelize(
    'ProjectManagment',  
    'root',
    'shaham@123',
     {
       host: '127.0.0.1',
       dialect: 'mysql'
     }
);


export  const connectDb=async()=>{

     
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        
     }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
     });
     
    
     await sequelize.sync({ force: false })
}








 export default sequelize


