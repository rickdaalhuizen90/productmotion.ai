import { type JSX } from "react";
import {
  CheckCircle2,
  LucideGitGraph,
  MessageSquare,
  Zap,
} from "lucide-react";

type FeatureItem = {
  icon: JSX.Element;
  title: string;
  description: string;
}

type CollaborationItem = {
  id: string;
  text: string;
}

type StatsItem = {
  value: string;
  description: string;
}

const collaborationItems: CollaborationItem[] = [
  { id: 'collab-1', text: "Real-time collaboration" },
  { id: 'collab-2', text: "Immediate feedback" },
  { id: 'collab-3', text: "Assign tasks effortlessly" },
];

const statsData: StatsItem[] = [
  { value: "99%", description: "Track and analyze business metrics efficiently" },
  { value: "5.0", description: "Rated as the top-performing platform" },
];

const FeatureCard = ({ icon, title, description }: FeatureItem): JSX.Element => (
  <div className="flex h-full flex-col justify-between gap-3">
    <div>
      <span className="flex size-14 items-center justify-center rounded-full bg-muted">
        {icon}
      </span>
      <h2 className="mt-5 text-xl font-semibold lg:text-3xl">{title}</h2>
    </div>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const StatsCard = ({ value, description }: StatsItem): JSX.Element => (
  <div className="flex items-center gap-5">
    <span className="text-4xl font-semibold md:text-5xl">{value}</span>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export function Features(): JSX.Element {
  return (
    <section className="wrapper py-32">
      <div className="container">
        <div className="flex flex-col gap-10">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Shopify Integration
            </h1>
            <p className="mt-4 text-2xl text-muted-foreground md:text-3xl">
              Manage directly from your Shopify dashboard.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-12">
            <div className="col-span-2 grid gap-7 rounded-lg bg-background p-7 md:grid-cols-2">
              <FeatureCard
                icon={<LucideGitGraph aria-hidden="true" className="h-auto w-5" />}
                title="Generate detailed reports with just a few clicks"
                description="Use our powerful tools to simplify reporting and make data-driven decisions faster."
              />
              <img
                src="https://dexodata.com/landing/img/content/category/shopify.svg"
                alt="Shopify Integration visualization"
                className="aspect-video h-full w-full rounded-xl object-contain md:aspect-auto"
                loading="lazy"
                width={400}
                height={300}
              />
            </div>

            <div className="rounded-lg bg-background p-7">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <Zap aria-hidden="true" className="h-auto w-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold lg:text-3xl">
                    Seamless collaboration with your team
                  </h2>
                </div>
                <ul className="flex flex-col gap-5" role="list">
                  {collaborationItems.map(({ id, text }) => (
                    <li key={id} className="flex gap-2">
                      <CheckCircle2 aria-hidden="true" className="shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid items-center gap-12 rounded-lg bg-background p-7 md:p-10 lg:grid-cols-3">
            <h2 className="text-xl font-semibold lg:text-3xl">
              Generate detailed reports with just a few clicks
            </h2>
            {statsData.map((stat, index) => (
              <StatsCard key={`stat-${index}`} {...stat} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MessageSquare aria-hidden="true" className="h-auto w-4" />
            <p className="text-center">Need more info? Reach out to our team.</p>
            <a 
              href="#contact" 
              className="underline hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Add your contact handling logic here
              }}
            >
              Let&apos;s chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
