'use strict';

const mock = require('egg-mock');

describe('test/bt-egg-redlock.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/bt-egg-redlock-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, locker')
      .expect(200);
  });
});
