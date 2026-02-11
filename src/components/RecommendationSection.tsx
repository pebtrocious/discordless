import { ExternalLink, Lock, Shield, Globe, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Lock, text: "Strong end-to-end encryption by default" },
  { icon: Eye, text: "No ID checking — ever" },
  { icon: Globe, text: "Fully decentralized federation" },
  { icon: Shield, text: "Transparent TOS & minimal data collection" },
];

const RecommendationSection = () => {
  return (
    <section id="recommendation" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-8 sm:p-12">
          <div className="relative z-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              My #1 Recommendation
            </p>

            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-primary via-vibrant-purple to-hot-pink bg-clip-text text-transparent">
                Matrix
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Matrix is my top pick because it's{" "}
              <span className="font-semibold text-foreground">fully open-source</span>{" "}
              — anyone can build clients, host servers, or extend it. Creating an
              account is simple: just pick a homeserver like{" "}
              <a
                href="https://matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                matrix.org
              </a>
              . No advanced nerd knowledge needed.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              It supports core Discord-like features: text/voice/video channels,
              granular permissions, custom emojis, screen sharing, and more. While
              the default client Element has a different look, you can use more
              Discord-feeling apps like{" "}
              <a
                href="https://cinny.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Cinny
              </a>{" "}
              or{" "}
              <a
                href="https://commet.chat"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Commet
              </a>{" "}
              for a familiar UI.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="gap-2">
                <a href="https://matrix.org" target="_blank" rel="noopener noreferrer">
                  Visit Matrix <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="gap-2"
              >
                <a href="https://app.element.io" target="_blank" rel="noopener noreferrer">
                  Use Element <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="gap-2"
              >
                <a href="https://cinny.in" target="_blank" rel="noopener noreferrer">
                  Try Cinny <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <div className="flex flex-col gap-1">
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 border-primary/70 shadow-md shadow-primary/30 border-glow"
                >
                  <a href="https://commet.chat" target="_blank" rel="noopener noreferrer">
                    Try Commet <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Closest to Discord experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
