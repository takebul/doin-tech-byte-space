import Image from "next/image";

export default function DecorativeShapes() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10"
    >
      {/* 1. Top-Left Lime Spring Coil */}
      <div className="absolute -left-2 sm:left-0 top-[25%] sm:top-[26%] w-[95px] sm:w-[115px] lg:w-[135px] animate-float-slow">
        <Image
          src="/shape-1.png"
          alt=""
          width={145}
          height={185}
          className="w-full h-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* 2. Mid-Left White Squiggle */}
      <div className="hidden sm:block absolute left-[12%] lg:left-[13.8%] top-[47%] lg:top-[48%] w-[65px] sm:w-[75px] lg:w-[86px] animate-float-reverse">
        <Image
          src="/shape-2.png"
          alt=""
          width={95}
          height={105}
          className="w-full h-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.16)]"
        />
      </div>

      {/* 3. Bottom-Left White Donut / Torus */}
      <div className="absolute left-[1%] sm:left-[2.5%] lg:left-[3.8%] bottom-[4%] sm:bottom-[5%] w-[120px] sm:w-[145px] lg:w-[172px] animate-float-slow">
        <Image
          src="/shape-3.png"
          alt=""
          width={180}
          height={165}
          className="w-full h-auto drop-shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* 4. Top-Right Lime Cylinder */}
      <div className="absolute -right-2 sm:right-0 top-[22%] sm:top-[23%] w-[95px] sm:w-[115px] lg:w-[135px] animate-float-reverse">
        <Image
          src="/shape-4.png"
          alt=""
          width={144}
          height={220}
          className="w-full h-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* 5. Mid-Right White Pyramid */}
      <div className="hidden sm:block absolute right-[12%] lg:right-[13.8%] top-[45%] lg:top-[46%] w-[70px] sm:w-[80px] lg:w-[96px] animate-float-slow">
        <Image
          src="/shape-5.png"
          alt=""
          width={105}
          height={115}
          className="w-full h-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.16)]"
        />
      </div>

      {/* 6. Bottom-Right White Spring Coil */}
      <div className="absolute right-[1%] sm:right-[2.5%] lg:right-[3.8%] bottom-[4%] sm:bottom-[5%] w-[105px] sm:w-[125px] lg:w-[145px] animate-float-reverse">
        <Image
          src="/shape-6.png"
          alt=""
          width={155}
          height={180}
          className="w-full h-auto drop-shadow-[0_14px_28px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
}
