import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClipboardList, faChartSimple, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

{/*Importing the images*/}
import img1 from "./Image/img1.jpg";
import img2 from "./Image/img2.jpg";
import img3 from "./Image/img3.jpg";
import img4 from "./Image/img4.jpg";
import img5 from "./Image/img5.jpg";
import img6 from "./Image/img6.jpg";
import img7 from "./Image/img7.jpg";
import img11 from "./Image/img11.jpg";
import img12 from "./Image/img12.jpg";
import img13 from "./Image/img13.jpg";
import img14 from "./Image/img14.jpg";
import img15 from "./Image/img15.jpg";
import img16 from "./Image/img16.jpg";
import img17 from "./Image/img17.jpg";
import img18 from "./Image/img18.jpg";
import img19 from "./Image/img19.jpg";


function Home() {

    {/*Home page food category section loop*/}
    const foodItems = [
    { img: img1, name: "Biscuits & Snacks", dis: "Track cookies, crackers and other snacks", track: "Track Item →" },
    { img: img2, name: "Beverages", dis: "Monitor juices, sodas, and other drinks", track: "Track Item →" },
    { img: img3, name: "Grains & Rice", dis: "Keep track of rice, pasta, and other grains", track: "Track Item →" },
    { img: img4, name: "Dairy & Eggs", dis: "Monitor milk, cheese, eggs, and more", track: "Track Item →" },
    { img: img5, name: "Fruits & Vegetables", dis: "Track fresh produce expiration dates", track: "Track Item →" },
    { img: img6, name: "Meat & Seafood", dis: "Monitor freshness of meats and seafood", track: "Track Item →" },
    ];
    
    {/*Home page Image slider section loop*/}
    const slides = [
        {id: 1, title: "Never Let Food Go To Waste Again", dis:"Track expiration dates and manage your food inventory with ease.", image: img7,},
        {id: 2, title: "Save Food, Save Money, Save the Planet",dis:"Good for your budget, better for the Earth.",image: img11,},
        {id: 3, title: "Fresh Food, Smart Choices, Zero Waste", dis:"Track your groceries effortlessly and say goodbye to spoiled food.", image: img12,},
        {id: 4, title: "Eat Fresh, Shop Smarter", dis:"Grocery lists tailored to what's expiring soon.", image: img13,},
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    {/*Home page feedback section loop*/}
    const testimonials = [
    {id: 1, image: img14, name: "Emily Chen", 
     content: "This app has transformed how I manage my pantry! The expiration alerts help me plan meals around ingredients that need to be used first. I've reduced my food waste by 60%."},
    {id: 2,image: img15,name: "Michael Johnson",
      content:"We've cut our food costs by 15% since using this tracking system. The inventory management features help us rotate stock efficiently and reduce waste."},
    {id: 3,image: img16,name: "David Rodriguez",
     content:"As someone who forgets about leftovers, this app saves me money and prevents those scary fridge surprises. The barcode scanning makes adding items super quick!"},
    {id: 4,image: img17,name: "Sophia Patel",
     content: "Managing groceries for my family of four was overwhelming until I found this. Now I get notifications before milk expires and can plan meals accordingly. Total game-changer!"},
    {id: 5,image: img18,name: "Olivia Kim",
     content: "Finally an app that makes reducing food waste easy! I love seeing reports of how much I've saved from landfills. The planet thanks you!"},
    { id: 6,image: img19,name: "James Wilson",
      content: "The 'use first' feature helps me organize my weekly meal prep perfectly. No more discovering spoiled veggies in the back of my fridge!"}    
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

    return (
        <div>
            <Header />
            <div>
                {/*Home page Image Slider */}
                <div className="relative w-full h-200 overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide) => (
                            <div key={slide.id} className="w-full flex-shrink-0 relative">
                                <img src={slide.image} alt={slide.title} className="w-full h-screen object-cover" />
                                <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center h-80 mt-85">
                                    <div className="text-center">
                                        <h1 className="text-white text-6xl font-bold px-4 ">{slide.title}</h1>
                                        <p className="text-white text-2xl pt-4">"{slide.dis}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*Create the navigation arrows in the Image sliders*/}
                    <button 
                        onClick={prevSlide} 
                        className="absolute left-4 transform text-white text-2xl p-2 -mt-98">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <button 
                        onClick={nextSlide} 
                        className="absolute right-4 transform p-2 text-white text-2xl -mt-98">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>

                </div>

                {/* Food Categories Section */}
                <div className="py-16 px-4">
                    <h2 className="text-4xl text-center font-bold font-sans mb-4">Food Categories</h2>
                    <p className="text-center text-xl mb-12 font-medium">Track all types of food in your inventory</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {foodItems.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="overflow-hidden h-60">
                                    <img 
                                        src={item.img} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                                        alt={item.name}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                                    <p className="text-gray-600 mb-4">{item.dis}</p>
                                    <Link to="/Inventory" className="text-red-700 font-medium hover:text-red-500 transition-colors flex items-center">
                                        {item.track}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* creating the section of why we use food track  */}
                <div className="bg-gray-100 py-20">
                    <h1 className="text-4xl text-center font-bold font-sans mb-12">Why Choose Food Track?</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faClock} className="text-red-300 text-5xl mb-6"/>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Expiration Tracking</h2>
                            <p className="text-gray-600">
                                Never miss an expiration date again with our smart notification system.
                            </p>
                        </div>

                        <div className="text-center">
                            <FontAwesomeIcon icon={faClipboardList} className="text-red-300 text-5xl mb-6" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Easy Inventory</h2>
                            <p className="text-gray-600">
                                Quickly add, remove, and update items in your food inventory.
                            </p>
                        </div>

                        <div className="text-center">
                            <FontAwesomeIcon icon={faChartSimple} className="text-red-300 text-5xl mb-6" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Usage Analytics</h2>
                            <p className="text-gray-600">
                                See how you consume food and reduce waste with smart analytics.
                            </p>
                        </div>
                    </div>
                </div>

                {/* creating the section of Ready to reduce food waste?  */}
                <div className="py-20 text-center">
                    <h1 className="text-4xl font-bold font-sans mb-6">Ready to reduce food waste?</h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who have saved money and reduced their environmental impact.
                    </p>
                    <Link to="/Inventory">
                        <button className="bg-red-800 px-8 py-4 rounded-3xl text-white hover:bg-red-600 transition-colors">Tracking Food</button>
                    </Link>
                </div>

                {/* creation of Feedback Section */}
                <div className="py-16 px-4 bg-gray-50">
                   <h2 className="text-4xl text-center font-bold font-sans mb-12">What Our Customers Say</h2>
  
                   <div className="relative max-w-4xl mx-auto">
                   
                   <div className="overflow-hidden">
                     <div className="flex transition-transform duration-500 ease-in-out" 
                          style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                       {testimonials.map((testimonial) => (
                         <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                           <div className="bg-white p-8 rounded-xl shadow-lg">
                             <div className="flex flex-col items-center">
                               <img src={testimonial.image} className="rounded-full h-20 w-20 object-cover mb-4" alt={testimonial.name}/>
                               <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                               <p className="text-gray-600 mt-4 text-center">{testimonial.content}</p>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/*Navigation Arrows in Feedback section */}
                   <button 
                     onClick={prevTestimonial} 
                     className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition">
                     <FontAwesomeIcon icon={faAngleLeft} />
                   </button>

                   <button 
                     onClick={nextTestimonial} 
                     className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition">
                     <FontAwesomeIcon icon={faAngleRight} />
                   </button>

                </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Home;