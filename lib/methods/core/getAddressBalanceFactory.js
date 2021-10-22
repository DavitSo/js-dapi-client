const {
  v0: {
    GetAddressBalanceRequest,
    CorePromiseClient,
  },
} = require('dapi-grpc');

/**
 * @param {GrpcTransport} grpcTransport
 * @returns {function(string, DAPIClientOptions=): *}
 */
function getAddressBalanceFactory(grpcTransport) {
  /**
   * Get address balance
   *
   * @typedef {getAddressBalance}
   * @param {string} address
   * @param {DAPIClientOptions} [options]
   * @returns {Promise<*>}
   */
  async function getAddressBalance(address, options = {}) {
    const getAddressBalanceRequest = new GetAddressBalanceRequest();

    getAddressBalanceRequest.addAddresses(address);

    const response = await grpcTransport.request(
      CorePromiseClient,
      'getAddressBalance',
      getAddressBalanceRequest,
      options,
    );
    const balance = response.getBalance();

    return balance;
  }

  return getAddressBalance;
}

module.exports = getAddressBalanceFactory;
