import _ from 'ramda';

import { Maybe, Identity, IO, Either, Future } from 'ramda-fantasy';
import {
  inspectIt,
  assertEqual,
  assertDeepEqual,
  log,
  getPost,
  safeGet
} from './helper';
import fs from 'fs';

const Left = Either.Left;
const Right = Either.Right;
const runIO = IO.runIO;

console.log('-----------------------------------------------------------');
console.log('EXERCISE');

// Exercise 1
// ==========
// Use getPost(id) to return a Future of the title of the post ({id: i, title: 'Love them futures'})
console.log('--------Start exercise 1--------');

const ex1 = _.compose(
  _.map(_.prop('title')),
  getPost
);

ex1(3).fork(log, function(title) {
  assertEqual('Love them futures', title);
  console.log('exercise 1..ok!');
});

// Exercise 2
// ==========
// Use ex1 to extend the computation and render the title in a div
console.log('--------Start exercise 2--------');

const render = function(x) {
  return '<div>' + x + '</div>';
};
const ex2 = _.compose(
  _.map(render),
  ex1
);

ex2(3).fork(log, function(html) {
  assertEqual('<div>Love them futures</div>', html);
  console.log('exercise 2...ok!');
});

// Exercise 5*
// ==========
// Use only safeGet() to safely return the street name

console.log('--------Start exercise 5--------');

const user = {
  id: 2,
  name: 'Albert',
  address: { street: { number: 22, name: 'Walnut St' } }
};
const ex5 = _.compose(
  _.map(safeGet('name')),
  _.map(safeGet('street')),
  safeGet('address')
);

assertDeepEqual(Maybe(Maybe(Maybe('Walnut St'))), ex5(user));
console.log('exercise 5...ok!');
