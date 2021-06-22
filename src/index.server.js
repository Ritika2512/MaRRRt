const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@cluster0.qwsd9.mongodb.net/${process.env.MDB_DATABASE}?retryWrites=true&w=majority`,
    {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex:true,
         useFindAndModify:false
    }
).then(()=>{
    console.log('database connected');
});


app.use(express.json());

app.use('/api',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
});
