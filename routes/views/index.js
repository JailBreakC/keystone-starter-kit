const keystone = require('keystone');

exports = module.exports = function (req, res, next) {

  res.templateName = 'index'
  next()
};

exports = module.exports = function (req, res, next) {
  const locals = res.locals;
  /**
   * 设置本地变量
   * 在模板中可以直接使用 {{section}} 来打印变量，或者参与计算
   */
  locals.section = 'contact';

  const IndexPage = keystone.list('IndexPage').model.find().sort('sortOrder');
  IndexPage.exec().then(function (result) {
    res.locals.indexPageList = result;

    /**
     * 这里给返回内容设置模板名。
     * 如果你想渲染 index.hbs 模板则赋值为 index 即可
     * 当检测到移动端时，中间件会自动帮你渲染 index_mobile.hbs
     */
    res.templateName = 'index'
    next();
  }).catch(function (error) {
    next(error);
  });
};
