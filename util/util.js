module.exports = {
  extend: function (target, source, flag) {
    for (let key in source) {
      source.hasOwnProperty(key) &&
        flag
          ? (target[key] = source[key])
          : (target[key] === void 0 && (target[key] = source[key]))
    }
    return target
  }
}
