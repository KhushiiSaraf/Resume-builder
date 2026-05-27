const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();
const { generateInterviewReport } = require('./services/ai.service');


connectDB();
generateInterviewReport({
    resume: "John Doe is a software engineer with 5 years of experience in full stack development. He has worked on various projects using technologies like JavaScript, React, Node.js, and MongoDB. He has a strong background in computer science fundamentals and problem-solving skills.",
    selfDescription: "I am a passionate software engineer who loves to build scalable and efficient applications. I enjoy learning new technologies and improving my skills. I am a team player and always eager to contribute to the success of the project.",
    jobDescription: "We are looking for a full stack developer with experience in JavaScript, React. The ideal candidate should have strong problem-solving skills and a good understanding of computer science fundamentals."
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});