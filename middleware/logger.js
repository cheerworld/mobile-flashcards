
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action:", action);
  const result = next(action);
  console.log("The state is:", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
