export const capitalizeStr = (str) => {
    const [first, ...rest] = str.split("");
    return first.toUpperCase() + rest.join("");
  };