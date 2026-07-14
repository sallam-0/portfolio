import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StageSection } from "@/components/StageSection";
import { StageIndicator } from "@/components/StageIndicator";
import { Projects } from "@/components/Projects";
import { Principles } from "@/components/Principles";
import { Footer } from "@/components/Footer";

const ParticleCanvas = lazy(() =>
  import("@/components/particles/ParticleCanvas").then((m) => ({ default: m.ParticleCanvas })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahmed Sallam — Data Engineer" },
      {
        name: "description",
        content:
          "Ahmed Sallam is a data engineer building trustworthy pipelines — from ingest to serve. Portfolio, principles, and selected work.",
      },
      { property: "og:title", content: "Ahmed Sallam — Data Engineer" },
      {
        property: "og:description",
        content:
          "Ingest, validate, quality, transform, orchestrate, serve. Selected data-engineering and analytics work.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen w-full bg-void text-mist">
      <Suspense fallback={null}>
        <ParticleCanvas />
      </Suspense>
      <Nav />
      <StageIndicator />
      <main className="relative z-10">
        <Hero />

        <StageSection
          id="ingest"
          index={1}
          eyebrow="Ingest"
          title="Pull from where it lives."
          body="APIs, event streams, databases, file drops. Land it raw, fast, and append-only."
          tools={["kafka", "kinesis", "s3", "airbyte"]}
          align="right"
          next="validate"
        />
        <StageSection
          id="validate"
          index={2}
          eyebrow="Validate"
          title="Enforce shape."
          body="Schema checks, type enforcement, contract tests. Bad data never reaches the lake."
          tools={["great-expectations", "dbt", "json-schema", "protobuf"]}
          align="left"
          next="quality"
        />
        <StageSection
          id="quality"
          index={3}
          eyebrow="Quality"
          title="Watch the watchmen."
          body="Nulls, duplicates, drift, freshness, completeness. Alert before the dashboard lies."
          tools={["soda", "monte-carlo", "dbt", "elementary"]}
          align="right"
          next="transform"
        />
        <StageSection
          id="transform"
          index={4}
          eyebrow="Transform"
          title="Clean, enrich, aggregate, model."
          body="Star schemas, slowly changing dims, semantic layers. The raw becomes the model."
          tools={["dbt", "spark", "snowflake", "bigquery", "databricks"]}
          align="left"
          next="orchestrate"
        />
        <StageSection
          id="orchestrate"
          index={5}
          eyebrow="Orchestrate"
          title="Schedule, depend, retry, observe."
          body="Idempotent DAGs, backfills that don't break prod, alerts that wake the right person."
          tools={["airflow", "dagster", "prefect", "argo"]}
          align="right"
          next="serve"
        />
        <StageSection
          id="serve"
          index={6}
          eyebrow="Serve Analytics"
          title="Hand it to the people who ask questions."
          body="Warehouses, lakehouses, semantic models, BI tools. The system becomes a product. From chaos to queryable truth."
          tools={["snowflake", "bigquery", "looker", "hex", "mode"]}
          align="left"
        >
          <p className="mt-6 border-t border-ash pt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
            Active sessions · last 24h
          </p>
          {/* Screen-reader fallback for the particle charts */}
          <dl className="sr-only">
            <dt>Users</dt><dd>25%</dd>
            <dt>Events</dt><dd>20%</dd>
            <dt>Transactions</dt><dd>18%</dd>
            <dt>Sessions</dt><dd>15%</dd>
            <dt>Referrals</dt><dd>12%</dd>
            <dt>Other</dt><dd>10%</dd>
          </dl>
        </StageSection>

        <Projects />
        <Principles />
        <Footer />
      </main>
    </div>
  );
}
