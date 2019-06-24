'use strict';

/**
 * egg-bt-egg-redlock default config
 * @member Config#locker
 * @property {String} SOME_KEY - some description
 */
exports.locker = {
  name: '',
  retryLater: 20, // 没有获取到锁的时候，过多长时间再次尝试获取锁，单位: ms
  timeout: 60000, // 超过多长时间没有获取到锁，则获取锁失败, 单位: ms
  ttl: 10, // 锁的超时时间, 单位: s
};
