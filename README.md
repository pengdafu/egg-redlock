# egg-bt-egg-redlock

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-bt-egg-redlock.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-bt-egg-redlock
[travis-image]: https://img.shields.io/travis/eggjs/egg-bt-egg-redlock.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-bt-egg-redlock
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-bt-egg-redlock.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-bt-egg-redlock?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-bt-egg-redlock.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-bt-egg-redlock
[snyk-url]: https://snyk.io/test/npm/egg-bt-egg-redlock
[download-image]: https://img.shields.io/npm/dm/egg-bt-egg-redlock.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-bt-egg-redlock

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-bt-egg-redlock 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌


## 开启插件

```js
// config/plugin.js
exports.locker = {
  enable: true,
  package: 'egg-redlock',
};
```

## 使用场景

> 当你知道你的数据库可能不能承受很大的并发，但是你的项目却没有一个好的办法去控制请求的并发量，毕竟nodejs是异步IO，这个时候，你需要一个工具，为你的方法添加一个控制并发量的锁。

## Usage

在你的任何Controller或者Service中，都可以很方便的添加锁，以下是一个示例：

```js
// controller/user.js
'use strict';
const { Controller } = require('egg');
class UserController extends Controller {
  async userDo() {
    const { ctx, service } = this;
    await ctx.lock('userDoResource', 300, 10);
    await service.user.userDoSomething();
    await ctx.unlock('userDoResource');
  }
}
module.exports = UserController;

/**
 * ctx.lock(resource, maxLocker, ?ttl)
 *  resource: 资源名称
 *  maxLocker: 最多几个请求可以获取到锁
 *  ?ttl: 可选参数，锁的超时时间
 * 
 * ctx.unlock(resource)
 *  resource: 资源名称
 * /
```

用法就是这么简单，接下来所有路由到 `Userdo` 这个控制器的请求，最多只能有300个请求同时访问业务层的`userDoSomething()` 方法。

> - **`ctx.lock = ctx.acquire`**: 获取锁方法
> - **`ctx.unlock = ctx.release`**: 释放锁方法

## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [issues](https://github.com/pdf0824/egg-redlock/issues) 异步交流。

