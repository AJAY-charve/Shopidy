import React, { useEffect, useRef, useState } from "react";

const TruncatedTextWithTooltip = ({ text }) => {
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setShowTooltip(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  return (
    <div className="relative group">
      <h3
        ref={textRef}
        className="text-xs sm:text-sm font-medium truncate cursor-pointer text-gray-800"
      >
        {text}
      </h3>

      {/* Tooltip – only if text is truncated */}
      {showTooltip && (
        <div
          className="
            hidden sm:block
            absolute left-1/2 -translate-x-1/2
            top-full mt-2
            min-w-[180px] max-w-[260px]
            bg-gray-900 text-white text-xs
            px-3 py-2 rounded-md
            shadow-xl
            opacity-0 invisible
            group-hover:opacity-100 group-hover:visible
            transition-all duration-200
            z-50
            whitespace-normal
            pointer-events-none
          "
        >
          {text}

          {/* Arrow */}
          <span
            className="
              absolute left-1/2 -top-1
              -translate-x-1/2
              w-2 h-2
              bg-gray-900
              rotate-45
            "
          />
        </div>
      )}
    </div>
  );
};

export default TruncatedTextWithTooltip;
