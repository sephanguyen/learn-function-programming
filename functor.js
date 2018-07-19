import _ from 'ramda';

import { Maybe, Identity } from 'ramda-fantasy';
import { inspectIt, assertEqual, assertDeepEqual, safeGet } from './helper';

// var Maybe = R.ma;
console.log('-----------------------------------------------------------');
console.log('FUNCTOR');
// Exercise 1
// ==========
// Use _.add(x,y) and map(f,x) to make a function that increments a value inside a functor
console.log('--------Start exercise 1--------');

const ex1 = _.map(_.add(1));

assertDeepEqual(Identity(3), ex1(Identity(2)));

console.log('exercise 1...ok!');

// Exercise 2
// ==========
// Use _.head to get the first element of the list
const xs = Identity(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
console.log('--------Start exercise 2--------');

const ex2 = _.map(_.head);

assertDeepEqual(Identity('do'), ex2(xs));
console.log('exercise 2...ok!');

// Exercise 3
// ==========
// Use safeGet and _.head to find the first initial of the user

const user = { id: 2, name: 'Albert' };
console.log('--------Start exercise 3--------');

const ex3 = _.map(
  _.compose(
    _.head,
    safeGet('name')
  )
);
const ex3 = _.compose(
  _.map(_.head),
  safeGet('name')
);
console.log(_.map(_.head)(user));

assertDeepEqual(Maybe('A'), ex3(user));
console.log('exercise 3...ok!');

// Exercise 4
// ==========
// Use Maybe to rewrite ex4 without an if statement
console.log('--------Start exercise 4--------');

const ex4 = _.compose(
  Maybe,
  parseInt
);

assertDeepEqual(Maybe(4), ex4('4'));
console.log('exercise 4...ok!');
