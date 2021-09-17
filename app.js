const timer = function () {
  setTimeout(() => {
    console.log(Date.now());
    timer();
  }, 3000);
};
timer()
