import Image from "next/image";

const studentAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=96&h=96&auto=format&fit=crop&q=80",
];

export default function HappyStudentsCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-[15px] p-3 sm:p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.15)] border border-white/70 w-[170px] sm:w-[185px] transition-transform duration-300 hover:-translate-y-1 select-none pointer-events-auto ${className}`}
    >
      <div className="text-neutral-900 font-bold text-[12px] sm:text-[13px] leading-tight">
        Happy Students
      </div>

      {/* Rating & count */}
      <div className="flex items-center gap-1.5 mt-0.5 mb-2">
        <span className="font-bold text-[11px] sm:text-[12px] text-neutral-900 leading-none">
          4.5
        </span>
        <span className="text-[10px] sm:text-[11px] text-neutral-500 font-normal leading-none">
          (240)
        </span>
        {/* Star Icon */}
        <span className="text-[#ffb800] text-[11px] leading-none">&#9733;</span>
      </div>

      {/* Avatar Group + 2K+ Badge */}
      <div className="flex items-center -space-x-1.5">
        {studentAvatars.map((src, index) => (
          <div
            key={index}
            className="relative w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full overflow-hidden ring-2 ring-white shrink-0"
          >
            <Image
              src={src}
              alt={`Student ${index + 1}`}
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* 2K+ Lime Badge */}
        <div className="relative w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#cbfc01] ring-2 ring-white flex items-center justify-center shrink-0 z-10">
          <span className="text-[8.5px] sm:text-[9px] font-bold text-neutral-950 leading-none">
            2K+
          </span>
        </div>
      </div>
    </div>
  );
}
