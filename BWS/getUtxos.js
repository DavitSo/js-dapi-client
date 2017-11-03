const moment = require('moment');
const explorerGet = require('../Common/ExplorerHelper').explorerGet;
const lastHeight = require('../Explorer/API/getLastBlockHeight').getLastBlockHeight;

exports.getUtxos = function (opts, addresses) {
  return new Promise(((resolve, reject) => {
    console.log(addresses);
    const promises = [];
    addresses.forEach((addr) => {
      promises.push(explorerGet(`/addr/${addr}/utxo`));
    });
    return Promise
      .all(promises)
      .then(res => resolve(res[1]))
      .catch(err => reject(err));
  }));
};
