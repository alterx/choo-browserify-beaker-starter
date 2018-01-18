const html = require("choo/html");
require("./style.less");

const TITLE = "🚂🚋🚋";

module.exports = view;

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE);

  return html`<body class="sans-serif">
      <h1 class="random">
        Choo choo choooo!
      </h1>

      <div>
        <p>Current number of clicks: ${state.totalClicks}</p>

        <button onclick=${handleClick}>Click Me!</button>
        <a href="/about">About Page!</a>
      </div>
    </body>
  `;

  function handleClick() {
    emit("clicks:add", 1);
  }
}
