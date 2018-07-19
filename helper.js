import _ from 'ramda';
import fs from 'fs';

import { Maybe, Either, Future, IO } from 'ramda-fantasy';
// TEST HELPERS
// =====================
function inspectIt(x) {
  return (
    (x.inspect && x.inspect()) || (x.toString && x.toString()) || x.valueOf()
  ); //hacky for teachy.
}

function assertEqual(x, y) {
  if (x !== y) {
    throw 'expected ' + x + ' to equal ' + y;
  }
}
function assertDeepEqual(x, y) {
  if (x.val !== y.val)
    throw 'expected ' + inspectIt(x) + ' to equal ' + inspectIt(y);
}

function assertEqualArrays(x, y) {
  if (x.length !== y.length) throw 'expected ' + x + ' to equal ' + y;
  for (var i in x) {
    if (x[i] !== y[i]) {
      throw 'expected ' + x + ' to equal ' + y;
    }
  }
}

function log(x) {
  console.log(x);
  return x;
}

function getPost(i) {
  return new Future(function(rej, res) {
    setTimeout(function() {
      res({ id: i, title: 'Love them futures' });
    }, 300);
  });
}

function getComments(i) {
  return new Future(function(rej, res) {
    setTimeout(function() {
      res(['This class should be illegal', 'Monads are like space burritos']);
    }, 300);
  });
}
var safeGet = _.curry(function(x, o) {
  return Maybe(o[x]);
});

function trim(x) {
  return x.replace('/S{0,}/g', '');
}
const safeReadFileSync = file => IO(() => fs.readFileSync(file, 'utf-8'));

export {
  inspectIt,
  assertEqual,
  assertDeepEqual,
  assertEqualArrays,
  log,
  getPost,
  getComments,
  trim,
  safeGet,
  safeReadFileSync
};
