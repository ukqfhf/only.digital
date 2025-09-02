import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";
import "webpack-dev-server";

type Env = { production?: boolean; development?: boolean };
type Argv = { mode?: "development" | "production"; [k: string]: unknown };

export default function (env: Env = {}, argv: Argv = {}): Configuration {
  const productionBuilded =
    env.production === true || argv.mode === "production";
  const r = (...p: string[]) => path.resolve(process.cwd(), ...p);

  return {
    mode: productionBuilded ? "production" : "development",
    entry: r("src", "main.tsx"),
    output: {
      filename: productionBuilded
        ? "js/bundle.[contenthash:8].js"
        : "js/bundle.js",
      path: r("dist"),
      publicPath: "/",
      clean: true,
      assetModuleFilename: "assets/[hash][ext][query]"
    },
    devtool: productionBuilded ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: false
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: (resourcePath: string) =>
                    resourcePath.endsWith(".module.css"),
                  localIdentName: productionBuilded
                    ? "[hash:base64:6]"
                    : "[name]__[local]__[hash:base64:5]",
                  exportGlobals: true,
                  namedExport: false
                }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource"
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: r("src", "index.html"),
        inject: "body"
      })
    ],
    devServer: {
      static: { directory: r("dist") },
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: 5173,
      open: true,
      client: { overlay: { errors: true, warnings: false } }
    },
    stats: "minimal",
    infrastructureLogging: { level: "warn" }
  };
}
