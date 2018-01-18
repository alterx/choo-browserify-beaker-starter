const browserify = require("browserify");
const splitRequire = require("split-require");
const tinyify = require("tinyify");
const fs = require("fs");
const path = require("path");
const bundlePath = path.join(__dirname, "..", "bundles/");

const b = browserify({ entries: ["index.js"] });

b.plugin(splitRequire, {
  public: "bundles",
  dir: bundlePath
});
b.plugin(tinyify);
b.on("split.pipeline", pipeline => {
  tinyify.applyToPipeline(pipeline);
});

b.transform("node-lessify");
b.transform("yo-yoify", { global: true });

b.bundle().pipe(fs.createWriteStream(bundlePath + "bundle.js"));
