import { Router } from 'express';
import userController from '../../controllers/user.controller';
import tryCatch from '../../middleweres/trycatch/tryCatch.middlewere';
import { authenticate } from '../../middleweres/authPassport/authPassport';

const router: Router = Router();

// @route   get api/user/actevate/'id'
// @desc    Send user data if access token is valid. Returns name, email, id and email confirmation field.
// @access  Private
router.get('/', authenticate, tryCatch(userController.getUserData.bind(userController)));
// @route   get api/user/actevate/'id'
// @desc    matches activation token, if success sets confimation of email true
// @access  Public
router.get('/activate/:id', tryCatch(userController.activate.bind(userController)));
// @route   PUT api/user/
// @desc    Change's users password by validating the old password, if success the new password will be set.
// @access  Private
router.put('/', authenticate, tryCatch(userController.changePass.bind(userController)));
// @route   POST api/user/register
// @desc    Register user given their email, name and password, returns the token, name and email upon successful registration
// @access  Public
router.post('/register', tryCatch(userController.register.bind(userController)));
// @route   POST api/user/login
// @desc    Login user given their email and password, returns the token, name and email upon successful registration
// @access  Public
router.post('/login', tryCatch(userController.login.bind(userController)));
// @route   POST api/user/request
// @desc    Send's reset password link (with 5 minutes token) to specified email if user with that email exist's.
// @access  Public
router.post('/request', tryCatch(userController.requestPassReset.bind(userController)));
// @route   POST api/user/restore
// @desc    Resets user's password if request token is valid
// @access  Private
router.post('/restore', authenticate, tryCatch(userController.restorePass.bind(userController)));

export default router;
