const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();
const { generateInterviewReport } = require('./services/ai.service');


connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});