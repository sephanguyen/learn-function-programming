// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
  presets: ['env']
});

// Import the rest of our application.
// module.exports = require('./curry');
// module.exports = require('./compose');
// module.exports = require('./functor');
// module.exports = require('./io');
//module.exports = require('./fork');
module.exports = require('./monads');
