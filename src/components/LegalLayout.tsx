const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function LegalLayout({ intro, sections }: { intro: string; sections: { title: string; body: string }[] }) {
  return (
    <section className="relative z-10 px-6 pb-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[18rem_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-5 overflow-x-auto pb-2 text-sm lg:block lg:space-y-2.5 lg:overflow-visible lg:pb-0">
            {sections.map((s) => (
              <li key={s.title}><a href={`#${slug(s.title)}`} className="whitespace-nowrap text-white/65 hover:text-white">{s.title}</a></li>
            ))}
          </ul>
        </nav>
        <article className="mist rounded-[2rem] p-8 text-[#1a0f2e] md:p-12">
          <p className="border-l-2 border-[#ff8a36] pl-5 text-lg leading-relaxed">{intro}</p>
          {sections.map((s) => (
            <section key={s.title} id={slug(s.title)} className="mt-10 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold tracking-tight">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-[#1a0f2e]/75">{s.body}</p>
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
