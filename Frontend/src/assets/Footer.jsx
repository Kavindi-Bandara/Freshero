import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBurger } from '@fortawesome/free-solid-svg-icons';

function Footer(){
    return(
        <footer>
           <div class="h-50 bg-gray-900">
                <td className="pl-120 pt-5">
                    <p class="text-3xl text-red-400 ">Freshero</p>
                    <FontAwesomeIcon icon={faBurger} className="text-white text-8xl mt-5"/>
                </td>
                <td className="pl-70">
                    <div class="text-white text-center text-xl pt-5">
                    <p class="mb-2 mt-5">Track your food inventory and expiration dates with ease.</p>
                    <p class="mb-2">Never waste food again !</p>
                </div>  
                <p className="text-white text-center pt-5">
                    <button className="text-md"><Link to="/Home">Home</Link></button> / <button className="text-md"><Link to="/AboutUs">AboutUs</Link></button> / <button className="text-md"><Link to="/Inventory">Inventory</Link></button> / <button className="text-md"><Link to="/SignUp">SignUp</Link></button>
                </p> 
                </td>         
           </div>
            
        </footer>

    )
}

export default Footer;