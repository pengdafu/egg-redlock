'use strict';

const assert = require('assert');
const getCommands = require('../../lib');
const Locker = Symbol('Application#Locker');

module.exports = {
  get locker() {
    if (!this[Locker]) {
      const { name } = this.config.locker;
      const redis = name ? this.redis.get(name) : this.redis;
      assert(redis, `redis instance [${name}] not exists`);
      const commands = getCommands();
      commands.forEach(({ name, options }) => {
        redis.defineCommand(name, options);
      });
      this[Locker] = redis;
    }
    return this[Locker];
  },
};
