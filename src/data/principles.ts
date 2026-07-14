import type { TechKey } from "./tech";

export type Principle = {
  name: string;
  definition: string;
  tools: TechKey[];
};

export const principles: Principle[] = [
  {
    name: "ACID",
    definition:
      "Transactions are atomic, consistent, isolated, durable — your data never half-updates. Pick the right isolation level or pay in race conditions.",
    tools: ["postgres", "mysql", "spanner", "cockroachdb"],
  },
  {
    name: "CAP",
    definition:
      "In a distributed system, you pick two of: consistency, availability, partition tolerance. When the network splits, what breaks first?",
    tools: ["cassandra", "dynamodb", "cosmosdb", "mongodb"],
  },
  {
    name: "Idempotency",
    definition:
      "Running the same job twice produces the same result. The only reason backfills don't end careers.",
    tools: ["airflow", "dbt", "spark"],
  },
  {
    name: "Schema Evolution",
    definition:
      "Your data shape will change. Backward- and forward-compatible schemas mean nothing breaks — not producers, not consumers, not the marts.",
    tools: ["avro", "protobuf", "json-schema", "schema-registry"],
  },
  {
    name: "Data Lineage",
    definition:
      "If you can't trace a dashboard number back to its source row, you don't have a pipeline — you have a hope.",
    tools: ["openlineage", "datahub", "dbt", "airflow"],
  },
  {
    name: "Observability",
    definition:
      "Logs, metrics, lineage, freshness, volume. You can't love what you can't measure. Alert on the symptom, not the cause.",
    tools: ["monte-carlo", "soda", "elementary", "datadog"],
  },
];
