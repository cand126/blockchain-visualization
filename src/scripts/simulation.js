'use strict'

var web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

if (!web3.isConnected()) {
    console.log('not connect');
} else {
    console.log('connect');
    // var accounts = web3.eth.accounts;
    // console.log(accounts);
    // var mining = web3.eth.mining;
    // console.log(mining);
    var info = web3.eth.getBlock('latest');
    console.log(info);
    // console.log('==============')
    // web3.eth.defaultAccount = '0xdd02d9e831a32ee41af2f019ce583f75a579080d';
    // var defaultAccount = web3.eth.defaultAccount;
    // console.log(defaultAccount);
    // var coinbase = web3.eth.coinbase;
    // console.log(coinbase);

    // console.log('==============')
    // web3.eth.defaultAccount = '0x0f6d65c2b2f98f8b86e18cea6f5fddcb5a10bbbd';
    // defaultAccount = web3.eth.defaultAccount;
    // console.log(defaultAccount);
    // coinbase = web3.eth.coinbase;
    // console.log(coinbase);
}