import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-D4Dp9aNd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("reveal-in");
					io.unobserve(e.target);
				}
			});
		}, { threshold: .12 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return ref;
}
function Reveal({ children, delay = 0, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: useReveal(),
		className: `reveal ${className}`,
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
var STAGES = [
	{
		label: "Ingest",
		sub: "Kafka · Debezium"
	},
	{
		label: "Process",
		sub: "Flink · Spark · dbt"
	},
	{
		label: "Store",
		sub: "Snowflake · BigQuery · HDFS"
	},
	{
		label: "Serve",
		sub: "Power BI · APIs"
	}
];
function PipelineFlow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between",
			children: STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 items-center gap-4 sm:flex-col sm:items-center sm:text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center gap-4 sm:flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pipe-node relative grid h-10 w-10 place-items-center rounded-full bg-primary/20 ring-1 ring-primary/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-primary" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] uppercase tracking-widest text-muted-foreground",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: s.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs text-muted-foreground sm:block",
							children: s.sub
						})
					] })]
				}), i < STAGES.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative hidden h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-primary/40 sm:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pipe-packet absolute -top-[3px] h-1.5 w-6 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/70",
						style: { animationDelay: `${i * .5}s` }
					})
				})]
			}, s.label))
		})]
	});
}
function TypedRole() {
	const roles = [
		"streaming pipelines.",
		"cloud data platforms.",
		"dimensional warehouses.",
		"analytics that ship."
	];
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [text, setText] = (0, import_react.useState)("");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const current = roles[idx];
		const t = setTimeout(() => {
			if (!deleting) {
				const next = current.slice(0, text.length + 1);
				setText(next);
				if (next === current) setTimeout(() => setDeleting(true), 1400);
			} else {
				const next = current.slice(0, text.length - 1);
				setText(next);
				if (next === "") {
					setDeleting(false);
					setIdx((i) => (i + 1) % roles.length);
				}
			}
		}, deleting ? 35 : 65);
		return () => clearTimeout(t);
	}, [
		text,
		deleting,
		idx
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "caret text-primary",
		children: text
	});
}
function ProjectMedia({ src, alt, prompt }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: "group relative block aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-black/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute bottom-3 right-3 rounded-md bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur",
			children: "Click to enlarge"
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "max-h-[92vh] max-w-[92vw] rounded-lg shadow-2xl"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card/40 p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-widest text-primary",
					children: "Image slot"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm font-medium text-foreground",
					children: "Add pipeline diagram"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-md text-xs text-muted-foreground",
					children: prompt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-[10px] text-muted-foreground",
					children: "Recommended: 1600 × 900 · PNG"
				})
			]
		})]
	});
}
function ProjectCard({ project, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
		delay: index * 60,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 transition hover:border-primary/40 hover:bg-card/70",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 opacity-0 blur-3xl transition group-hover:opacity-100" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectMedia, {
					src: project.image,
					alt: `${project.title} architecture`,
					prompt: project.imagePrompt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [project.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-widest text-primary",
						children: project.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl font-semibold",
						children: project.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: project.repo,
						target: "_blank",
						rel: "noopener",
						className: "shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary",
						children: "Repository ↗"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: project.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-1.5 text-sm",
					children: project.highlights.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-foreground/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h })]
					}, h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex flex-wrap gap-1.5",
					children: project.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md border border-border/70 bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground",
						children: t
					}, t))
				})
			]
		})
	});
}
//#endregion
export { TypedRole as i, ProjectCard as n, Reveal as r, PipelineFlow as t };
