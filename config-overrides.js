const { override, addBabelPlugin } = require('customize-cra');
 
module.exports = override(
  addBabelPlugin('@babel/plugin-transform-optional-chaining'),
  addBabelPlugin('@babel/plugin-transform-nullish-coalescing-operator')
); 