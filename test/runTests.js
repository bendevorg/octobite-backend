require('dotenv').config();

//  V1 APIs
require('./v1/auth/register');
require('./v1/auth/signIn');

//  Close connections
require('./utils/closeApp');
