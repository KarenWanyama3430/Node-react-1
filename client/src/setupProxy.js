const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = app => {
  app.use(
    "/auth/google",
    createProxyMiddleware({ target: "http://localhost:5000" })
  );
  app.use("/api/*", createProxyMiddleware({ target: "http://localhost:5000" }));
};
