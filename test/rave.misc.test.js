// var misc = require('../lib/rave.misc');
// var base = require('../lib/rave.base');
// var Promise = require('bluebird');
// var mocha = require('mocha');
// var chai = require('chai');
// var expect = chai.expect;
// var chaiAsPromised = require('chai-as-promised');
// var dotenv = require('dotenv').config();

// chai.use(chaiAsPromised);

// describe("#Rave misc services test", function() {
//     describe("# rave get fees test", function() {
//         it("should return a 200 response status", async function() {
//             this.timeout(12000);
//             var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://api.ravepay.co");
//             var miscInstance = new misc(ravebase);
//             var payload = {
//                 "PBFPubKey": process.env.PUBLIC_KEY,
//                 "ptype": "2",
//                 "card6": "543889",
//                 "amount": "100",
//                 "currency": "NGN"
//             }
//             miscResp = [];
//             miscInstance.getFee(payload).then(resp => {
//             miscResp = resp;
//             if(resp.status == 'success') {
//                 done();
//             }
//             }).catch(err => {
//                 done(err);
//             })
//         })

//         // it("should return a data object with properties charge_amount, fee, merchantfee, and ravefee", function(done) {
//         //     this.timeout(12000);
//         //     var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://api.ravepay.co");
//         //     var miscInstance = new misc(ravebase);
//         //     var payload = {
//         //         "PBFPubKey": process.env.PUBLIC_KEY,
//         //         "ptype": "2",
//         //         "card6": "543889",
//         //         "amount": "100",
//         //         "currency": "NGN",
                
//         //     }
//         //     var result = miscInstance.getFee(payload).then(resp => {
//         //         return resp.body.data;
//         //     })
//         //     expect(result).to.have.deep.nested.any.keys("charge_amount", "fee", "merchantfee", "ravefee").notify(done);
//         // })
//     })

//     describe("# rave get banks tests", function() {
//         it("should return a 200 response status", async function() {
//             this.timeout(12000);
//             var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://api.ravepay.co");
//             var miscInstance = new misc(ravebase);
//             var payload = {};
//             miscResp = [];
//             miscInstance.getBanks(payload).then(resp => {
//             miscResp = resp;
//             if(resp.statusCode == '200') {
//                 done();
//             }
//             }).catch(err => {
//                 done(err);
//             })
//         })
//     })
// })