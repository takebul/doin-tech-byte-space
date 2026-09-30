export default function LearningProgressCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-[16px] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.14)] border border-white/60 w-[155px] sm:w-[170px] transition-transform duration-300 hover:-translate-y-1 select-none pointer-events-auto ${className}`}
    >
      <div className="text-neutral-700 font-medium text-[11px] sm:text-[12px] leading-tight">
        Learning Progress
      </div>
      <div className="text-neutral-950 font-extrabold text-[28px] sm:text-[32px] leading-none my-2 tracking-tight">
        55%
      </div>

      {/* Progress Bar Track */}
      <div
        className="w-full h-[6px] sm:h-[7px] bg-[#f0f1f3] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={55}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Learning Progress 55%"
      >
        <div
          className="h-full bg-[#cbfc01] rounded-full"
          style={{ width: "55%" }}
        />
      </div>
    </div>
  );
}
