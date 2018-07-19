import _ from 'ramda';
import { assertEqualArrays, assertEqual } from './helper';

// -- Challenge 1 ------------------------
// Make a function called "words" which
// returns a list of words in a string.
// Use only the split function and
// currying.
console.log('-----------------------------------------------------------');
console.log('CURRY');
const words = _.split(' '); // change this
assertEqualArrays(['one', 'two', 'three'], words('one two three'));

// -- Challenge 2 ------------------------
// Create a function to triple every
// number in a list using only
// _.multiply and _.map.

const tripleList = _.map(_.multiply(3));
assertEqualArrays([3, 6, 9], tripleList([1, 2, 3]));

// -- Challenge 3 ------------------------
// Create a function to find the largest
// number in a list. You can use the
// greater(a,b) function which returns the
// greater of its two inputs. You can do
// this with currying and one of the list
// functions _.map, _.filter, or _.reduce.

const greater = function(a, b) {
  return a > b ? a : b;
};

const max = _.reduce(greater, -Infinity);
assertEqual(9, max([1, -3483, 9, 7, 2]));
assertEqual(-1, max([-21, -3483, -2, -1]));

const newMap = _.curry(function(f, list) {
  const concatList = function(acc, elt) {
    return acc.concat(f(elt));
  };
  return _.reduce(concatList, [], list);
});

console.log(newMap(_.add(3), [1, 2, 3]));
console.log(_.reduce(_.add, 0)([1, 2, 3]));

console.log('All tests pass.');
console.log('-----------------------------------------------------------');
