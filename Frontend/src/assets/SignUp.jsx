import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import img8 from "./Image/img8.jpg";
import axios from "axios";

function SignUp() {
  {/* when the signUp is success then navigate to the logIn page */}
  const navigate = useNavigate();

  {/* store the value that user enter */}
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  {/* show thw validation errors and server errors */}
  const [error, setError] = useState("");
 
  {/* when the customer add the values then Formdata are change */}
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  {/*Client-side validation */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      //connect with the Backend
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      alert(response.data.message || "Signup successful!");
      navigate("/");
    }
    //error handling
    catch (error) {
      console.error("Signup error:", error);
      
      if (error.response) {
        // Server responded with an error status
        setError(error.response.data.message || "Signup failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        setError("Cannot connect to server. Please check if the backend is running.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-red-200 min-h-screen w-full">
        <div className="bg-red-200 h-29 w-full"></div>
        <div className="w-395 ml-50 flex -mt-10">
          <div className="bg-red-900 w-190 h-180 pl-15 pt-10 rounded-l-2xl">
            <h2 className="text-3xl font-bold font-sans text-white">Join Freshero Today</h2>
            <p className="text-lg text-red-200 pt-8 font-medium">Start tracking your food inventory, get expiration alerts, and reduce food waste.</p>
            <ul className="pt-3 text-red-200 text-lg font-medium">
              <li className="p-3"><FontAwesomeIcon icon={faCircle} /> Track all your food items in one place</li>
              <li className="p-3"><FontAwesomeIcon icon={faCircle} /> Get notified before food expires</li>
              <li className="p-3"><FontAwesomeIcon icon={faCircle} /> Save money by reducing food waste</li>
            </ul>
            <img src={img8} className="w-190 h-90 pr-15" alt="Food inventory illustration" />
          </div>

          <div className="pl-10 bg-white rounded-r-2xl pr-10">
            <h2 className="text-3xl font-bold font-sans text-red-800 text-center mt-10">Create Your Account</h2>
            
            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {/* Form of the signUp page */}
            <form className="pt-15 text-lg font-bold pb-5" onSubmit={handleSubmit}>
              <label>First Name:</label><br/>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleChange} 
                className="bg-gray-300 rounded-2xl w-100 h-10 px-3" 
                required 
                disabled={loading}
              /><br/>

              <label>Last Name:</label><br/>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange} 
                className="bg-gray-300 rounded-2xl w-100 h-10" 
                required 
                disabled={loading}
              /><br/>

              <label>Email Address:</label><br/>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                className="bg-gray-300 rounded-2xl w-100 h-10 px-3" 
                required 
                disabled={loading}
              /><br/>

              <label>Password:</label><br/>
              <input 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
                className="bg-gray-300 rounded-2xl w-80 h-10 px-3" 
                required 
                minLength={6}
                disabled={loading}
              /><br/>

              <label>Confirm Password:</label><br/>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange} 
                className="bg-gray-300 rounded-2xl w-80 h-10 px-3" 
                required 
                disabled={loading}
              /><br/><br/>
              

              <button 
                type="submit" 
                className="bg-red-800 h-15 w-150 rounded-xl text-white text-lg hover:bg-red-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-10"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"} {/* when the button click can be appear Creating account... */}
              </button>
            </form>

            <p className="text-lg font-sans text-center">
              Already have an account? <Link to="/" className="hover:text-red-500 transition-colors">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
