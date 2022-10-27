const Sequelize=require('sequelize')
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const{ QueryTypes } = require("sequelize")

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
    //  get() {
    //     const Datas = this.getDataValue('Name');
    //     return Datas.toUpperCase();
    //   }
     },
     Age: {
       type: DataTypes.INTEGER,
      //  validate:{
      //   isNumeric: true,
      //  }

     },
     City: {
         type: DataTypes.STRING,
        //  set(value){
        //     const salt= bcrypt.genSaltSync(12);
        //     const hash= bcrypt.hashSync(value,salt)
        //     this.setDataValue('City', hash);
        // }
     },

     Phone_NO: {
         type: DataTypes.INTEGER,
         //unique: true
       },
 
   },
   {
     freezeTableName: true,
     timestamps:true,
     paranoid:false,
     deletedAt: 'destroyTime'

   })
 
Record.sync({alter:true}).then(()=>{
        return Record.findAll({attributes:['Name','City']})

}).then((data)=>{
    console.log(data)
    // data.forEach((datas)=>{
    //     console.log(datas.toJSON())
    // })
      
}).catch((err)=>{
       console.log(err)
})












//                            Raw Query
// Record.sync({alter:true}).then(()=>{
//   return sequelize.query('SELECT * FROM deathBlock', { type: sequelize.QueryTypes.SELECT });
//   return sequelize.query("UPDATE deathBlock SET Age = 1000 WHERE Name = ThorOdin" , { type: sequelize.QueryTypes.UPDATE });
//   return sequelize.query('SELECT * FROM deathBlock');
// })
// .then((data)=>{
//   [result,metadata]=data;
//     console.log(result);
//     console.log(metadata);
// })



//                            Pananoid
// Record.sync({alter:true}).then(()=>{
//   return Record.findOne({where:{id:1}, paranoid: false }); //to view soft deleted row
//   return Record.restore({where:{id:6}}) // restore for softly delete records
//   return Record.destroy({where: {id:6},force:true}) //Hard
//    return Record.destroy({where: {id:6}) //soft
//  }).then((data)=>{
//      console.log(data)
//  })