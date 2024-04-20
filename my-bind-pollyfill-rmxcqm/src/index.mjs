let name = {
  fname: "mn",
  lname: "nig",
};

let getName = function (country, state) {
  console.log(this.fname + " " + this.lname + "  " + country + "  " + state);
};

// let x = getName.bind(name, "India");
// x("MP");

// Function.prototype.myBind = function (...arg) {
//     const self = this;
//     let params = arg.slice(1);
//     return function (...args2) {
//         self.call(arg[0], ...params, ...args2);
//     }
// }

Function.prototype.myBind = function (...args) {
  let context = this;
  //   let restArgs = args.slice(1);
  return function (args1) {
    return context.call(...args, args1);
  };
};
let y = getName.myBind(name, "India");
y("MP");

console.log(typeof getName);
