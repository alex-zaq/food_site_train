const log = function (a, b, ...rest) {
  console.log(a, b, rest);
}


log('basic','rest','a','b','c')

function calcOrDouble(number, basis = 2) {
  // basis = basis || 2; 
  console.log(number * basis);
}

calcOrDouble(3);

