export const getNumbers = (from, offset) => {
  const res = [];
  for (let i = from; i < from + offset; i++) {
    res.push(i);
  }
  return res;
};
