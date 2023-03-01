var card = require("../lib/rave.card");
var base = require("../lib/rave.base");
var Promise = require("bluebird");
var mocha = require("mocha");
var chai = require("chai");
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
var dotenv = require("dotenv").config();

const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe("#Rave Card Charge Test", () => {
  const public_key = process.env.PUBLIC_KEY;
  const secret_key = process.env.SECRET_KEY;
  const RaveBase = new base(
    public_key,
    secret_key,
    process.env.PRODUCTION_FLAG
  );
  let chargeInstance;
  let chargeStub;

  beforeEach(() => {
    chargeInstance = new card(RaveBase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should charge a card", async function () {
    this.timeout(10000);

    const chargeStub = sinon.stub(chargeInstance, "charge").resolves({
      body: {
        status: "success",
        message: "AUTH_SUGGESTION",
        data: { suggested_auth: "PIN" },
      },
    });

    const payload = {
      cardno: "5399838383838381",
      cvv: "470",
      expirymonth: "10",
      expiryyear: "31",
      currency: "NGN",
      country: "NG",
      amount: "10",
      email: "tester@flutter.co",
      phonenumber: "08056552980",
      firstname: "temi",
      lastname: "desola",
      txRef: "MC-7663-Yj",
    };

    var resp = await chargeInstance.charge(payload);
    expect(resp.body).to.have.property("status", "success");
    expect(resp.body).to.have.property("message", "AUTH_SUGGESTION");
    expect(resp.body.data.suggested_auth).to.equal("PIN");
    expect(chargeStub).to.have.been.calledOnce;
    expect(chargeStub).to.have.been.calledOnceWith(payload);
  });
  it("should return an error if the user passes wrong card details", async function () {
    this.timeout(10000);

    const chargeStub = sinon.stub(chargeInstance, "charge").resolves({
      body: {
        status: "error",
        message: "This is a test environment, only test cards can be used",
        data: {
          code: "CARD_ERR",
          message: "This is a test environment, only test cards can be used",
        },
      },
    });

    const payload = {
      cardno: "5399838383838380",
      cvv: "470",
      expirymonth: "10",
      expiryyear: "31",
      currency: "NGN",
      country: "NG",
      amount: "10",
      email: "tester@flutter.co",
      phonenumber: "08056552980",
      firstname: "temi",
      lastname: "desola",
      txRef: "MC-7663-Yj",
    };

    var resp = await chargeInstance.charge(payload);
    expect(resp.body).to.have.property("status", "error");
    expect(resp.body).to.have.property(
      "message",
      "This is a test environment, only test cards can be used"
    );
    expect(resp.body.data.code).to.equal("CARD_ERR");
    expect(chargeStub).to.have.been.calledOnce;
    expect(chargeStub).to.have.been.calledOnceWith(payload);
  });
});

// describe("#Rave Card Charge Test", function(){

//     var chargeResp, validationResp;

//     var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
//     var cardInstance = new card(ravebase);

//     describe("# Rave Charge leg test", function() {
//          it("should return a 200 status response", function(done) {
//              this.timeout(10000);
//             var payload = {
//                 "cardno": "5438898014560229",
//                 "cvv": "789",
//                 "expirymonth": "07",
//                 "expiryyear": "31",
//                 "currency": "NGN",
//                 "pin": "3310",
//                 "country": "NG",
//                 "amount": "10",
//                 "email": "tester@flutter.co",
//                 "phonenumber": "08056552980",
//                 "firstname": "temi",
//                 "lastname": "desola",
//                 "IP": "355426087298442",
//                 "txRef": "MC-7663-YU",
//                 "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
//             }

//             chargeResp=[];
//             cardInstance.charge(payload).then(resp => {
//                 chargeResp = resp;
//                 if (resp.statusCode == 200) {
//                     done();
//                 }

//             }).catch(err => {
//                 done(err);
//             })
//     });

//         it("should return a pending validation response", function(done){
//             this.timeout(10000);
//             if (chargeResp.body.data.chargeResponseCode == 02) {
//                 done();
//             }

//         })

//         it("should throw error email is required", function(done) {
//             this.timeout(10000);
//             var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://ravesandboxapi.flutterwave.com");
//             var cardInstance = new card(ravebase);
//             var payload = {
//                 "PBFPubKey": process.env.PUBLIC_KEY,
//                 "cardno": "5438898014560229",
//                 "cvv": "789",
//                 "expirymonth": "07",
//                 "expiryyear": "31",
//                 "currency": "NGN",
//                 "pin": "3310",
//                 "suggested_auth": "PIN",
//                 "country": "NG",
//                 "amount": "90000",
//                 "email": "",
//                 "phonenumber": "08056552980",
//                 "firstname": "Flutterwave",
//                 "lastname": "Developers",
//                 "IP": "355426087298442",
//                 "txRef": "MC-Sept-30",
//                 "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
//             }

//             var result = cardInstance.charge(payload).catch(err => {
//                 return err.message;
//             })

//             expect(result).to.eventually.be.equal("email is required").notify(done);
//         })
//     })
//     // END OF CARD CHARGE TEST
//     describe("#Rave Validation leg test", function(){
//         it("should return a 200 response", function(done){
//             this.timeout(10000);
//             var payload2 = {
//                 "transaction_reference": chargeResp.body.data.flwRef,
//                 "otp": "12345"
//             }

//             validationResp=[];
//             cardInstance.validate(payload2).then(resp => {
//                 validationResp = resp;
//                 if (validationResp.statusCode == 200) {
//                     done();
//                 }

//             }).catch(err => {
//                 done(err);
//             })
//         })
//         it("should return a charge response code of 00", function(done){
//             this.timeout(10000);
//             if (validationResp.body.data.tx.chargeResponseCode == 00) {
//                 done();
//             }
//         })

//         it("should throw error otp is required", function(done) {
//             this.timeout(10000);
//             var payload2 = {
//                 "transaction_reference": chargeResp.body.data.flwRef,
//                 "otp": ""
//             }

//             cardInstance.validate(payload2).then(resp => {

//             }).catch(err => {

//                 if (err.message == "otp is required") {
//                     done();
//                 }
//             })
//         })
//     })
//     // END OF VALIDATE CHARGE TEST
// })
