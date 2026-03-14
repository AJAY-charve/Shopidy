// import React from "react";
// import { IoLogoInstagram } from "react-icons/io";
// import { RiTwitterXLine } from "react-icons/ri";
// import { TbBrandMeta, TbFilePhone } from "react-icons/tb";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="border-t py-12">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0 ">
//         <div>
//           <h3 className="text-lg text-gray-800 mb-4">NewsLetter</h3>
//           <p className="text-gray-500 mb-4">
//             We the first to hear about new products, exclusive events, and
//             online offer.
//           </p>
//           <p className="font-medium text-sm text-gray-600 mb-6">
//             Sign up and get 10% of your first order
//           </p>

//           {/* News letter form */}
//           <form className="flex">
//             <input
//               type="email"
//               placeholder="Enter your Email"
//               className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md
//             focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
//             />
//             <button
//               type="button"
//               className="bg-black text-white px-6 py-3 text-sm
//             rounded-r-md hover:bg-gray-800 transition-all"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>

//         {/* shop links */}
//         <div>
//           <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 Men's Top wear
//               </Link>
//             </li>
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 Women's Top wear
//               </Link>
//             </li>
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 Men's Bottom wear
//               </Link>
//             </li>
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 Women's Bottom wear
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* suppor link */}
//         <div>
//           <h3 className="text-lg text-gray-800 mb-4">Support</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 FAQ'S
//               </Link>
//             </li>
//             <li>
//               <Link to="#" className=" hover:text-gray-600 transition-colors">
//                 Feature's
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* follow us */}
//         <div>
//           <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
//           <div className="flex items-centers space-x-4 mb-6">
//             <a
//               href="http:www.facebook.com"
//               target="_blank"
//               rel="noopener norefrer"
//               className="hover:text-gray-500"
//             >
//               <TbBrandMeta className="h-5 w-5" />
//             </a>
//             <a
//               href="http:www.facebook.com"
//               target="_blank"
//               rel="noopener norefrer"
//               className="hover:text-gray-500"
//             >
//               <IoLogoInstagram className="h-5 w-5" />
//             </a>
//             <a
//               href="http:www.facebook.com"
//               target="_blank"
//               rel="noopener norefrer"
//               className="hover:text-gray-500"
//             >
//               <RiTwitterXLine className="h-4 w-4" />
//             </a>
//           </div>
//           <p className="text-gray-500">Call Us</p>
//           <p>
//             <TbFilePhone className="inline-block mr-2" />
//             98475935
//           </p>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
//         <p className="text-gray-500 text-sm tracking-tighter text-center">
//           @2025 CompileTab. All Right Reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta, TbFilePhone, TbMail } from "react-icons/tb";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm font-medium text-amber-700 flex items-center gap-2">
                <span className="text-lg">🎁</span>
                Sign up and get 10% off your first order
              </p>
            </div>

            {/* Newsletter Form */}
            <form className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <TbMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                    transition-all"
                />
              </div>
              <button
                type="button"
                className="bg-gray-900 text-white px-6 py-3 text-sm font-medium
                  rounded-lg hover:bg-amber-600 transition-all duration-300
                  whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 relative inline-block">
              Shop
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Men's Top Wear", path: "/shop/men/top" },
                { name: "Women's Top Wear", path: "/shop/women/top" },
                { name: "Men's Bottom Wear", path: "/shop/men/bottom" },
                { name: "Women's Bottom Wear", path: "/shop/women/bottom" },
                { name: "New Arrivals", path: "/new-arrivals" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-amber-500 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", path: "/contact" },
                { name: "About Us", path: "/about" },
                { name: "FAQ's", path: "/faq" },
                { name: "Shipping & Returns", path: "/shipping" },
                { name: "Terms & Conditions", path: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-amber-500 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 relative inline-block">
              Follow Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber-500"></span>
            </h3>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 mb-6">
              {[
                {
                  icon: TbBrandMeta,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: IoLogoInstagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: RiTwitterXLine,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-lg 
                    flex items-center justify-center text-gray-600 
                    hover:bg-amber-500 hover:text-white hover:border-amber-500 
                    transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <TbFilePhone className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Call Us</p>
                  <a
                    href="tel:+98475935"
                    className="text-sm font-medium hover:text-amber-600"
                  >
                    +91 98475 93500
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <TbMail className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href="mailto:support@compiletabe.com"
                    className="text-sm font-medium hover:text-amber-600"
                  >
                    support@compiletabe.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Store Location</p>
                  <p className="text-sm font-medium">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 lg:px-0 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear}{" "}
              <span className="font-semibold text-gray-800">CompileTab</span>.
              All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">We accept:</span>
              <div className="flex items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/paypal.png"
                  alt="PayPal"
                  className="h-6"
                />
              </div>
            </div>

            {/* Made with love */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Made with <FaHeart className="text-red-500 text-xs" /> by
              CompileTab
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
