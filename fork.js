import _ from 'ramda';

import { Maybe, Identity, IO, Either, Future } from 'ramda-fantasy';
import { inspectIt, assertEqual, assertDeepEqual } from './helper';
import fs from 'fs';

const Left = Either.Left;
const Right = Either.Right;
const runIO = IO.runIO;

console.log('-----------------------------------------------------------');
console.log('EXERCISE');

var log = function(x) {
  console.log(x);
  return x;
};

// Exercise 1
// ==========
// Use getPost(id) to return a Future of the title of the post ({id: i, title: 'Love them futures'})
console.log('--------Start exercise 1--------');

var ex1 = _.compose(
  _.map(_.prop('title')),
  getPost
);

ex1(3).fork(log, function(title) {
  assertEqual('Love them futures', title);
  console.log('exercise 1..ok!');
});

function getPost(i) {
  return new Future(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: 'Love them futures' });
    }, 300);
  });
}

// Exercise 2
// ==========
// Use ex1 to extend the computation and render the title in a div
console.log('--------Start exercise 2--------');

var render = function(x) {
  return '<div>' + x + '</div>';
};
var ex2 = _.compose(
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

var safeGet = _.curry(function(x, o) {
  return Maybe(o[x]);
});
var user = {
  id: 2,
  name: 'Albert',
  address: { street: { number: 22, name: 'Walnut St' } }
};
var ex5 = _.compose(
  _.map(_.map(safeGet('name'))),
  _.map(safeGet('street')),
  safeGet('address')
);

assertDeepEqual(Maybe(Maybe(Maybe('Walnut St'))), ex5(user));
console.log('exercise 5...ok!');
