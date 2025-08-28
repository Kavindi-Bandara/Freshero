import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import img10 from "./Image/img10.jpg";
import axios from "axios";

function LogIn() {
  // Navigate Function
  const navigate = useNavigate();

  //array for details that customer entered
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //change the values when customer are enter the value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    //push to the post request to backend
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password,
      });

    alert("Welcome to Freshero");//success message of logIn success
    localStorage.setItem("token", response.data.token); // save token for later use
    navigate("/Home"); // redirect to Home page
   } 
   catch (error) {
    // not succesfull the logIn
    alert("LogIn is not success");
   }
};

  return (
    <div>
      <div className="relative">
        <img src={img10} className="w-full h-219" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 pl-95">
            <div className="w-200 mt-10 ml-10 bg-red-900 font-bold font-sans text-white text-center rounded-t-2xl">
              <h1 className="text-4xl pt-8">Welcome to Freshero</h1>
              <p className="text-lg pt-3 pb-8">Log in manage your food inventory</p>
            </div>

            <div className="w-200 ml-10 text-lg bg-white opacity-80 mb-10 rounded-b-2xl">
              <form className="pl-50 pt-10" onSubmit={handleSubmit}>
                <label>Email Address:</label><br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-300 rounded-2xl w-100 h-10"
                  required
                /><br /><br />

                <label>Password:</label><br />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-300 rounded-2xl w-100 h-10"
                  required
                /><br /><br />

                <div className="-ml-18">
                  <button
                  type="submit"
                  className="bg-red-900 h-15 w-140 rounded-xl text-white text-lg hover:bg-red-500 transition-color mt-10"
                >
                  LogIn
                 </button>
                </div>
              </form>

              <p className="pt-6 pb-10 pl-65">
                Don't have an account?{" "}
                <Link to="/SignUp" className="hover:text-red-500 transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
