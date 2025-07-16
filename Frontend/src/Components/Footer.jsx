import React from 'react'
import { Link } from 'react-router-dom'
// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className='bg-gray-800 text-white py-10 px-4'>
            <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6'>
                <div className='text-center'>
                    <h4 className='text-lg font-semibold mb-3'>About</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/contact" className='hover:underline  no-underline'>
                            Contact Us
                        </Link></li>
                        <li><Link to="/about" className='hover:underline  no-underline'>
                            About
                        </Link></li>
                        <li><a href="#" className="hover:underline  no-underline">Careers</a></li>
                        <li><a href="#" className="hover:underline  no-underline">Press</a></li>
                    </ul>
                </div>

                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-3">HELP</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline  no-underline">Payments</a></li>
                        <li><a href="#" className="hover:underline  no-underline">Shipping</a></li>
                        <li><a href="#" className="hover:underline  no-underline">Returns</a></li>
                        <li><a href="#" className="hover:underline  no-underline">FAQ</a></li>
                    </ul>
                </div>

                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-3">POLICY</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline  no-underline">Return Policy</a></li>
                        <li><a href="#" className="hover:underline  no-underline">Terms Of Use</a></li>
                        <li><a href="#" className="hover:underline  no-underline">Security</a></li>
                        <li><a href="#" className="hover:underline  no-underline">Privacy</a></li>
                    </ul>

                </div>
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-3">ADDRESS</h4>
                    <p className="text-sm text-gray-300">
                        Gurllyy Shop Pvt. Ltd.<br />
                        support@gurllyy.com
                    </p>
                </div>

            </div>
             <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {year} Gurllyy Shop. All Rights Reserved.
      </div>

        </footer>
    )
}

export default Footer