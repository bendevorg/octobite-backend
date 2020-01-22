require('dotenv').config();

//  V1 APIs
require('./v1/auth/register');
require('./v1/auth/signIn');
require('./v1/users/addWish');

//  Close connections
require('./utils/closeApp');
