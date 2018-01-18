const choo = require("choo");
const dynamicViews = require("stores/views");
const store = require("stores/clicks");
const splitRequire = require("split-require");
const { loading } = require("utils");

const app = choo();
if (process.env.NODE_ENV !== "production") {
  app.use(require("choo-devtools")());
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

app.use(store);
app.use(dynamicViews);

app.route("/", require("views/home"));

/*
  It looks like splitRequire doesn't respect aliasify's aliases you wee need to provide the path './views/about'
  
  It also doesn't support dynamic dynamic imports, see https://github.com/goto-bus-stop/split-require/issues/3, so
    ```
    const path = './views/about';
    splitRequire(path, ...)
    ```
  won't work. Because of this, we can't abstract this logic inside a common function to dynamically load the views
  and we'll need to repeat some code here if we add more.
*/

app.route("/about", (state, emit) => {
  const about = state.views.about;
  if (!about)
    splitRequire("./views/about", (err, view) =>
      emit("views:add", { name: "about", view })
    );

  return about ? about(state, emit) : loading();
});

if (!module.parent) app.mount("body");
else module.exports = app;
