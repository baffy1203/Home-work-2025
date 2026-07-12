function articleAccess(req, res, next) {
  console.log("Перевірка доступу до статті...");

  next();
}

module.exports = articleAccess;