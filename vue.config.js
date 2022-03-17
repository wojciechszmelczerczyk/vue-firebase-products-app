const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        querystring: require.resolve("querystring-es3"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        constants: require.resolve("constants-browserify"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url/"),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        assert: require.resolve("assert/"),
      },
    },
  },
});
