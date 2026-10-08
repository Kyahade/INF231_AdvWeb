import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleSubmit = () => {
    if (editing === null) {
      axios
        .post("http://localhost:5000/students", {
          name,
          course,
          age,
        })
        .then(() => {
          return axios.get("http://localhost:5000/students");
        })
        .then((response) => {
          setStudents(response.data);
          setName("");
          setCourse("");
          setAge("");
        });
    } else {
      axios
        .put(`http://localhost:5000/students/${editing}`, {
          name,
          course,
          age,
        })
        .then(() => {
          return axios.get("http://localhost:5000/students");
        })
        .then((response) => {
          setStudents(response.data);
          setEditing(null);
          setName("");
          setCourse("");
          setAge("");
        });
    }
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        return axios.get("http://localhost:5000/students");
      })
      .then((response) => {
        setStudents(response.data);
      });
  };

  const editStudent = (student) => {
    setEditing(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  return (
    <div>
      <h1>Student Managament System</h1>
      <p>Welcome to our MERN application</p>

      <h2>Add / Edit Student</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
<br></br>
      <input
        type="text"
        placeholder="Enter course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
<br></br>
      <input
        type="number"
        min="1"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
<br></br>
      <button onClick={handleSubmit}>
        {editing === null ? "Add Student" : "Update Student"}
      </button>

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <br></br>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button onClick={() => editStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
