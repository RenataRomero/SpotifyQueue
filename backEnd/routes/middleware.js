//TokenValidator eventually will check if the token is valid and will refresh it when expired
let tokenValidator = (req, res, next) => {
    
    const user_token = req.header('x-auth-user');

    if(!user_token) {
        res.status(400).send("Session token not found");
    }

    // console.log(JSON.parse(user_token));

    //req.body.access_token = JSON.parse(user_token);
    next();
}

module.exports = {tokenValidator}