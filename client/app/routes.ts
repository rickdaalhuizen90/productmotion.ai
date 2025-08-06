import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("case-study/:slug", "./routes/case-study.tsx")
] satisfies RouteConfig;
