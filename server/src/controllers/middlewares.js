const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401);
		res.end();
	}
};
const checkAdmin = (req, res, next) => {
	if (req.user.role == 2) {
		next();
	} else {
		res.status(401);
		res.end();
	}
};
export { checkAuthentication, checkAdmin };
