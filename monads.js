import _ from 'ramda';

import { Maybe, Identity, IO, Either, Future } from 'ramda-fantasy';
import {
  inspectIt,
  assertEqual,
  assertDeepEqual,
  getPost,
  getComments,
  trim,
  safeGet,
  safeReadFileSync,
  log
} from './helper';
import fs from 'fs';

const Left = Either.Left;
const Right = Either.Right;
const runIO = IO.runIO;

console.log('-----------------------------------------------------------');
console.log('MONADS');

// Exercise 1
// ==========
// Use safeGet and mjoin or chain to safetly get the street name
console.log('--------Start exercise 1--------');

const user = {
  id: 2,
  name: 'Albert',
  address: { street: { number: 22, name: 'Walnut St' } }
};

// const ex1 = _.compose(
//   _.unnest,
//   _.map(safeGet('name')),
//   _.unnest,
//   _.map(safeGet('street')),
//   safeGet('address')
// );

const ex1 = _.compose(
  _.chain(safeGet('name')),
  _.chain(safeGet('street')),
  safeGet('address')
);

console.log(ex1(user));

assertDeepEqual(Maybe('Walnut St'), ex1(user));
console.log('exercise 1...ok!');

// Exercise 2
// ==========
// Use monads to get the href, then purely log it.

console.log('--------Start exercise 2--------');

const pureLog = x =>
  IO(() => {
    console.log(x);
    return x;
  });

// const ex2 = _.compose(
//   _.unnest,
//   _.map(pureLog),
//   safeReadFileSync
// );
const ex2 = _.compose(
  _.chain(pureLog),
  safeReadFileSync
);

assertEqual('http://run.jsbin.io/runner', runIO(ex2('protocal.txt')));
console.log('exercise 2...ok!');

// Exercise 3
// ==========
// Use monads to first get the Post with getPost(), then pass it's id in to getComments().
console.log('--------Start exercise 3--------');

// const ex3 = _.compose(
//   _.unnest,
//   _.map(getComments),
//   getPost
// );
const ex3 = _.compose(
  _.chain(getComments),
  getPost
);

ex3(13).fork(log, function(res) {
  console.log(res);
  assertEqual(2, res.length);
  console.log('exercise 3...ok!');
});
