import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToAlternatives = () => {
    document.querySelector("#alternatives")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center bg-gradient-to-b from-background to-muted/40"
    >
      <div className="relative z-10 max-w-4xl">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-primary">Explore the possibilities</span>
          <br />
          <span className="text-muted-foreground">and become</span>{" "}
          <span
            className="bg-gradient-to-r from-primary via-vibrant-purple to-hot-pink bg-clip-text text-transparent"
          >
            discordless
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Tired of Discord's mandatory ID verification and privacy concerns?
          Discover smaller, privacy-focused, open-source, and decentralized
          alternatives that prioritize{" "}
          <span className="font-semibold text-foreground">real control</span> and{" "}
          <span className="font-semibold text-foreground">freedom</span>.
        </p>

        <button
          onClick={scrollToAlternatives}
          className="group mt-12 inline-flex flex-col items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <span>Explore alternatives</span>
          <ChevronDown
            className="h-6 w-6"
            style={{ animation: "float 2s ease-in-out infinite" }}
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
