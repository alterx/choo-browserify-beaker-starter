const html = require("choo/html");
require("./style.less");

const TITLE = "About";

module.exports = view;

function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE);

  return html`
    <body class="sans-serif">
      <h1>
        About
      </h1>
    </body>
  `;
}
