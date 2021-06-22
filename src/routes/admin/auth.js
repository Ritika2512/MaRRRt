const express = require('express');
const { signup, signin} = require('../../controller/admin/auth');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../../validators/auth');
const router = express.Router();

router.post('/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);

module.exports = router;