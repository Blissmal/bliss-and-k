import GlassLink from "@/components/fx/GlassLink";

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[80vh] items-center px-6 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-display text-[clamp(6rem,22vw,16rem)] font-bold leading-none tracking-[-0.05em] text-white/10">404</p>
        <h1 className="font-display -mt-6 text-4xl font-bold tracking-tight md:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 max-w-md text-lg text-white/60">It may have moved, or the link may be wrong.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GlassLink href="/" variant="solid">Go home</GlassLink>
          <GlassLink href="/contact">Contact us</GlassLink>
        </div>
      </div>
    </div>
  );
}
