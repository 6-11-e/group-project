//Check if user is permitted to access the account
let roleCheck = (...roles) => {
    //Check if supplied (user) role is present in params
    let permittedRoles = role => roles.indexOf(role) > -1;

    //Return middleware
    return (req, res, next) => {
        if(req.user && permittedRoles(req.user.group)) {
            next();
        } else {
            let msg = {
                status: "error",
                message: "Not authorized. Since this is used for admin role checking as well, likely want to direct user to /404 route"
            }
            res.status(403).json(msg);
        }
    } 
}

module.exports = roleCheck;