// var dotenv = require('dotenv').config()

// var accountNumber  = require('../lib/rave.virtualAccountNumber');
// var base = require('../lib/rave.base');
// var Promise = require('bluebird');
// var mocha = require('mocha');
// var chai = require('chai');
// var expect = chai.expect;
// var chaiAsPromised = require('chai-as-promised');



// chai.use(chaiAsPromised);

// describe("#Rave Virtual Account Test", function () {

   
//     var public_key = process.env.PUBLIC_KEY;
//     var secret_key = process.env.SECRET_KEY;
//     var production_flag = process.env.PRODUCTION_FLAG;
//     var ravebase = new base(public_key, secret_key, production_flag);
//     var accountNumberInstance = new accountNumber (ravebase);

 

//         describe("#Rave Create Virtual Account Number test", function () {
//             it("should return status 'success'",async function () {
//                 this.timeout(15000);
//                 var payload = {
//                     "email": "user@example.com",
//                     "seckey": secret_key,
//                     "is_permanent": true,
//                     "narration":"New account test"

//                 }
//                 vaccountResp = [];
//                 accountNumberInstance.accountNumber(payload).then(resp => {
//                 vaccountResp = resp;
//                 if(resp.status == 'success') {
//                     done();
//                 }
//                 }).catch(err => {
//                     done(err);
//                 })
//             });
//         });
//     });


    