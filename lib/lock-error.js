'use strict';

class LockError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Lock Error';
  }
}

module.exports = LockError;
