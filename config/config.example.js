/*
  Use this file as a template for configuring the 
  HTTP server aspect of the application.

  Rename this file to config.js and update
  the following configuration:
*/

exports.config = {
  hostname: '0.0.0.0',
  port: 8000,
  tls: false,
  cookie_name: 'happy-cookie',
  cookie_password: 'adfkdh3owe90nef0'
};

exports.mailconfig = {
  method: 'sendmail',
  sendmail: {
    bin: '/usr/sbin/sendmail',
	from: '"HappyBox Server" <no-reply@something.com>'
  }
};

//If exports.config.tls == true, then the following tlsconfig is required to be uncommented and filled out properly.
//Keep this commented out if exports.config.tls == false
//var fs = require('fs');
//exports.tlsconfig = {
//  key: fs.readFileSync('/somewhere/fixtures/keys/happybox-key.pem'),
//  cert: fs.readFileSync('/somewhere/fixtures/keys/happybox-cert.pem')
//}
