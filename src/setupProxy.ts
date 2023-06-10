const { createProxyMiddleware } = require('http-proxy-middleware');
export default function setupProxy(app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://protee-be.vercel.app',
            changeOrigin: true,
        })
    );
}