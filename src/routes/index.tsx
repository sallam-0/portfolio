import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PipelineFlow, Reveal, TypedRole } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});


const STACK = [
  "Python", "SQL", "Kafka", "Debezium", "Apache Flink", "PySpark",
  "Airflow", "dbt", "Snowflake", "BigQuery", "HDFS", "Hive",
  "GCP", "Docker", "SSIS", "Power BI",
];

function Index() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText("ahmedalasallam@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Data engineer · Cairo, Egypt
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              I build <span className="text-primary">reliable data systems</span>
              <br />
              for <TypedRole />
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              I'm <span className="text-foreground">Ahmed Sallam</span>. I turn raw, messy data into
              pipelines and warehouses teams can trust — from CDC streaming platforms and
              cloud-native lakehouses to dimensional warehouses and BI dashboards.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/data-engineering"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                View engineering projects →
              </Link>
              <Link
                to="/data-analytics"
                className="inline-flex items-center rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                See dashboards
              </Link>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
              <a
                href="https://github.com/sallam-0"
                target="_blank"
                rel="noopener"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ahmedsallam109/"
                target="_blank"
                rel="noopener"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pipeline flow */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              How I think about data
            </h2>
            <span className="hidden font-mono text-xs text-muted-foreground sm:block">
              raw → reliable
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <PipelineFlow />
        </Reveal>
      </section>


      {/* Category cards */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Explore the work</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal delay={60}>
            <Link
              to="/data-engineering"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 transition hover:border-primary/50 hover:bg-card"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  04 projects
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Data engineering</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  CDC streaming platforms, cloud-native lakehouses, and dimensional warehouses — Kafka,
                  Flink, Airflow, dbt, GCP, and SSIS.
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                View projects
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/data-analytics"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 transition hover:border-primary/50 hover:bg-card"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  Dashboards + BI
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Data analytics</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Market dashboards and applied analytics on top of the pipelines — Power BI, DAX,
                  and real-world business signals.
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                View dashboards
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">The stack</h2>
        </Reveal>
        <Reveal delay={60}>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border/70 bg-card/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-primary/60 hover:text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 to-card/40 p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Get in touch
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Open to data engineering roles — Cairo & remote.
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Fastest way to reach me is email or LinkedIn. I reply within a day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:ahmedalasallam@gmail.com"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                ahmedalasallam@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/ahmedsallam109/"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                LinkedIn
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
