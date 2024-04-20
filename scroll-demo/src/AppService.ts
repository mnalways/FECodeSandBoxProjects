export function getContent(offset, num) {
  console.log("offset", offset);
  console.log("num content", num);

  let arr = [];
  for (var i = offset; i < offset + num; i++) {
    arr.push(i);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arr);
      // reject("failed");
    }, Math.random() * 2000);
  });
}
