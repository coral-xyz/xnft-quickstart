const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };

  config.plugins.push(
    // new HtmlWebpackPlugin({
    //   title: "My Web App",
    //   template: "template.thtml",
    //   // this is a workaround for the injection of the code from the output file into the .html
    //   // the injection will be handled in the template file
    //   inject: "body",
    // })
  );

  // console.log(config.plugins.HtmlWebpackPlugin.options.inline = "body");
  // config.plugins[1].options.inline = "body"
  config.optimization.runtimeChunk = false;


  // this is brittle but works for now.
  const loaders = config.module.rules.find(rule => typeof rule.oneOf !== "undefined");
  const urlLoader = loaders.oneOf.find((loader) => typeof loader.use === "object" && loader.use.loader && loader.use.loader.includes("url-loader"));

  urlLoader.use.options.limit = true;
  urlLoader.test = /\.(gif|jpe?g|png|svg|css|woff2?|eot|ttf|otf)$/;

  return config;

};
