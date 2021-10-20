const {
  v0: {
    GetAddressBalanceRequest,
    CorePromiseClient,
  },
} = require('@dashevo/dapi-grpc');

/**
 * @param {GrpcTransport} grpcTransport
 * @returns {getAddressBalanceHash}
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
    getAddressBalanceRequest.setAddresses([address]);

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
