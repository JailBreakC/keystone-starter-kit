const MobileDetect = require('mobile-detect');

module.exports = function(req) {
  const UA = req.headers['user-agent'];
  const md = new MobileDetect(UA);
  return md.mobile();
};
