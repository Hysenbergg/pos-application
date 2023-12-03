const express = require("express");  // Node.js ile işlemlerimizi yapabilmek için kullandığımız ana kütüphane.

// Mongo DB ile bağlantı işlemlernii bunun yardımı ile çözüyoruz.
const mongoose = require('mongoose');

// .env dosyasını kullanabilmek için kullanıyotuz.
const dotenv = require('dotenv'); 
const logger = require("morgan");
const app = express();

// post işlemlerinde yaşanılan veriyi düzgün yazmama hatasını bunun yardımı ile çzöüyoruz.
const cors = require('cors');

const port = proces.env.PORT || 5000;

const categoryRoute = require('./routes/categories.js');
const productRoute = require('./routes/products.js');
const billRoute = require('./routes/bills.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    connect();

    console.log(`Example app listening on port ${port}`);
})