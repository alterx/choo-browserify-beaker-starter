module.exports = store;

function store(state, emitter) {
  state.views = {};

  emitter.on("DOMContentLoaded", function() {
    emitter.on("views:add", function({ name, view }) {
      state.views[name] = view;
      emitter.emit(state.events.RENDER);
    });
  });
}
