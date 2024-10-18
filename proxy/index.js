import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

config();

const PORT = process.env.PORT;
const domain = process.env.ACCUWEATHER_DOMAIN;
const apikey = process.env.ACCUWEATHER_API_KEY;
const app = express();

app.use(cors());

const proxyMiddleware = createProxyMiddleware({
  target: domain,
  changeOrigin: true,
  pathRewrite(path) {
    const prefix = path.includes("?") ? "&" : "?";
    return path + prefix + `apikey=${apikey}`;
  },
});

app.use("/api", proxyMiddleware);

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
