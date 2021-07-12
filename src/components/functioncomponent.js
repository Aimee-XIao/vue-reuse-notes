export default {
  functional: true,
  render(createElement, { props, listeners, children }) {
    return createElement(
      'button',
      {
        attrs: props,
        on: {
          click: listeners.click
        }
      },
      children
    );
  }
};