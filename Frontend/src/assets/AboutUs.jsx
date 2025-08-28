import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScaleBalanced,faSackDollar,faBowlFood,faCircleCheck} from '@fortawesome/free-solid-svg-icons'

import img9 from "./Image/img9.jpg";

function AboutUs(){
    return(
        <div>
        <Header/>
           <aboutus>
            {/*Section of About Freshero*/}
             <div class="pt-40 bg-red-900 pb-18">
                <h1 class="text-4xl text-center font-bold font-sans mt-9 text-white">About Freshero</h1>
                <p class="text-center text-white pt-4 text-lg font-sans">We're on a mission to reduce food waste and help people save money by tracking their food inventory and expiration dates.</p>
             </div>
               
            {/*Section of Our story with image background*/}
             <div class="relative">
                <img src={img9} class="w-full h-160"/>
                <div class="absolute inset-0 flex items-center ">
                    <div class="container mx-auto px-85 ">
                        <div class="max-w-200 bg-black opacity-70">
                              <p class="text-red-600 text-sans text-4xl font-bold ml-10 pt-20 mb-8">Our Story</p>
                              <div class="text-lg text-white mx-10">
                              <p class="mb-6">Freshero started with a simple observation: too much food was being wasted because people forgot about items in their refrigerator or pantry until it was too late.</p>
                              <p class="mb-6">Founded in 2020, our team of food enthusiasts and technology experts came together to create a solution that would help households track their food inventory, receive timely reminders about expiring items, and ultimately reduce food waste.</p>
                              <p class="pb-25">Today, Freshero has helped thousands of users save money and reduce their environmental impact by preventing unnecessary food waste.</p>
                              </div>
                        </div>
                    </div>
                </div>
             </div>

            {/*Section of Our Mission & Values*/}
            <div class="py-16 px-4 max-w-full mr-20 ml-20 ">
                <p class="text-3xl text-center font-bold font-sans mt-15 text-red-900 mb-20">Our Mission & Values</p>
                <div class="grid md:grid-cols-3 gap-20 mt-10 ">
                        {/* Reduce Food Waste */}
                        <div class="bg-white p-6 rounded-lg shadow-md text-center">
                            <FontAwesomeIcon icon={faScaleBalanced} class="text-red-300 h-15 ml-50 mb-10"/>
                            <h3 class="text-xl font-bold mb-4 text-red-900">Reduce Food Waste</h3>
                            <p class="text-gray-700 mb-10">We're committed to helping households reduce food waste through better inventory management and timely reminders.</p>
                        </div>
                        
                        {/* Save Money */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FontAwesomeIcon icon={faSackDollar} class="text-red-300 h-15 ml-50 mb-10"/>
                            <h3 className="text-xl font-bold mb-4 text-red-900">Save Money</h3>
                            <p className="text-gray-700">By preventing food waste, we help our users save money on their grocery bills and make smarter shopping decisions.</p>
                        </div>

                        {/* Simplify Life */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FontAwesomeIcon icon={faBowlFood} class="text-red-300 h-15 ml-50 mb-10" />
                            <h3 className="text-xl font-bold mb-4 text-red-900">Simplify Life</h3>
                            <p className="text-gray-700">We believe in creating simple, intuitive tools that make everyday food management easier and more efficient.</p>
                        </div>
                </div>
            </div>

            {/*Section of What Makes us Different*/}
            <div class="bg-gray-200 ">
                <p class="text-3xl text-center font-bold font-sans mt-10 text-red-900 pt-20">What Makes Us Different</p>
                <div class="grid md:grid-cols-2 gap-10  ml-100 mt-20">
                <div class="w-100 ">
                    <FontAwesomeIcon icon={faCircleCheck} class="text-red-900 h-8 -ml-10"/>
                    <p class="text-2xl font-bold mb-4 ">Smart Expiration Tracking</p>
                    <p class="text-xl">Our intelligent system tracks expiration dates and sends timely reminders to use items before they go bad.</p>
                </div>

                <div class="w-100">
                    <FontAwesomeIcon icon={faCircleCheck} class="text-red-900 h-8 -ml-10"/>
                    <p class="text-2xl font-bold mb-4">Easy Inventory Management</p>
                    <p class="text-xl">Quickly add items to your inventory with our user-friendly interface and barcode scanning feature.</p>
                </div>
                </div>

                <div class="mt-10 ml-200 w-100 pb-20">
                    <FontAwesomeIcon icon={faCircleCheck} class="text-red-900 h-8 -ml-10"/>
                    <p class="text-2xl font-bold mb-4">Food Waste Analytics</p>
                    <p class="text-xl">Track your progress in reducing food waste with detailed analytics and reporting.</p>
                </div>
            </div>
             
            {/*Section of Join Our Mission*/}
             <div class="bg-red-900 ">
                <p class="text-3xl text-center font-bold font-sans text-white pt-20">Join Our Mission</p>
                <p class="text-white text-center mt-5 w-140 ml-170 mb-5">Be part of the solution to food waste. Sign up today and start tracking your food inventory.</p>
                <button class="bg-white mb-20 h-10 w-40 text-red-900 font-bold ml-220 rounded-xl text-center hover:bg-gray-300 transition-colors"><Link to="/SignUp">Sign Up Now</Link></button>
             </div>
             
           </aboutus>
        <Footer/>
        </div>
    )

}

export default AboutUs;