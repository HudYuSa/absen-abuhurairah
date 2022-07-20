module.exports = (callback) => {
  return function (req, res, next) {
    callback(req, res, next).catch((err) => next(err));
  };
};

// TRYING TO UNDERSTAND CATCHASYNC
// const f1 = (fn)=>{
//     const res = 1
//     const req = 2
//     return fn(req,res)}
// f1()
// const f2= (v1,v2)=>{
//     console.log(v1,v2)}
// f1(f2(req,res))
// f1((v1,v2)=>{
//     console.log(v1,v2)})
// const f3=(req,res)=>{
//     console.log(req+res)}
// f1(f3)
// const f4=(req,res)=>{
//     console.log(req+res*3)
//     return "test"}
// f1(f4)
// const f5=(v1,v2)=>{
//     console.log(v1+v2)
//     return "try"}
// f1(f5)
