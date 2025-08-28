import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function Header(){
    return(
        <header class="fixed top-0 left-0 w-full z-50">
            <table class="bg-cover bg-red-900 w-full shadow-2xl">
                <th class="font-serif text-6xl text-white ml-10 pb-5 pr-201 pt-7">Freshero</th>
                <th class="font-sans text-white pr-15"><Link to="/Home"><FontAwesomeIcon icon={faHouse}/>Home</Link></th>
                <th class="text-white  pr-15 pb-5 "><Link to="/SignUp"><button class="bg-red-400 h-15 p-2 rounded-3xl hover:bg-red-500 transition-colors">Sign Up</button></Link></th>
                <th class="font-sans text-white pr-15"><Link to="/AboutUs">AboutUs</Link></th>
            </table>
        </header>
    )
}

export default Header;