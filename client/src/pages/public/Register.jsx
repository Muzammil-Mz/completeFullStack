import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let apiUrl = "http://localhost:5002/api/public/register";
      let response = await axios.post(apiUrl, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || "Error occurred");
    }
  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" value={formData.fullName} placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required />
        <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} required />
        <input type="tel" name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} required />
        <button type="submit" >Register</button>
      </form>
    </>
  );
};

export default Register;
