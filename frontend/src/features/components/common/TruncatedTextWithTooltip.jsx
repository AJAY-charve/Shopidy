// import React, { useEffect, useRef, useState } from "react";

// const TruncatedTextWithTooltip = ({ text }) => {
//   const textRef = useRef(null);
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     const el = textRef.current;
//     if (el) {
//       setShowTooltip(el.scrollWidth > el.clientWidth);
//     }
//   }, [text]);

//   return (
//     <div className="relative group">
//       <h3
//         ref={textRef}
//         className="text-xs sm:text-sm font-medium truncate cursor-pointer text-gray-800"
//       >
//         {text}
//       </h3>

//       {/* Tooltip – only if text is truncated */}
//       {showTooltip && (
//         <div
//           className="
//             hidden sm:block
//             absolute left-1/2 -translate-x-1/2
//             top-full mt-2
//             min-w-[180px] max-w-[260px]
//             bg-gray-900 text-white text-xs
//             px-3 py-2 rounded-md
//             shadow-xl
//             opacity-0 invisible
//             group-hover:opacity-100 group-hover:visible
//             transition-all duration-200
//             z-50
//             whitespace-normal
//             pointer-events-none
//           "
//         >
//           {text}

//           {/* Arrow */}
//           <span
//             className="
//               absolute left-1/2 -top-1
//               -translate-x-1/2
//               w-2 h-2
//               bg-gray-900
//               rotate-45
//             "
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TruncatedTextWithTooltip;

import React, { useEffect, useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const TruncatedTextWithTooltip = ({
  text,
  className = "",
  showIcon = false,
  tooltipPosition = "top",
  maxWidth = "max-w-[260px]",
}) => {
  const textRef = useRef(null);
  const tooltipRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0 });

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setShowTooltip(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  useEffect(() => {
    if (isVisible && tooltipRef.current && textRef.current) {
      const textRect = textRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Calculate position to prevent tooltip from going off-screen
      let left = textRect.left + textRect.width / 2;

      // Adjust if tooltip would go off right edge
      if (left + tooltipRect.width / 2 > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width / 2 - 10;
      }

      // Adjust if tooltip would go off left edge
      if (left - tooltipRect.width / 2 < 0) {
        left = tooltipRect.width / 2 + 10;
      }

      setCoords({ left });
    }
  }, [isVisible]);

  const getTooltipPosition = () => {
    switch (tooltipPosition) {
      case "top":
        return "bottom-full mb-2";
      case "bottom":
        return "top-full mt-2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      default:
        return "top-full mt-2";
    }
  };

  const getArrowPosition = () => {
    switch (tooltipPosition) {
      case "top":
        return "left-1/2 -bottom-1 -translate-x-1/2 rotate-45";
      case "bottom":
        return "left-1/2 -top-1 -translate-x-1/2 rotate-45";
      case "left":
        return "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45";
      case "right":
        return "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45";
      default:
        return "left-1/2 -top-1 -translate-x-1/2 rotate-45";
    }
  };

  return (
    <div className="relative inline-flex items-center gap-1 group">
      {/* Text */}
      <h3
        ref={textRef}
        className={`text-xs sm:text-sm font-medium truncate cursor-default text-gray-800 ${className}`}
        title={!showTooltip && showIcon ? text : undefined}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {text}
      </h3>

      {/* Info Icon (optional) */}
      {showIcon && showTooltip && (
        <FaInfoCircle
          className="text-gray-400 hover:text-amber-500 transition-colors text-xs cursor-help"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        />
      )}

      {/* Tooltip */}
      {(showTooltip || showIcon) && isVisible && (
        <div
          ref={tooltipRef}
          style={{ left: coords.left }}
          className={`
            fixed z-50
            ${getTooltipPosition()}
            min-w-[180px] ${maxWidth}
            bg-gradient-to-r from-gray-800 to-gray-900
            text-white text-xs
            px-4 py-2.5 rounded-lg
            shadow-2xl
            whitespace-normal
            pointer-events-none
            animate-in fade-in slide-in-from-top-2 duration-200
            border border-gray-700
          `}
        >
          {/* Tooltip Content */}
          <div className="relative">
            <p className="leading-relaxed">{text}</p>

            {/* Optional decorative line */}
            <div className="absolute -top-1 left-0 w-8 h-0.5 bg-amber-500 rounded-full"></div>
          </div>

          {/* Arrow */}
          <span
            className={`
              absolute w-3 h-3
              bg-gray-800
              ${getArrowPosition()}
              border border-gray-700
            `}
            style={{
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
            }}
          />

          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-amber-500/5 rounded-lg blur-sm -z-10"></div>
        </div>
      )}
    </div>
  );
};

// Pre-made variants
export const ProductNameWithTooltip = ({ name }) => (
  <TruncatedTextWithTooltip
    text={name}
    showIcon={true}
    tooltipPosition="bottom"
    className="font-semibold text-gray-900 hover:text-amber-600 transition-colors"
  />
);

export const DescriptionWithTooltip = ({ description }) => (
  <TruncatedTextWithTooltip
    text={description}
    tooltipPosition="top"
    maxWidth="max-w-sm"
    className="text-gray-600"
  />
);

export default TruncatedTextWithTooltip;
