export type TechKey =
  | "kafka" | "spark" | "airflow" | "dbt" | "snowflake" | "bigquery"
  | "databricks" | "airbyte" | "fivetran" | "docker" | "kubernetes"
  | "terraform" | "python" | "sql" | "postgres" | "mongodb"
  | "great-expectations" | "soda" | "dagster" | "prefect"
  | "looker" | "hex" | "mode" | "aws" | "gcp" | "azure"
  | "kinesis" | "s3" | "avro" | "protobuf" | "json-schema"
  | "monte-carlo" | "elementary" | "datadog" | "mysql" | "spanner"
  | "cockroachdb" | "cassandra" | "dynamodb" | "cosmosdb"
  | "openlineage" | "datahub" | "argo" | "schema-registry";

export const TECH_LABELS: Record<TechKey, string> = {
  kafka: "Kafka", spark: "Spark", airflow: "Airflow", dbt: "dbt",
  snowflake: "Snowflake", bigquery: "BigQuery", databricks: "Databricks",
  airbyte: "Airbyte", fivetran: "Fivetran", docker: "Docker",
  kubernetes: "Kubernetes", terraform: "Terraform", python: "Python",
  sql: "SQL", postgres: "PostgreSQL", mongodb: "MongoDB",
  "great-expectations": "Great Expectations", soda: "Soda",
  dagster: "Dagster", prefect: "Prefect", looker: "Looker",
  hex: "Hex", mode: "Mode", aws: "AWS", gcp: "GCP", azure: "Azure",
  kinesis: "Kinesis", s3: "S3", avro: "Avro", protobuf: "Protobuf",
  "json-schema": "JSON Schema", "monte-carlo": "Monte Carlo",
  elementary: "Elementary", datadog: "Datadog", mysql: "MySQL",
  spanner: "Spanner", cockroachdb: "CockroachDB", cassandra: "Cassandra",
  dynamodb: "DynamoDB", cosmosdb: "Cosmos DB", openlineage: "OpenLineage",
  datahub: "DataHub", argo: "Argo", "schema-registry": "Schema Registry",
};

/** Two-letter monogram used by the inline SVG chip. */
export function techMonogram(key: TechKey): string {
  const label = TECH_LABELS[key];
  const parts = label.split(/[\s-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return label.slice(0, 2).toUpperCase();
}
