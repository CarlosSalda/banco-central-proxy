import express from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import cors from "cors";

const PORT = process.env.PORT ?? 3000;
const API_SERVICE_URL = "https://api.estadisticasbcra.com";

const app = express();

interface ProxyOptionsExtended extends Options {
  onProxyReq?: (
    proxyReq: any,
    req: express.Request,
    res: express.Response
  ) => void;
}

const proxyOptions: ProxyOptionsExtended = {
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader("X-Added", "proxy-header");
  },
};

app.use(cors());
app.use("/api", createProxyMiddleware(proxyOptions));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
