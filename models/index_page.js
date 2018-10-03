const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * IndexPage Model
 * ==========
 */

const IndexPage = new keystone.List('IndexPage', {
  map: {
    name: 'title',
  },
  sortable: true,
});

IndexPage.add({
  title: { type: String },
  describ: { type: String },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

IndexPage.defaultColumns = 'title|20%, describ';
IndexPage.register();
