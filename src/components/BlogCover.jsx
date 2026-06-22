// Branded gradient cover for blog posts — a topic icon on a brand gradient with a
// subtle dot texture. Reliable (no external images) and on-brand.
export default function BlogCover({ post, className = '', iconClass = 'h-16 w-16' }) {
  const Icon = post.icon
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${post.tint} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
      {Icon && <Icon className={`relative text-white drop-shadow ${iconClass}`} strokeWidth={1.5} />}
      <span className="absolute bottom-3 left-4 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
        {post.category}
      </span>
    </div>
  )
}
