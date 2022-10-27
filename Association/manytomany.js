const Sequelize=require('sequelize')
const { DataTypes } = require("sequelize");

const sequelize= new Sequelize('deathAdam','postgres','qwerty',{
    dialect:'postgres'
})

sequelize.authenticate().then(()=>{
    console.log("Connection Successful!")
}).catch((err)=>{
     console.log("Error Not Connected")
})
   
const Customer = sequelize.define('customer',{

    CustomerName:{
        type:DataTypes.STRING,
        
    }
},
    {
        freezeTableName: true,
        timestamps:false,

})

const Product = sequelize.define('product',{

    ProductName:{
        type:DataTypes.STRING,
        
    }
},
    {
        freezeTableName: true,
        timestamps:false,

})

const CustomerProduct=sequelize.define('customerproduct',{

       customerproductId:{
                 type: DataTypes.INTEGER,
                 primaryKey:true,
                 autoIncrement:true
       }
    },{
          timestamps:false
})


Customer.belongsToMany(Product,{through:CustomerProduct})
Product.belongsToMany(Customer,{through:CustomerProduct})

let customer,product;
sequelize.sync().then(()=>{
      return Customer.destroy({where:{CustomerName:'brucewayen'}})
}).then((data)=>{
    console.log(data)
}).catch((err)=>{
  console.log(err)
})
 






                                        //Add utility method 

sequelize.sync().then(()=>{
      return Customer.findOne({where:{CustomerName:'brucewayen'}})
}).then((data)=>{
     customer=data;
     return Product.findAll()
}).then((data)=>{
      product=data;
      return customer.addProduct(product)
}).then((data)=>{
    console.log(data)
}).catch((err)=>{
  console.log(err)
})

                                        // Add utilites belongsToMany

sequelize.sync().then(()=>{
      return Product.findOne({where:{ProductName:'comicbooks'}})
}).then((data)=>{
     product=data;
     return Customer.findAll()
}).then((data)=>{
      customer=data;
      return product.addCustomer(customer)
}).then((data)=>{
    console.log(data)
}).catch((err)=>{
  console.log(err)
})

                                     // Delete

sequelize.sync().then(()=>{
      return Customer.destroy({where:{CustomerName:'brucewayen'}})
}).then((data)=>{
    console.log(data)
}).catch((err)=>{
  console.log(err)
})
                                      