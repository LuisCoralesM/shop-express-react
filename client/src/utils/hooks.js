// Set state by input, events
export const setState = (stateReact) => (e) =>
  stateReact((prev) => ({ ...prev, [e.target.name]: e.target.value }));