# Rxjs 创建型操作符 from

从数组、类数组的对象、Promise、可迭代对象或类 Observable 的对象创建 Observable。

## type

`from<T>(input: ObservableInput<T>, scheduler?: SchedulerLike): Observable<T>`

### 参数：

input: ObservableInput<T>

订阅对象、Promise、类观察对象、数组、迭代对象或要转换的类数组对象。

scheduler: SchedulerLike

可选的参数，默认值是 `undefined`。 一个 [`SchedulerLike`](https://rxjs.dev/api/index/interface/SchedulerLike)(可以对任务进行排序并按计划执行)。

### Returns

`Observable<T>`: 一个同步将流数据项发出后便立即完成的可观察流.

## 例子 1-数组(常用)

```typescript
import { of } from 'rxjs';

of(10, 20, 30)
  .subscribe({
    next: value => console.log('next:', value),
    error: err => console.log('error:', err),
    complete: () => console.log('the end'),
  });

// Outputs
// next: 10
// next: 20
// next: 30
// the end
```

## 例子 2-可迭代对象 generator 对象

```typescript
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
  // 使用takc拿流中的10个流数据项，并把流完成
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
```

## 例子 3 - 异步计划排期对象 asyncScheduler

```typescript
import { from, asyncScheduler } from 'rxjs';

console.log('start');

const array = [10, 20, 30];
const result = from(array, asyncScheduler);

result.subscribe(x => console.log(x));

console.log('end');

// Logs:
// 'start'
// 'end'
// 10
// 20
// 30
```
