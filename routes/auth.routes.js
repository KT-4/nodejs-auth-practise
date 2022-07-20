const {verifySignUp} = require('../middleware')
const controller = require('../controllers/auth.controllers');

module.exports = (app) => {
    app.use((req,res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-type,Accept"
        );
        next();
    })
    app.post(
        "/api/auth/signup"
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/signin",controller.signin)
}