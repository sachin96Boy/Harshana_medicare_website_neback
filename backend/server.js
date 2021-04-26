import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/Products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message: "Product not found"});
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});
const port = process.env.PORT || 5000;  //listen to porrt 3000 or select a port where dataset resides
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});