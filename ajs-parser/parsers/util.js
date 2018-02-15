module.exports = class Util {
  static toCammelCase(str) {
    return str.replace(/-([a-z])/g, (g) => {
      return g[1].toUpperCase();
    });
  }

  static fromCammelCase(str) {
    return str.replace(/([A-Z])/g, (g) => {
      return '-' + g.toLowerCase();
    });
  }
}
