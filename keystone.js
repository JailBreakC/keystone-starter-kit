// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
const keystone = require('keystone');
const handlebars = require('express-handlebars');
const Helpers = require('./templates/views/helpers');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
const isDev = process.env.NODE_ENV === 'dev' || 'development'
const MONGO_SERVER =  isDev ? '0.0.0.0' : '0.0.0.0';

keystone.init({
  'name': 'cms',
  'brand': 'cms',
  'mongo': `mongodb://${MONGO_SERVER}/autox`,
  'static': 'public',
  'static options': {
    maxAge: isDev ? '0' : '365d',
  },
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': '.hbs',

  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    helpers: new Helpers(),
    extname: '.hbs',
  }).engine,

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
// 此处填写 models 文件夹中的文件名，并且单数变复数。
// 如 IndexPage => index-pages
keystone.set('nav', {
  首页: 'index-pages',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
