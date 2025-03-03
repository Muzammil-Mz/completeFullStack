import React from "react";
import axios from "axios";

const Register = () => {
  const [formData, setformData] = {
    fullName: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let apiUrl = "http://localhost:5002/api/public/register";
      let response = await axios.post(apiUrl, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>Register</div>
      <form onSubmit={handleSubmit}>
        <input type="text " value={formData.fullName} placeholder="FullName" onChange={handleChange} />
        <input type="email" value={formData.email} placeholder="Email" />
        <input
          type="password"
          value={formData.password}
          placeholder="password"
        />
        <input type="number" value={formData.age} placeholder="Age" />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
