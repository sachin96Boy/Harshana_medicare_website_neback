import express from 'express';
import  mongoose  from 'mongoose';
import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouters.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/HarshaMediCare',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true, 
});

// app.get('/api/Products/:id', (req, res) => {
//     const product = data.products.find(x => x._id === req.params.id);
//     if(product){
//         res.send(product);
//     } else{
//         res.status(404).send({message: "Product not found"});
//     }
// });

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);




app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err,req,res,send)=>{
    res.status(500).send({message:err.message})
})

const port = process.env.PORT || 5000;  //listen to porrt 3000 or select a port where dataset resides
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});