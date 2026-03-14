// import React from "react";
// import Topbar from "../Layout/Topbar";
// import Navbar from "./Navbar";

// const Header = () => {
//   return (
//     <header className="border-b border-gray-200">
//       <Topbar />
//       <Navbar />
//     </header>
//   );
// };

// export default Header;

import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
