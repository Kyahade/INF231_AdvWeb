const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
require("dotenv").config();
 
const Student = require("./models/Student");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((error => {
        console.log("MongoDB connection error:", error);
    }))
 
app.get("/", (req, res) => {
    res.send("Server is running");
});
 
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});
 
app.post("/students", async (req, res) => {
    const { name, course, age } = req.body;
    const newStudent = new Student({ name, course, age });
    await newStudent.save();
    res.json(newStudent);
});
 
app.put("/students/:id", async (req, res) => {
    const { id } = req.params;
    const { name, course, age } = req.body;
 
    const updated = await Student.findByIdAndUpdate(
        id,
        { name, course, age },
        { new: true }
    );
 
    res.json(updated);
});
 
app.delete("/students/:id", async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted" });
});
 
app.listen(5000, () => {
    console.log("Server running on port 5000");
});