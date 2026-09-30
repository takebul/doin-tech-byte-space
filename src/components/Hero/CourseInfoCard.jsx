export default function CourseInfoCard({ className = "" }) {
  return (
    <div
      className={`bg-white rounded-[14px] px-4 py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.14)] border border-white/60 transition-transform duration-300 hover:-translate-y-1 select-none pointer-events-auto ${className}`}
    >
      <h2 className="text-neutral-900 font-bold text-[13px] leading-tight tracking-tight">
        UI/UX Design
      </h2>
      <p className="text-neutral-500 font-normal text-[10px] sm:text-[11px] mt-0.5 whitespace-nowrap">
        200 Courses &bull; 1000+ Students
      </p>
    </div>
  );
}
