import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as ProjectCard, r as Reveal } from "./portfolio-D4Dp9aNd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-analytics-Bs-KvGSz.js
var import_jsx_runtime = require_jsx_runtime();
var PROJECTS = [{
	title: "EGX market dashboard",
	category: "Power BI · DAX",
	summary: "A Power BI dashboard served live from the EGX big data pipeline via Simba Hive ODBC, tracking Egyptian Exchange price trends, volume, and computed technical indicators — SMA, EMA, RSI, MACD, and Bollinger Bands.",
	highlights: [
		"Live connection to Hive over Simba ODBC",
		"Technical indicators computed upstream in PySpark and modeled for DAX",
		"Price, volume, and trend views across the EGX universe"
	],
	tags: [
		"Power BI",
		"DAX",
		"Hive",
		"Simba ODBC"
	],
	repo: "https://github.com/sallam-0/egx-bigdata-pipeline",
	imagePrompt: "Power BI dashboard screenshot: EGX tickers with price line, volume bars, RSI/MACD panels, KPI cards."
}, {
	title: "E-commerce analytics layer",
	category: "BigQuery · Insights",
	summary: "Applied analytics built directly into the GCP e-commerce platform, turning warehouse data into pricing and trust signals.",
	highlights: [
		"Price tracking across multiple sites with automated price-change alerts",
		"Seller trust scoring from historical listing and pricing behavior",
		"Sentiment analysis on product reviews feeding back into the trust signal"
	],
	tags: [
		"BigQuery",
		"SQL",
		"Python"
	],
	repo: "https://github.com/sallam-0/gcp-ecommerce-data-platform",
	imagePrompt: "Analytics dashboard: price trend line per product, seller trust score badges, sentiment gauge, alert feed."
}];
function DataAnalytics() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-6 pb-10 pt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.25em] text-primary",
					children: "Dashboards + BI"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-semibold sm:text-5xl",
						children: "Data analytics"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 140,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-muted-foreground",
						children: "Dashboards and applied analytics built on top of the pipelines — turning processed data into decisions."
					})
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-6 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: PROJECTS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
				project: p,
				index: i
			}, p.title))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-xl border border-dashed border-border/70 bg-card/30 p-6 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground",
				children: "More dashboards coming."
			}), " Drop a screenshot into each project's image slot to replace the placeholder."]
		}) })]
	})] });
}
//#endregion
export { DataAnalytics as component };
