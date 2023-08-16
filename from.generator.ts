import { from, take } from 'rxjs';

// 这是一个generator函数
function* generateDoubles(seed) {
   let i = seed;
   while (true) { // 这里使用while(true), 表示这是一个执行不完的generator 或者叫做 infinite iterable
     yield i;
     i = 2 * i; // double it
   }
}

// 生成一个generator对象
const iterator = generateDoubles(3);

// from转换
const result = from(iterator).pipe(
  // 这里用到了take操作符，因为iterator对象是一个无限迭代器，故流中的数据项将源源不断;
  // 使用takc拿流中的10个数据流项，并把流完成
  take(10)
);

result.subscribe(x => console.log(x));

// Logs:
// 3
// 6
// 12
// 24
// 48
// 96
// 192
// 384
// 768
// 1536