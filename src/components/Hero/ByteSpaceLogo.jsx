export default function ByteSpaceLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 select-none group cursor-pointer ${className}`}>
      {/* Custom ByteSpace 'b' icon with play cutout matching reference */}
      <div className="relative w-[22px] h-[24px] flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-transform duration-200 group-hover:scale-105"
        >
          {/* Main 'b' body in vibrant lime */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 0C2.01472 0 0 2.01472 0 4.5V20.5C0 23.5376 2.46243 26 5.5 26H13C17.9706 26 22 21.9706 22 17C22 12.0294 17.9706 8 13 8H6V4.5C6 2.01472 4.5 0 4.5 0ZM6 11H13C16.3137 11 19 13.6863 19 17C19 20.3137 16.3137 23 13 23H6V11Z"
            fill="#cbfc01"
          />
          {/* Inner triangle cutout pointing right */}
          <path
            d="M7 13.5L14.5 17L7 20.5V13.5Z"
            fill="#003be2"
          />
        </svg>
      </div>

      <span className="text-white font-bold text-[19px] tracking-[-0.015em] leading-none">
        ByteSpace
      </span>
    </div>
  );
}
