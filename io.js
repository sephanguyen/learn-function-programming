import _ from 'ramda';

import { Maybe, Identity, IO, Either } from 'ramda-fantasy';
import {
  inspectIt,
  assertEqual,
  assertDeepEqual,
  log,
  safeReadFileSync
} from './helper';

const Left = Either.Left;
const Right = Either.Right;
const runIO = IO.runIO;

console.log('-----------------------------------------------------------');
console.log('IO');

// Exercise 1
// ==========
// Write a function that uses checkActive() and showWelcome() to grant access or return the error
console.log('--------Start exercise 1--------');

const showWelcome = _.compose(
  _.add('Welcome '),
  _.prop('name')
);

const checkActive = function(user) {
  return user.active ? Right(user) : Left('Your account is not active');
};

const ex1 = _.compose(
  _.map(showWelcome),
  checkActive
);

assertDeepEqual(
  Left('Your account is not active'),
  ex1({ active: false, name: 'Gary' })
);
assertDeepEqual(
  Right('Welcome Theresa'),
  ex1({ active: true, name: 'Theresa' })
);
console.log('exercise 1...ok!');

// Exercise 2
// ==========
// Write a validation function that checks for a length > 3. It should return Right(x) if it is greater than 3 and Left("You need > 3") otherwise
console.log('--------Start exercise 2--------');

const ex2 = function(x) {
  //   return "TODO: write me";
  return _.length(x) > 3 ? Right(x) : Left('You need > 3');
};

assertDeepEqual(Right('fpguy99'), ex2('fpguy99'));
assertDeepEqual(Left('You need > 3'), ex2('...'));
console.log('exercise 2...ok!');

// Exercise 3
// ==========
// Use ex2 above and Either as a functor to save the user if they are valid

const save = function(x) {
  console.log('SAVED USER!');
  return x;
};

const ex3 = _.compose(
  _.map(save),
  ex2
);

console.log('--------Start exercise 3--------');
assertDeepEqual(Right('fpguy99'), ex3('fpguy99'));
assertDeepEqual(Left('You need > 3'), ex3('duh'));
console.log('exercise 3...ok!');

// Exercise 4
// ==========
// Get the text from the input and strip the spaces
console.log('--------Start exercise 4--------');

const stripSpaces = function(s) {
  return s.replace(/\s+/g, '');
};

const ex4 = _.compose(
  _.map(stripSpaces),
  safeReadFileSync
);

assertEqual('honkeytonk', runIO(ex4('text.txt')));
console.log('exercise 4...ok!');

// Exercise 5
// ==========
// Use getHref() / getProtocal() and runIO() to get the protocal of the page.

const getProtocal = _.compose(
  _.head,
  _.split('/')
);
const ex5 = _.compose(
  _.map(getProtocal),
  safeReadFileSync
);

console.log('--------Start exercise 5--------');
assertEqual('http:', runIO(ex5('protocal.txt')));
console.log('exercise 5...ok!');

// Exercise 6*
// ==========
// Write a function that returns the Maybe(email) of the User from getCache(). Don't forget to JSON.parse once it's pulled from the cache so you can _.get() the email

// setup...
const localStorage = {
  user: JSON.stringify({ email: 'george@foreman.net' })
};

const getCache = x => IO(() => Maybe(localStorage[x]));

const getStringEmail = _.compose(
  _.prop('email'),
  JSON.parse
);
const ex6 = _.compose(
  _.map(_.map(getStringEmail)),
  getCache
);
assertDeepEqual(Maybe('george@foreman.net'), runIO(ex6('user')));
console.log('exercise 6...ok!');
