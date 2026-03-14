// import React from "react";
// import { TbBrandMeta } from "react-icons/tb";
// import { IoLogoInstagram } from "react-icons/io";
// import { RiTwitterXLine } from "react-icons/ri";

// const Topbar = () => {
//   return (
//     <div className="bg-[#ea2e0e] text-white">
//       <div className="container mx-auto flex justify-between items-center py-3 px-4">
//         <div className="hidden md:flex items-center space-x-4">
//           <a href="" className="hover:text-gray-300">
//             <TbBrandMeta className="h-5 w-5" />
//           </a>
//           <a href="" className="hover:text-gray-300">
//             <IoLogoInstagram className="h-5 w-5" />
//           </a>
//           <a href="" className="hover:text-gray-300">
//             <RiTwitterXLine className="h-4 w-4" />
//           </a>
//         </div>
//         <div className="text-sm text-center">
//           <span>We Shipped worlwide - Fast and reliable shipping!</span>
//         </div>
//         <div className="hidden md:block text-sm">
//           <a href="tel:+1234567890" className="hover:text-gray-300">
//             +1234567890
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;

import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FaPhone, FaTruck } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 px-4 text-sm">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 order-2 md:order-1 mt-2 md:mt-0">
            <a
              href="#"
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <TbBrandMeta className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <RiTwitterXLine className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Shipping Message */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            <FaTruck className="h-4 w-4" />
            <span className="font-medium tracking-wide">
              FREE WORLDWIDE SHIPPING ON ALL ORDERS OVER $100
            </span>
          </div>

          {/* Phone Number */}
          <div className="hidden md:flex items-center gap-2 order-3">
            <FaPhone className="h-3.5 w-3.5" />
            <a
              href="tel:+1234567890"
              className="hover:text-amber-100 transition-colors font-medium"
            >
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
