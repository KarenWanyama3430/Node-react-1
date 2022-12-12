const util = require("util");

const mongoose = require("mongoose");
const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";
const exec = mongoose.Query.prototype.exec;

const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function (options = {}) {
  this._cache = true;
  this._hashKey = JSON.stringify(options.key || "");
  return this;
};

const clearHash = hashKey => {
  client.del(JSON.stringify(hashKey));
};

mongoose.Query.prototype.exec = async function () {
  if (!this._cache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name
  });
  const cachedValue = await client.hget(this._hashKey, key);
  if (cachedValue) {
    console.log("from redis");
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  const result = await exec.apply(this, arguments);
  client.hset(this._hashKey, key, JSON.stringify(result), "EX", 10);
  console.log("from mongo db");
  return result;
};
module.exports = { clearHash };
