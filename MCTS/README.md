# Monte-carlos

## Explanation

#### How to check a winner

A board is represented by an array of 0
If I fill one of the board, I add 1
If the opponent fill one, I add -1

```js
const boardPrototype = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
```

For checking the board if I have win, I will create a version for each winning possibilities: diagonals, horizontal, vertical.

So I will create another board but this time I will add 2 columns at the end and one at the bottom for not playing too much with the indexes.

```js
const checkPrototype = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
```

- Vertical Example

For understanding, the checking systems, I will take a simple example. Let say the board is in this situation:

```js
const boardPrototype = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
];
```

The checking board on the vertical checking will end up like this:

```js
const checkPrototype = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0],
];
```

I have found a cell with a 4, it means there is 4 coins aligned vertically.

- Horizontal example:

```js
const boardPrototype = [
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
```

The checking board on the vertical checking will end up like this:

```js
const checkPrototype = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
```

- Diagonal example:

```js
const boardPrototype = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
```

The checking board on the vertical checking will end up like this:

```js
const checkPrototype = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0],
  [0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 4, 0],
];
```

- Right Diagonal example:

```js
const boardPrototype = [
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0],
];
```

The checking board on the vertical checking will end up like this:

```js
const checkPrototype = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 2, 0, 0],
  [0, 0, 3, 0, 0, 0],
  [0, 4, 0, 0, 0, 0],
];
```
