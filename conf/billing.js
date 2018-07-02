//Configure options for payment processing
payments = {
    //General settings
    options: {
        live: false,
        currency: 'usd',
        statementInfo: 'ECOM - Yeah!',
        processor: 'stripe'
    },
    //Payment processor-specific settings.
    processors: {
        stripe: {
            publicTest: 'pk_test_iS14vDu3AhdzHGCxnwapoW9L',
            secretTest: 'sk_test_yoZLMGJDVRCqX1JznqSy2JHA',
            publicLive: '',
            secretLive: '',
            secret: '',
            public: '',
        }
    }
    
}

//Config options like setting apiKey

for (proc in payments.processors){
    if(payments.options.live == true){
        payments.processors[proc].secret = payments.processors[proc].secretLive;
        payments.processors[proc].public = payments.processors[proc].publicLive;
    }else{
        payments.processors[proc].secret = payments.processors[proc].secretTest;
        payments.processors[proc].public = payments.processors[proc].publicTest;
    }
}


module.exports = payments;