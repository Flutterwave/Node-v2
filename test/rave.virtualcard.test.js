var dotenv = require('dotenv').config()

var virtualcards = require('../lib/rave.virtualcards');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Virtual Card Test", function () {

    var virtualcardResp;
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var card_id = process.env.CARD_ID

    var ravebase = new base(public_key, secret_key, production_flag);
    var virtualcardInstance = new virtualcards(ravebase);

    describe("#Rave create virtual card test", function () {
        it("should return 'card created sucecessfully ' message ", async function () {
            this.timeout(15000);
            var payload = {
                "secret_key": secret_key ,
                "currency": "USD",
                "amount": "10",
                "billing_name": "Flutterwave Developers",
                "billing_address": "DREAM BOULEVARD",
                "billing_city": "ADYEN",
                "billing_state": "NEW LANGE",
                "billing_postal_code": "293094",
                "billing_country": "US",
                "callback_url": "https://your-callback-url.com/"
            }
            virtualcardResp = [];
            virtualcardInstance.create(payload).then(resp => {
            virtualcardResp = resp;
            if(resp.message == 'Card created successfully') {
                done();
            }
            }).catch(err => {
                done(err);
            })
        });

        describe("#Rave List virtual card test", function () {
            it("should return 'pass if the request was successful ", async function () {
                this.timeout(15000);
                var payload = {
                    "secret_key": secret_key ,
                    "page": 1
                }
                virtualcardResp = [];
                virtualcardInstance.list(payload).then(resp => {
                virtualcardResp = resp;
                if(resp.status == 'success') {
                    done();
                }
                }).catch(err => {
                    done(err);
                })
            });




        });
        describe("#Rave Get virtual card test", function () {
            it("should return ID:xxxxxxxx", function (done) {
                this.timeout(15000);
                var payload = {
                    "secret_key": secret_key ,
                    "id": card_id
                }
                virtualcardResp = [];
                virtualcardInstance.get(payload).then(resp => {
                virtualcardResp = resp;
                if(resp.data.id == card_id) {
                    done();
                }
                }).catch(err => {
                    done(err);
                })
            });




        });
        // describe("#Rave Terminate virtual card test", function () {
        //     it("should return Card terminated successfully Message", function (done) {
        //         this.timeout(10000);
        //         var payload = {
        //             "secret_key": secret_key ,
        //             "id": "abf55ab5-0ef9-4d14-8522-2a29f57ce3b2"
        //         }

        //         var result = virtualcardInstance.terminate(payload).then(resp => {
        //             return resp.body;
        //         });

        //         expect(result).to.eventually.have.property('Message', 'Unable to retrieve the requested card.').notify(done)
        //     });

        // });

        describe("#Rave Fund virtual card test", function () {
            it("should return 'message: Card was funded successfully", async function () {
                this.timeout(15000);
                var payload = {
                    "secret_key": secret_key ,
                    "id": card_id,
                    "amount": "3",
                    "debit_currency": "USD"
                }
                virtualcardResp = [];
                virtualcardInstance.fund(payload).then(resp => {
                virtualcardResp = resp;
                if(resp.message == 'Card was funded successfully') {
                    done();
                }
                }).catch(err => {
                    done(err);
                })
            });

        });

        
        describe("#Rave Withdraw from a virtual card test", function () {
            it("should return 'Message: Withdrawal successful'", async function () {
                this.timeout(15000);
                var payload = {
                    "secret_key": secret_key,
                    "amount": "1",
                    "card_id": card_id
                }
                virtualcardResp = [];
                virtualcardInstance.withdraw(payload).then(resp => {
                virtualcardResp = resp;
                if(resp.message == 'Withdrawal successful') {
                    done();
                }
                }).catch(err => {
                    done(err);
                })
            });

        });
    });
      
});