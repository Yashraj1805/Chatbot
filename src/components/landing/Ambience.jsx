// Page-wide atmosphere: soft layered glows + a fine film grain.
// Fixed, behind content, pointer-events-none — adds depth without distraction.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Ambience() {
  return (
    <>
      {/* soft colour fields */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-400/15 blur-[120px] dark:bg-brand-600/15" />
        <div className="absolute top-[35%] -right-40 h-[32rem] w-[32rem] rounded-full bg-accent-400/12 blur-[120px] dark:bg-accent-600/12" />
        <div className="absolute bottom-0 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-300/10 blur-[120px] dark:bg-brand-700/10" />
      </div>

      {/* film grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }}
      />
    </>
  )
}
