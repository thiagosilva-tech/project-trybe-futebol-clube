import { NextFunction, Request, Response } from 'express';
import validatorLogin from '../utils/validatorLogin';
import JWT from '../utils/JWT';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!validatorLogin.validatorEmail(email) || !validatorLogin.validatorPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }
    let token;
    if (authHeader.includes(' ')) {
      token = authHeader.split(' ').slice(1).join(' ');
    } else {
      token = authHeader;
    }

    const validToken = JWT.verify(token);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    res.locals.token = validToken;
    next();
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validations;
