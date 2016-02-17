export default () => {
  return (module) => {
    module.addState({
      isLoading: false,
      list: []
    });
  };
};
