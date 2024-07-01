export function useInput() {
  const onKeyDownBreakLineOnEnter = (e, value, callback) => {
    if (e.keyCode === 13) {
      callback(value + "\n");
      e.preventDefault();
    }
  };

  return { onKeyDownBreakLineOnEnter };
}
