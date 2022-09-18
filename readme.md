# Readme

Make your recursive-like functions leave stack overflow.

* Simulate function stack to void stack overflow in recursive-like functions.
* High performance implemented by JavaScript `Map`.


## Install

`npm install --save recursive-free`

## Usage

Write your recursive in `function *`. `yield` means call self.

`recursiveFree` has tow generic types. First for function paramater, also provide after `yeild` expression. Second for function return value, also recevied from `yeild` expression.

> Just consider `yield` is a calling of the function self.

```typescript

import recursiveFree from 'recursive-free'

const rec = recursiveFree<number, string>(function* (num) {
    if (num === 1) {
        return `,${num}`
    }
    return `${yield num - 1},${num}`
})

console.log(
    rec(5)
)

// ,1,2,3,4,5

```

## Example

```typescript
//Call 100000 times. It will throw stack overflow error in normal recursive functions.

import recursiveFree from 'recursive-free'

const rec = recursiveFree<number, void>(function* (num) {
    if (num === 1000000) {
        console.log('finish')
        return
    }
    yield num + 1
})
let t = performance.now()
rec(1)
console.log(`${performance.now() - t}ms`)

//finish
//500ms
```

```typescript
//Fibonacci

import recursiveFree from 'recursive-free'

const rec = recursiveFree<number, number>(function* (n) {
    if (n < 2) {
        return n
    }
    return (yield n - 1) + (yield n - 2)
})

console.log([1, 2, 3, 4, 5, 6, 7, 8].map(ind => rec(ind)).join(','))
//1,1,2,3,5,8,13,21
```

```typescript
//Output result of [1,2,3] X [1,2,3] X [1,2,3]

import recursiveFree from 'recursive-free'

const rec = recursiveFree<{
    num: number
    str: string
}, void>(function* (param) {
    const { str, num } = param
    if (num === 3) {
        console.log(str)
        return
    }
    for (let i of [1, 2, 3]) {
        yield {
            str: `${str},${i}`,
            num: num + 1
        }
    }
})
rec({
    num: 0,
    str: ''
})
```

