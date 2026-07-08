import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as TypedRole, r as Reveal, t as PipelineFlow } from "./portfolio-D4Dp9aNd.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CKyqGo3q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STACK = [
	{
		name: "Python",
		icon: "python"
	},
	{
		name: "SQL",
		icon: "mysql"
	},
	{
		name: "Kafka",
		icon: "apachekafka"
	},
	{
		name: "Debezium",
		icon: "debezium"
	},
	{
		name: "Apache Flink",
		icon: "apacheflink"
	},
	{
		name: "PySpark",
		icon: "apachespark"
	},
	{
		name: "Airflow",
		icon: "apacheairflow"
	},
	{
		name: "dbt",
		icon: "dbt"
	},
	{
		name: "Snowflake",
		icon: "snowflake"
	},
	{
		name: "BigQuery",
		icon: "googlecloud"
	},
	{
		name: "GCP",
		icon: "googlecloud"
	},
	{
		name: "Docker",
		icon: "docker"
	},
	{
		name: "Power BI",
		icon: "powerbi"
	}
];
function Index() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copyEmail = async () => {
		await navigator.clipboard.writeText("ahmedalasallam@gmail.com");
		setCopied(true);
		setTimeout(() => setCopied(false), 1800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden pt-20 pb-16 sm:pt-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-6xl px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-[0.25em] text-primary",
								children: "Data engineer · Cairo, Egypt"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 80,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl",
									children: [
										"I build ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: "reliable data systems"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"for ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedRole, {})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 160,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
									children: [
										"I'm ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: "Ahmed Sallam"
										}),
										". I turn raw, messy data into pipelines and warehouses teams can trust — from CDC streaming platforms and cloud-native lakehouses to dimensional warehouses and BI dashboards."
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 220,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/data-engineering",
											className: "inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90",
											children: "View engineering projects →"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/data-analytics",
											className: "inline-flex items-center rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary",
											children: "See dashboards"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: copyEmail,
											className: "inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary",
											children: copied ? "Copied ✓" : "Copy email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://github.com/sallam-0",
											target: "_blank",
											rel: "noopener",
											className: "text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
											children: "GitHub"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://www.linkedin.com/in/ahmedsallam109/",
											target: "_blank",
											rel: "noopener",
											className: "text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
											children: "LinkedIn"
										})
									]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative w-full max-w-[320px] shrink-0 md:w-[400px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 300,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-[420px] w-full md:h-[480px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-0 left-0 right-0 top-16 overflow-hidden rounded-2xl bg-card border border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/profile.png",
									alt: "Ahmed Sallam",
									className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-full object-cover object-bottom drop-shadow-2xl"
								})]
							})
						})
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative w-full overflow-hidden border-y border-border/60 bg-card/30 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 z-10 w-24 h-full bg-gradient-to-r from-background to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 z-10 w-24 h-full bg-gradient-to-l from-background to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max animate-marquee items-center",
					children: [...STACK, ...STACK].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-3 px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `https://cdn.simpleicons.org/${s.icon}/a1a1aa`,
							alt: s.name,
							className: "h-6 w-6 opacity-70 transition hover:opacity-100"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-muted-foreground transition hover:text-foreground",
							children: s.name
						})]
					}, `${s.name}-${i}`))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: "How I think about data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden font-mono text-xs text-muted-foreground sm:block",
					children: "raw → reliable"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineFlow, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-6 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-6 text-2xl font-semibold sm:text-3xl",
				children: "Explore the work"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/data-engineering",
						className: "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 transition hover:border-primary/50 hover:bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] uppercase tracking-widest text-primary",
										children: "04 projects"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 text-2xl font-semibold",
										children: "Data engineering"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "CDC streaming platforms, cloud-native lakehouses, and dimensional warehouses — Kafka, Flink, Airflow, dbt, GCP, and SSIS."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary",
								children: ["View projects", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/data-analytics",
						className: "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 transition hover:border-primary/50 hover:bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] uppercase tracking-widest text-primary",
										children: "Dashboards + BI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 text-2xl font-semibold",
										children: "Data analytics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "Market dashboards and applied analytics on top of the pipelines — Power BI, DAX, and real-world business signals."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary",
								children: ["View dashboards", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "transition-transform group-hover:translate-x-1",
									children: "→"
								})]
							})
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "contact",
			className: "mx-auto max-w-6xl px-6 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 to-card/40 p-8 sm:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.25em] text-primary",
						children: "Get in touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-semibold sm:text-4xl",
						children: "Open to data engineering roles — Cairo & remote."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Fastest way to reach me is email or LinkedIn. I reply within a day."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:ahmedalasallam@gmail.com",
								className: "inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90",
								children: "ahmedalasallam@gmail.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.linkedin.com/in/ahmedsallam109/",
								target: "_blank",
								rel: "noopener",
								className: "inline-flex items-center rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary",
								children: "LinkedIn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: copyEmail,
								className: "inline-flex items-center rounded-md border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary",
								children: copied ? "Copied ✓" : "Copy email"
							})
						]
					})
				]
			}) })
		})
	] });
}
//#endregion
export { Index as component };
