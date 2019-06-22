'use strict';

const LockError = require('../../lib/lock-error');

module.exports = {
  /**
   * await ctx.acquire(resource, maxLocker, ttl)锁
   * @param {String} resource 需要锁住的资源名称
   * @param {Number} maxLocker 锁的最大大小，为1则代表资源同步锁
   * @param {Number} ttl 锁的最大存活时间，每一次更新锁都会新设置超时
   */
  async acquire(resource, maxLocker, ttl) {
    const config = this.app.config.locker;
    ttl = ttl || config.ttl || 10;
    this.lockerParams = { ttl };
    const satrt = new Date().getTime();
    const locker = this.app.locker;
    return new Promise((resolve, reject) => {
      if (!resource || maxLocker <= 0) reject(new LockError('Parameter passing error: resource is not be undefine or maxLocker shoul be greater than zero'));
      function attempt() {
        return locker.lock(resource, maxLocker, ttl, (err, status) => {
          if (err) return reject(err);
          if (status) return resolve(status);
          const now = new Date().getTime();
          if (now - satrt > config.timeout) return reject(new LockError(`timeout for ${Math.floor(config.timeout / 1000)}s error: after ${Math.floor(config.timeout / 1000)}s, this ctx unable get lock`));
          return setTimeout(attempt, config.retryLater);
        });
      }
      return attempt();
    });
  },
  /**
   * await ctx.lock(resource, maxLocker, ttl)锁
   * @param {String} resource 需要锁住的资源名称
   * @param {Number} maxLocker 锁的最大大小，为1则代表资源同步锁
   * @param {Number} ttl 锁的最大存活时间，每一次更新锁都会新设置超时
   */
  async lock(resource, maxLocker, ttl = 10) {
    return await this.acquire(resource, maxLocker, ttl);
  },
  /**
   * await ctx.unlock(resource) 减少锁大小
   * @param {String} resource 需要解锁的资源名称
   */
  async unlock(resource) {
    const locker = this.app.locker;
    const ttl = this.lockerParams.ttl;
    await locker.unlock(resource, ttl);
  },
  /**
   * await ctx.unlock(resource) 减少锁大小
   * @param {String} resource 需要解锁的资源名称
   */
  async release(resource) {
    return await this.unlock(resource);
  },
};
