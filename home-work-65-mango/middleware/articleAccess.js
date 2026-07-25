function articleAccess(req, res, next) {
    console.log("Перевірка доступу до статті...");
    next();
}

export default articleAccess;