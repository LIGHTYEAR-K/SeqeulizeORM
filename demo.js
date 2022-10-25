const Sequelize=require('sequelize')
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize= new Sequelize('deathAdam','postgres','qwerty',{
    dialect:'postgres'
})

sequelize.authenticate().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
     console.log("Error Not Connected")
})


const Record = sequelize.define('deathBlock', {
    id:{
         type: DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
     },
     Name: {
       type: DataTypes.STRING,
       allowNull: false,
       Validate:{
        len:[4,6]
     },
     get() {
        const Datas = this.getDataValue('Name');
        return Datas.toUpperCase();
      }
     },
     Age: {
       type: DataTypes.INTEGER
     },
     City: {
         type: DataTypes.STRING,
         set(value){
            const salt= bcrypt.genSaltSync(12);
            const hash= bcrypt.hashSync(value,salt)
            this.setDataValue('City', hash);
        }
     },

     Phone_NO: {
         type: DataTypes.INTEGER,
         unique: true
       },
 
   },
   {
     freezeTableName: true,
     timestamps:false
   
   })
 
Record.sync({alter:true}).then(()=>{
  return Record.create({
    Name:'TonyStarks',
    City:'coimbatore'
  })
})
.then((data)=>{
    console.log(data.Name);
    console.log(data.City)
    // data.forEach((datas)=>{
    //     console.log(datas.toJSON())
    // })
      
}).catch((err)=>{
       console.log(err)
})