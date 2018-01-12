function *factorial(n){
  let accum = 1;
  for (let i=1; i <= n; i++) {
    accum *= i;
    yield accum;
  }
}

for (var n of factorial(5)) {
  console.log(n);
}
// 1, 2, 6, 24, 120
