/*****************************************************************/
/*****************************************************************/
/******************                               ****************/
/******************  HELPER TO ENCRYPT PASSWORDS  ****************/
/******************                               ****************/
/*****************************************************************/
/*****************************************************************/



// Require process, so we can mock environment variables
var aes256 = require('aes256');

var x;
var passwordToEncrypt = 'psmri123$';//'piramal@123';

var encrypted = aes256.encrypt(typeof x, passwordToEncrypt);
console.log('encrypted');
console.log(encrypted);

var decrypted = aes256.decrypt(typeof x, encrypted);
console.log('decrypted');	
console.log(decrypted);	








