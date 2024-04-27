"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const cors_1 = __importDefault(require("cors"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const API_SERVICE_URL = "https://api.estadisticasbcra.com";
const app = (0, express_1.default)();
const proxyOptions = {
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("X-Added", "proxy-header");
    },
};
app.use((0, cors_1.default)());
app.use("/api", (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
