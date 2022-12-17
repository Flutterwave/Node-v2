var morx = require('morx');
var charge = require('./rave.charge');

var q = require('q');

var spec = morx.spec()
                .build('cardno', 'required:true,validators:isNumeric, eg:5590131743294314')
				.build('currency', 'required:false, eg:NGN')
				.build('suggested_auth', 'required:false, eg:VBVSECURECODE') 
				.build('country', 'required:false, eg:NG')
				.build('settlement_token', 'required:false')
				.build('cvv', 'required:true, eg:544')   
				.build('amount', 'required:true, eg:10') 
				.build('phonenumber', 'required:false, eg:08098765432')
				.build('billingzip', 'required:false, eg:101501') 
				.build('expiryyear', 'required:true, eg:20') 
				.build('expirymonth', 'required:true, eg:02')
				.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
				.build('firstname', 'required:false, eg:lawal')
				.build('lastname', 'required:false, eg:garuba')
				.build('IP', 'required:true, eg:127.0.0.1')
				.build('narration', 'required:false, eg:89938910')
				.build('txRef', 'required:true, eg:443342')
				.build('meta', 'required:false')
				.build('pin', 'required:false, eg:3310')
				.build('bvn', 'required:false, eg:1234567890') 
				.build('charge_type', 'required:true, eg:preauth')  
				.build('device_fingerprint', 'required:false,eg:12233') 
				.build('recurring_stop', 'required:false, eg:2017-05-10')
				.build('include_integrity_hash', 'required:false, eg:2017-05-10')
				.build('usesecureauth', 'required:false, eg:false')
                .end();


function service(data, _rave){

    var d = q.defer();

    q.fcall(() => {
        var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return charge(params, _rave);
    })
    .then(resp => {
        d.resolve(resp);
    })
    .catch(err => {
        d.reject(err);
    });

    return d.promise;
}

service.morxspc = spec;
module.exports = service;