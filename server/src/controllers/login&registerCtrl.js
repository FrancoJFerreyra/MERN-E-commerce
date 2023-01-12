import userMongoContainer from '../daos/userDao.js';
import { sendEmail, mailOptions } from '../msjs/nodemailer.js';
import _loggerW from '../config/winston.js';

const postLogin = async (req, res) => {
	res.send(true);
};

const newUserRegister = async (req, res) => {
	// const full_phone = req.body.full_phone;
	_loggerW.info(`User name: ${req.body.username}`);
	console.log(req.body, 'BODY');
	const user = { ...req.body, role: 1 };
	console.log(user);
	const saveUser = await userMongoContainer.saveNewUser(user);
	if (saveUser == true) {
		mailOptions.subject = 'Nuevo registro';
		mailOptions.html = `
  <table>
    <thead>
          <tr>
            <th class="col">avatar</th>
            <th class="col">Email</th>
            <th class="col">Direccion</th>
            <th class="col">userName</th>
            <th class="col">lastname</th>
            <th class="col">age</th>
            <th class="col">phone</th>
            <th class="col">role</th>
          </tr>
    </thead>
      <tr>
        <td><img src="${user.avatar}" width="40" height="40"></td>
        <td>${user.email}</td>
        <td>${user.direction}</td>
        <td>${user.username}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
      </tr>
    </table>
    `;
		sendEmail(mailOptions);
		res.send(true);
	} else {
		res.status(409);
		res.send(saveUser);
	}
};

const logout = (req, res) => {
	req.session.destroy();
	res.end();
};
export { postLogin, newUserRegister, logout };
