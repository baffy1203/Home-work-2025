function validateUserInput(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Missing required fields: username and password",
        });
    }

    next();
}

export default validateUserInput;