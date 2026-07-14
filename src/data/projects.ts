import type { TechKey } from "./tech";

export type ProjectImage = {
  src: string;
  caption: string;
};

export type Project = {
  title: string;
  slug: string;
  type: "DE" | "DA";
  summary: string;
  description: string;
  architecture: string;
  highlights: string[];
  role: string;
  tech: TechKey[];
  images: ProjectImage[];
  githubUrl: string | null;
  demoUrl: string | null;
};

export const dataEngineeringProjects: Project[] = [
  {
    title: "GCP E-Commerce Data Platform",
    slug: "gcp-platform",
    type: "DE",
    summary:
      "Production-grade pipeline aggregating product data from Amazon, Noon & Jumia — streaming through Pub/Sub, Dataflow, and BigQuery with dbt incremental transforms.",
    description:
      "This platform solves a real-world problem: comparing product prices and metadata across multiple e-commerce marketplaces in near real-time. It scrapes product listings from Amazon, Noon, and Jumia, normalizes the data into a unified schema, streams it into a data warehouse, and transforms it into analytics-ready tables for price comparison, trend analysis, and product intelligence.",
    architecture:
      "Client Request (FastAPI) → BigQuery Cache Check → Scraper Engine (Amazon / Noon / Jumia) → Pub/Sub → Apache Beam / Dataflow → BigQuery + GCS Data Lake → dbt Transform (staging → mart)",
    highlights: [
      "Multi-site concurrent scraping with anti-bot resilience: proxy rotation, browser fingerprint impersonation, CAPTCHA detection",
      "Dual-sink Dataflow pipeline writing to BigQuery (structured) and GCS (raw JSON data lake) simultaneously",
      "Cache-first API design — checks BigQuery for recent results before triggering new scrapes, reducing latency and cost",
      "Incremental dbt mart with merge-based deduplication ensuring one row per product URL with the latest data",
      "Fully containerized deployment: API on Cloud Run, dbt as Cloud Run Job, streaming on Dataflow",
    ],
    role: "Sole data engineer — designed architecture, built scraper engine, streaming pipeline, API service, and dbt transforms.",
    tech: ["python", "gcp", "bigquery", "dbt", "airflow", "docker"],
    images: [
      { src: "/projects/gcp-platform/Data_Pipeline.png", caption: "End-to-end data pipeline architecture" },
    ],
    githubUrl: "https://github.com/sallam-0/gcp-ecommerce-data-platform",
    demoUrl: null,
  },
  {
    title: "Retail Analytics Data Warehouse",
    slug: "ecommerce-ssis",
    type: "DE",
    summary:
      "Star schema data warehouse with SSIS ETL pipelines, SCD Type 2 dimensions, and a 4-page Power BI dashboard covering $57M+ in retail analytics.",
    description:
      "A comprehensive data warehouse solution for retail analytics featuring dimensional modeling, ETL processes using SSIS, and analytical capabilities for sales and returns. The warehouse implements a star schema with 6 dimensions and 2 fact tables, processing millions of transactions with built-in validation, error handling, and auditing.",
    architecture:
      "Source Database (SQL Server) → SSIS ETL Packages (Extract, Transform, Load) → Star Schema DW (6 Dimensions + 2 Facts) → Power BI Dashboard (4 pages)",
    highlights: [
      "Star schema with 6 dimension tables (Date, Customer, Product, Supplier, PaymentMethod, Campaign) and 2 fact tables (Sales, Returns)",
      "SCD Type 2 slowly changing dimensions for Customer and Product — full history tracking",
      "SSIS ETL pipeline with data type conversions, dimension key lookups, validation, and error handling",
      "$57.34M total revenue analyzed across 54K orders and 126K quantity sold",
      "4-page Power BI dashboard: Executive Overview, Sales Deep Dive, Customer Analysis, Returns Profitability",
    ],
    role: "Data engineer — designed dimensional model (Kimball methodology), built SSIS packages, created Power BI dashboard.",
    tech: ["sql", "python"],
    images: [
      { src: "/projects/ecommerce-ssis/SSIS.png", caption: "SSIS ETL package flow" },
      { src: "/projects/ecommerce-ssis/Star_Schema_Diagram.png", caption: "Star schema dimensional model" },
      { src: "/projects/ecommerce-ssis/ERD_Source.png", caption: "Source database ERD" },
    ],
    githubUrl: "https://github.com/sallam-0/ecommerce-data-warehouse",
    demoUrl: null,
  },
  {
    title: "EGX Big Data Pipeline",
    slug: "egx-pipeline",
    type: "DE",
    summary:
      "Lambda-architecture pipeline for the Egyptian Exchange: batch & real-time ingestion via Kafka, Spark ETL with technical indicators, HDFS data lake, and Hive serving layer.",
    description:
      "A production-grade, end-to-end big data pipeline for the Egyptian Exchange (EGX) stock market. The pipeline follows a Lambda Architecture pattern with both batch and streaming ingestion paths that converge in a unified HDFS data lake. It computes 10+ technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands) and serves analytics through Hive tables connected to Power BI via DirectQuery.",
    architecture:
      "yfinance API → Kafka (real-time ticks) + Batch Ingestion → HDFS Data Lake → Spark ETL (technical indicators) → Hive Tables → Power BI DirectQuery",
    highlights: [
      "Lambda Architecture with both batch and streaming paths converging in HDFS",
      "Kafka-based real-time tick ingestion with Spark Structured Streaming consumer",
      "10+ technical indicators computed via PySpark: SMA, EMA, RSI, MACD, Bollinger Bands, ATR, OBV",
      "Airflow DAGs orchestrating daily batch ETL, indicator computation, and Hive table refresh",
      "Fully containerized with Docker Compose: Hadoop, Spark, Kafka, Hive, Airflow — all services in containers",
    ],
    role: "Sole data engineer — designed Lambda architecture, built ingestion, Spark ETL, orchestration, and serving layers.",
    tech: ["kafka", "spark", "airflow", "docker", "python", "sql"],
    images: [
      { src: "/projects/egx-pipeline/egx_architecture_diagram.png", caption: "Lambda architecture diagram" },
    ],
    githubUrl: null,
    demoUrl: null,
  },
  {
    title: "Real-Time Fraud Detection Pipeline",
    slug: "fraud-detection",
    type: "DE",
    summary:
      "End-to-end CDC pipeline: Debezium captures bank transactions → Kafka → Flink enriches & scores with ML in real time → S3 → Snowflake → dbt star schema.",
    description:
      "A production-grade, end-to-end real-time fraud detection pipeline built on modern data engineering principles. The system ingests banking transactions via Change Data Capture (CDC), enriches them with customer and account context from Redis, engineers 30+ fraud features, scores each transaction with a machine learning model in real time, and lands everything into a Snowflake data warehouse modeled as a Kimball star schema for analytics.",
    architecture:
      "MSSQL (CDC) → Debezium → Kafka → Flink (enrichment + ML scoring) → S3 (Parquet) → Airflow (COPY INTO) → Snowflake → dbt (staging → dims → facts)",
    highlights: [
      "Change Data Capture via Debezium capturing every INSERT, UPDATE, DELETE at the row level",
      "Real-time Flink pipeline engineering 30+ fraud features and scoring with ML model",
      "Redis-first dimension lookup with MSSQL fallback for sub-millisecond enrichment",
      "Dual-mode ML training: unsupervised (Isolation Forest) and supervised (XGBoost) with automated feedback loop",
      "Kimball star schema in Snowflake with dbt transformations: staging → dimensions → facts",
    ],
    role: "Sole data engineer — designed CDC architecture, built Flink pipeline, trained ML model, created dbt warehouse.",
    tech: ["kafka", "python", "snowflake", "dbt", "airflow", "docker"],
    images: [
      { src: "/projects/fraud-detection/Pipeline_Flow.gif", caption: "Animated pipeline flow" },
      { src: "/projects/fraud-detection/ML_pipeline.png", caption: "ML training and scoring pipeline" },
      { src: "/projects/fraud-detection/ERD.png", caption: "Data warehouse entity relationship diagram" },
    ],
    githubUrl: null,
    demoUrl: null,
  },
];

export const dataAnalyticsProjects: Project[] = [
  {
    title: "E-Commerce Power BI Dashboard",
    slug: "ecommerce-dashboard",
    type: "DA",
    summary:
      "4-page interactive dashboard on a star-schema warehouse: Executive KPIs ($57M revenue), Sales breakdown, Customer LTV analysis (65% repeat rate), and Returns profitability.",
    description:
      "This dashboard was built on top of the E-Commerce Data Warehouse (SSIS + SQL Server) and provides four analytical pages covering the full business picture — from executive-level KPIs to granular product and customer insights. It surfaces $57.34M in revenue, 54K orders, customer lifetime value of $71.67K, and a 65% repeat purchase rate.",
    architecture:
      "SQL Server Data Warehouse (Star Schema) → Power BI DirectQuery → 4-Page Interactive Dashboard",
    highlights: [
      "$57.34M total revenue analyzed with 30.7% gross margin across 54K orders",
      "Customer LTV of $71.67K with 65% repeat purchase rate — 520 returning vs. 280 new customers",
      "Campaign attribution: $40.09M (70%) of revenue is campaign-attributed",
      "Returns analysis: 5.3% return rate, $1.47M refunds — Wrong Size is #1 driver",
      "Geographic distribution across US, AU, JP, DE, CA, FR, GB markets",
    ],
    role: "Data analyst — designed dashboard layout, built DAX measures, created interactive reports.",
    tech: ["sql", "python"],
    images: [
      { src: "/projects/ecommerce-dashboard/Executive_Page.png", caption: "Executive Overview — KPIs and revenue trends" },
      { src: "/projects/ecommerce-dashboard/Sales_Page.png", caption: "Sales Deep Dive — category, supplier, campaign breakdown" },
      { src: "/projects/ecommerce-dashboard/Customer_Page.png", caption: "Customer Analysis — LTV, retention, geography" },
      { src: "/projects/ecommerce-dashboard/Returns_Page.png", caption: "Returns Profitability — refund impact and root causes" },
    ],
    githubUrl: null,
    demoUrl: null,
  },
  {
    title: "EGX Stock Market Dashboard",
    slug: "egx-dashboard",
    type: "DA",
    summary:
      "4-page Power BI dashboard connected via DirectQuery to a Hive data lake: market overview, symbol detail with Bollinger/MACD/RSI, signals & risk screening, and live ticks.",
    description:
      "A Power BI report consisting of four interactive pages connected via DirectQuery to the Hive data lake from the EGX Big Data Pipeline. It provides real-time market overview, individual symbol analysis with technical indicators (Bollinger Bands, SMA/EMA, MACD, RSI), signal screening with risk assessment, and a live ticker feed.",
    architecture:
      "Hive Data Lake (HDFS) → Power BI DirectQuery → 4-Page Interactive Dashboard (Market Overview, Symbol Detail, Signals & Risk, Live Ticks)",
    highlights: [
      "Market Overview with KPIs, volume ranking, daily movers, and RSI distribution",
      "Symbol Detail page with Bollinger Bands, SMA/EMA overlays, MACD histogram, and RSI gauge",
      "Signals & Risk screening: RSI overbought/oversold alerts, Bollinger width, risk scatter plots",
      "Live Ticks page with real-time market status, intraday charts, and streaming ticker table",
      "DirectQuery connection to Hive for near-real-time data refresh",
    ],
    role: "Data analyst — designed dashboard, built DAX measures for technical indicators, created interactive visuals.",
    tech: ["sql", "python"],
    images: [
      { src: "/projects/egx-dashboard/market_overview.png", caption: "Market Overview — KPIs, volume, daily movers" },
      { src: "/projects/egx-dashboard/symbol_detail.png", caption: "Symbol Detail — Bollinger, SMA/EMA, MACD, RSI" },
      { src: "/projects/egx-dashboard/signals&risk.png", caption: "Signals & Risk — RSI screening, risk scatter" },
      { src: "/projects/egx-dashboard/live_ticks.png", caption: "Live Ticks — real-time market feed" },
    ],
    githubUrl: null,
    demoUrl: null,
  },
];

export const allProjects = [...dataEngineeringProjects, ...dataAnalyticsProjects];
