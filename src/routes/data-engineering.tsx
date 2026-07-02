import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard, Reveal, type Project } from "@/components/portfolio";

export const Route = createFileRoute("/data-engineering")({
  head: () => ({
    meta: [
      { title: "Data engineering — Ahmed Sallam" },
      {
        name: "description",
        content:
          "Data engineering projects: streaming CDC platforms, cloud-native lakehouses, and dimensional warehouses with Kafka, Flink, Airflow, dbt, GCP, and SSIS.",
      },
      { property: "og:title", content: "Data engineering — Ahmed Sallam" },
      {
        property: "og:description",
        content:
          "Streaming platforms, cloud data lakes, and dimensional warehouses — the systems behind the dashboards.",
      },
    ],
  }),
  component: DataEngineering,
});

const PROJECTS: Project[] = [
  {
    title: "Real-time fraud detection platform",
    category: "Streaming · CDC",
    summary:
      "A production-style platform for scoring financial transactions for fraud in real time, built around change-data-capture streaming and dimensional modeling.",
    highlights: [
      "CDC pipeline (Debezium + Kafka) ingesting transactional data from MSSQL",
      "Real-time enrichment, feature engineering, and ML-based fraud scoring with Apache Flink",
      "Batch and streaming ELT orchestrated with Airflow, loading into Snowflake",
      "Dimensional modeling with dbt following Kimball methodology",
    ],
    tags: ["Python", "Kafka", "Debezium", "Apache Flink", "Airflow", "dbt", "Snowflake", "Docker", "S3"],
    repo: "https://github.com/sallam-0/real-time-fraud-data-warehouse",
    imagePrompt:
      "MSSQL → Debezium → Kafka → Flink (scoring) → Airflow → Snowflake (dbt star schema). Show CDC + streaming ML.",
  },
  {
    title: "EGX big data pipeline",
    category: "Big data · Lambda",
    summary:
      "A production-grade Lambda-architecture pipeline for Egyptian Exchange market data, processing daily OHLCV batches alongside real-time tick streams.",
    highlights: [
      "Daily OHLCV batches and real-time tick data ingested via Kafka",
      "Medallion lake on HDFS (raw → staging → curated) with PySpark computing SMA, EMA, RSI, MACD, Bollinger Bands",
      "Four Airflow DAGs orchestrating batch ingestion, Spark ETL, Hive view refresh, and streaming",
      "Live Power BI reporting via Simba Hive ODBC",
    ],
    tags: ["Python", "PySpark", "Kafka", "HDFS", "Hive", "Airflow", "Docker", "yfinance", "Power BI"],
    repo: "https://github.com/sallam-0/egx-bigdata-pipeline",
    imagePrompt:
      "Lambda architecture: yfinance batch + Kafka stream → HDFS medallion (raw/staging/curated) → Spark → Hive → Power BI. Airflow orchestration.",
  },
  {
    title: "GCP e-commerce data platform",
    category: "Cloud · Serverless",
    summary:
      "A serverless, end-to-end platform on Google Cloud that ingests multi-site e-commerce data for price comparison and seller analytics.",
    highlights: [
      "Streaming ingestion with exact and fuzzy deduplication, dead-letter queues, and incremental loads",
      "GCS data lake feeding a BigQuery warehouse, with FastAPI and Firestore for real-time access",
      "Analytics layer for price tracking, seller trust scoring, sentiment analysis, and automated alerts",
    ],
    tags: ["Python", "Cloud Run", "Pub/Sub", "Dataflow", "BigQuery", "Cloud Storage", "Firestore", "SQL"],
    repo: "https://github.com/sallam-0/gcp-ecommerce-data-platform",
    imagePrompt:
      "GCP architecture: scrapers → Pub/Sub → Dataflow (dedup, DLQ) → GCS lake → BigQuery warehouse → FastAPI + Firestore. Include analytics layer.",
  },
  {
    title: "E-commerce data warehouse",
    category: "Warehouse · SSIS",
    summary:
      "An end-to-end dimensional data warehouse for retail analytics, built for accurate historical reporting.",
    highlights: [
      "Star-schema modeling for analytical efficiency",
      "ETL pipelines built with SSIS to extract, transform, and load operational data",
      "SCD Type 2 implementation for tracking historical changes accurately",
    ],
    tags: ["SQL Server", "T-SQL", "SSIS", "Star schema", "ETL"],
    repo: "https://github.com/sallam-0/ecommerce-data-warehouse",
    imagePrompt:
      "SSIS ETL from OLTP sources → staging → SQL Server star schema (fact + dim tables) with SCD2 highlighted.",
  },
];

const FILTERS = ["All", "Streaming", "Cloud", "Warehouse", "Big data"] as const;
type Filter = (typeof FILTERS)[number];

function matches(p: Project, f: Filter) {
  if (f === "All") return true;
  return (p.category ?? "").toLowerCase().includes(f.toLowerCase());
}

function DataEngineering() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = useMemo(() => PROJECTS.filter((p) => matches(p, filter)), [filter]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              04 projects · pipelines, lakes, warehouses
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Data engineering</h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Streaming platforms, cloud-native lakes, and dimensional warehouses — the systems that
              move and shape data before anyone sees a dashboard.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition ${
                    filter === f
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
