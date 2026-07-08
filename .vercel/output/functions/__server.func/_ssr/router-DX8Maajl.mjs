import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DX8Maajl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BKdZau0e.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Ahmed Sallam — Data Engineer" },
			{
				name: "description",
				content: "Ahmed Sallam builds streaming pipelines, cloud data platforms, and dimensional warehouses — Kafka, Flink, Airflow, dbt, GCP, and Power BI."
			},
			{
				name: "author",
				content: "Ahmed Sallam"
			},
			{
				property: "og:title",
				content: "Ahmed Sallam — Data Engineer"
			},
			{
				property: "og:description",
				content: "Streaming CDC platforms, cloud-native lakehouses, and dimensional warehouses. Based in Cairo."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function SiteNav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const linkCls = "text-sm text-muted-foreground transition hover:text-foreground";
	const activeCls = "text-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-40 w-full transition ${scrolled ? "border-b border-border/60 bg-background/70 backdrop-blur-xl" : "border-b border-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "group flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-7 w-7 place-items-center rounded-md bg-primary/15 font-mono text-xs font-semibold text-primary ring-1 ring-primary/30",
						children: "AS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tracking-tight",
						children: "Ahmed Sallam"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-md border border-border px-3 py-1.5 text-xs md:hidden",
					onClick: () => setOpen((v) => !v),
					"aria-expanded": open,
					children: open ? "Close" : "Menu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: linkCls,
							activeProps: { className: activeCls },
							activeOptions: { exact: true },
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/data-engineering",
							className: linkCls,
							activeProps: { className: activeCls },
							children: "Data engineering"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/data-analytics",
							className: linkCls,
							activeProps: { className: activeCls },
							children: "Data analytics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:ahmedalasallam@gmail.com",
							className: "inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:opacity-90",
							children: "Get in touch"
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/60 bg-background/95 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						onClick: () => setOpen(false),
						className: linkCls,
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/data-engineering",
						onClick: () => setOpen(false),
						className: linkCls,
						children: "Data engineering"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/data-analytics",
						onClick: () => setOpen(false),
						className: linkCls,
						children: "Data analytics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:ahmedalasallam@gmail.com",
						className: linkCls,
						children: "Email"
					})
				]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Ahmed Sallam · Cairo, Egypt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "hover:text-foreground",
						href: "https://github.com/sallam-0",
						target: "_blank",
						rel: "noopener",
						children: "GitHub"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "hover:text-foreground",
						href: "https://www.linkedin.com/in/ahmedsallam109/",
						target: "_blank",
						rel: "noopener",
						children: "LinkedIn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "hover:text-foreground",
						href: "mailto:ahmedalasallam@gmail.com",
						children: "Email"
					})
				]
			})]
		})
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		})
	});
}
var $$splitComponentImporter$2 = () => import("./data-engineering-CAeHBUvm.mjs");
var Route$2 = createFileRoute("/data-engineering")({
	head: () => ({ meta: [
		{ title: "Data engineering — Ahmed Sallam" },
		{
			name: "description",
			content: "Data engineering projects: streaming CDC platforms, cloud-native lakehouses, and dimensional warehouses with Kafka, Flink, Airflow, dbt, GCP, and SSIS."
		},
		{
			property: "og:title",
			content: "Data engineering — Ahmed Sallam"
		},
		{
			property: "og:description",
			content: "Streaming platforms, cloud data lakes, and dimensional warehouses — the systems behind the dashboards."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./data-analytics-Bs-KvGSz.mjs");
var Route$1 = createFileRoute("/data-analytics")({
	head: () => ({ meta: [
		{ title: "Data analytics — Ahmed Sallam" },
		{
			name: "description",
			content: "Dashboards and applied analytics: EGX Power BI market dashboard and the GCP e-commerce analytics layer."
		},
		{
			property: "og:title",
			content: "Data analytics — Ahmed Sallam"
		},
		{
			property: "og:description",
			content: "Dashboards and applied analytics on top of the pipelines — turning processed data into decisions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-CKyqGo3q.mjs");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var DataEngineeringRoute = Route$2.update({
	id: "/data-engineering",
	path: "/data-engineering",
	getParentRoute: () => Route$3
});
var DataAnalyticsRoute = Route$1.update({
	id: "/data-analytics",
	path: "/data-analytics",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	DataAnalyticsRoute,
	DataEngineeringRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
