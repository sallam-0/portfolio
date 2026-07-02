import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard, Reveal, type Project } from "@/components/portfolio";

export const Route = createFileRoute("/data-analytics")({
  head: () => ({
    meta: [
      { title: "Data analytics — Ahmed Sallam" },
      {
        name: "description",
        content:
          "Dashboards and applied analytics: EGX Power BI market dashboard and the GCP e-commerce analytics layer.",
      },
      { property: "og:title", content: "Data analytics — Ahmed Sallam" },
      {
        property: "og:description",
        content:
          "Dashboards and applied analytics on top of the pipelines — turning processed data into decisions.",
      },
    ],
  }),
  component: DataAnalytics,
});

const PROJECTS: Project[] = [
  {
    title: "EGX market dashboard",
    category: "Power BI · DAX",
    summary:
      "A Power BI dashboard served live from the EGX big data pipeline via Simba Hive ODBC, tracking Egyptian Exchange price trends, volume, and computed technical indicators — SMA, EMA, RSI, MACD, and Bollinger Bands.",
    highlights: [
      "Live connection to Hive over Simba ODBC",
      "Technical indicators computed upstream in PySpark and modeled for DAX",
      "Price, volume, and trend views across the EGX universe",
    ],
    tags: ["Power BI", "DAX", "Hive", "Simba ODBC"],
    repo: "https://github.com/sallam-0/egx-bigdata-pipeline",
    imagePrompt:
      "Power BI dashboard screenshot: EGX tickers with price line, volume bars, RSI/MACD panels, KPI cards.",
  },
  {
    title: "E-commerce analytics layer",
    category: "BigQuery · Insights",
    summary:
      "Applied analytics built directly into the GCP e-commerce platform, turning warehouse data into pricing and trust signals.",
    highlights: [
      "Price tracking across multiple sites with automated price-change alerts",
      "Seller trust scoring from historical listing and pricing behavior",
      "Sentiment analysis on product reviews feeding back into the trust signal",
    ],
    tags: ["BigQuery", "SQL", "Python"],
    repo: "https://github.com/sallam-0/gcp-ecommerce-data-platform",
    imagePrompt:
      "Analytics dashboard: price trend line per product, seller trust score badges, sentiment gauge, alert feed.",
  },
];

function DataAnalytics() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Dashboards + BI
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Data analytics</h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Dashboards and applied analytics built on top of the pipelines — turning processed data
              into decisions.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
        <Reveal>
          <div className="mt-8 rounded-xl border border-dashed border-border/70 bg-card/30 p-6 text-sm text-muted-foreground">
            <span className="text-foreground">More dashboards coming.</span> Drop a screenshot into
            each project's image slot to replace the placeholder.
          </div>
        </Reveal>
      </section>
    </>
  );
}
