const DecentralizationSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/40 via-background to-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-vibrant-purple/20 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-4xl space-y-6 rounded-2xl border border-primary/40 bg-background/80 p-8 shadow-lg shadow-primary/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
          Big picture
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Why decentralization matters
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Discord&apos;s biggest problem is not just ID verification — it&apos;s that a single,
          centralized company can unilaterally decide which communities are allowed to exist.
          When all of your conversations, relationships, and history live on one corporation&apos;s
          servers, you&apos;re always one policy change away from losing access.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Decentralized and federated systems spread power out. Instead of one company owning the
          entire network, you can pick a server that matches your values, self‑host, or move
          elsewhere if policies change. No single government or regulator can pressure a single
          provider into enforcing their rules on everyone, everywhere.
        </p>
        <div className="rounded-xl border border-border/80 bg-muted/40 p-5">
          <h3 className="font-display text-xl font-semibold">
            Why Root and Valour might be temporary fixes
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Platforms like Root and Valour are promising alternatives today because they focus on
            privacy and don&apos;t require heavy ID checks. But they are still centralized services:
            if they grow large enough, they will face the same UK and EU regulatory pressure that
            Discord does. At that point, they can be forced into the same kind of real‑ID rules,
            broad content controls, or data‑sharing obligations you&apos;re trying to escape.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            That&apos;s why long‑term freedom usually comes from protocols and ecosystems like
            Matrix or self‑hostable tools — where no single company can be leaned on to control
            everyone at once.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DecentralizationSection;
