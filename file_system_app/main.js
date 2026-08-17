const express = require('express')
const productRouter = require('./product/product.controller')
const app = express()
const port = 3000;

app.use(express.json())
app.use('/files',express.static('./uploads'))



app.use('/home',(req, res, next) => {
    res.send("Hello From home")
})

//routes
app.use('/product',productRouter)

//invalid routing
app.all('{/*dummy}',(req, res, next) => {// app.all match full url
    res.send("invalid routing")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    
     })