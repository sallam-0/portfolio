import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as ProjectCard, r as Reveal } from "./portfolio-D4Dp9aNd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-engineering-CAeHBUvm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROJECTS = [
	{
		title: "Real-time fraud detection platform",
		category: "Streaming · CDC",
		summary: "A production-style platform for scoring financial transactions for fraud in real time, built around change-data-capture streaming and dimensional modeling.",
		highlights: [
			"CDC pipeline (Debezium + Kafka) ingesting transactional data from MSSQL",
			"Real-time enrichment, feature engineering, and ML-based fraud scoring with Apache Flink",
			"Batch and streaming ELT orchestrated with Airflow, loading into Snowflake",
			"Dimensional modeling with dbt following Kimball methodology"
		],
		tags: [
			"Python",
			"Kafka",
			"Debezium",
			"Apache Flink",
			"Airflow",
			"dbt",
			"Snowflake",
			"Docker",
			"S3"
		],
		repo: "https://github.com/sallam-0/real-time-fraud-data-warehouse",
		imagePrompt: "MSSQL → Debezium → Kafka → Flink (scoring) → Airflow → Snowflake (dbt star schema). Show CDC + streaming ML."
	},
	{
		title: "EGX big data pipeline",
		category: "Big data · Lambda",
		summary: "A production-grade Lambda-architecture pipeline for Egyptian Exchange market data, processing daily OHLCV batches alongside real-time tick streams.",
		highlights: [
			"Daily OHLCV batches and real-time tick data ingested via Kafka",
			"Medallion lake on HDFS (raw → staging → curated) with PySpark computing SMA, EMA, RSI, MACD, Bollinger Bands",
			"Four Airflow DAGs orchestrating batch ingestion, Spark ETL, Hive view refresh, and streaming",
			"Live Power BI reporting via Simba Hive ODBC"
		],
		tags: [
			"Python",
			"PySpark",
			"Kafka",
			"HDFS",
			"Hive",
			"Airflow",
			"Docker",
			"yfinance",
			"Power BI"
		],
		repo: "https://github.com/sallam-0/egx-bigdata-pipeline",
		imagePrompt: "Lambda architecture: yfinance batch + Kafka stream → HDFS medallion (raw/staging/curated) → Spark → Hive → Power BI. Airflow orchestration."
	},
	{
		title: "GCP e-commerce data platform",
		category: "Cloud · Serverless",
		summary: "A serverless, end-to-end platform on Google Cloud that ingests multi-site e-commerce data for price comparison and seller analytics.",
		highlights: [
			"Streaming ingestion with exact and fuzzy deduplication, dead-letter queues, and incremental loads",
			"GCS data lake feeding a BigQuery warehouse, with FastAPI and Firestore for real-time access",
			"Analytics layer for price tracking, seller trust scoring, sentiment analysis, and automated alerts"
		],
		tags: [
			"Python",
			"Cloud Run",
			"Pub/Sub",
			"Dataflow",
			"BigQuery",
			"Cloud Storage",
			"Firestore",
			"SQL"
		],
		repo: "https://github.com/sallam-0/gcp-ecommerce-data-platform",
		imagePrompt: "GCP architecture: scrapers → Pub/Sub → Dataflow (dedup, DLQ) → GCS lake → BigQuery warehouse → FastAPI + Firestore. Include analytics layer."
	},
	{
		title: "E-commerce data warehouse",
		category: "Warehouse · SSIS",
		summary: "An end-to-end dimensional data warehouse for retail analytics, built for accurate historical reporting.",
		highlights: [
			"Star-schema modeling for analytical efficiency",
			"ETL pipelines built with SSIS to extract, transform, and load operational data",
			"SCD Type 2 implementation for tracking historical changes accurately"
		],
		tags: [
			"SQL Server",
			"T-SQL",
			"SSIS",
			"Star schema",
			"ETL"
		],
		repo: "https://github.com/sallam-0/ecommerce-data-warehouse",
		imagePrompt: "SSIS ETL from OLTP sources → staging → SQL Server star schema (fact + dim tables) with SCD2 highlighted."
	}
];
var FILTERS = [
	"All",
	"Streaming",
	"Cloud",
	"Warehouse",
	"Big data"
];
function matches(p, f) {
	if (f === "All") return true;
	return (p.category ?? "").toLowerCase().includes(f.toLowerCase());
}
function DataEngineering() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => PROJECTS.filter((p) => matches(p, filter)), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-6 pb-10 pt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.25em] text-primary",
					children: "04 projects · pipelines, lakes, warehouses"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-semibold sm:text-5xl",
						children: "Data engineering"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 140,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-muted-foreground",
						children: "Streaming platforms, cloud-native lakes, and dimensional warehouses — the systems that move and shape data before anyone sees a dashboard."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition ${filter === f ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
							children: f
						}, f))
					})
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-6 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
				project: p,
				index: i
			}, p.title))
		}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
			children: "No projects in this category yet."
		})]
	})] });
}
//#endregion
export { DataEngineering as component };
