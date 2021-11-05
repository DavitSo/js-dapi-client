const {
  v0: {
    GetAddressTransactionsRequest,
    CorePromiseClient,
  },
} = require('dapi-grpc');

/**
 * @param {GrpcTransport} grpcTransport
 * @returns {function(string, DAPIClientOptions=): *}
 */
function getAddressTransactionsFactory(grpcTransport) {
  /**
   * Get address all transactions
   *
   * @typedef {getAddressTransactions}
   * @param {string} address
   * @param {Number} offset
   * @param {Number} limit
   * @param {DAPIClientOptions} [options]
   * @returns {Promise<*>}
   */
  async function getAddressTransactions(address,
    offset = undefined, limit = undefined, options = {}) {
    const getAddressTransactionsRequest = new GetAddressTransactionsRequest();

    getAddressTransactionsRequest.setAddress(address);
    getAddressTransactionsRequest.setLimit(limit);
    getAddressTransactionsRequest.setOffset(offset)

    const response = await grpcTransport.request(
      CorePromiseClient,
      'getAddressTransactions',
      getAddressTransactionsRequest,
      options,
    );
    return { address, transactions: response.getTransactionsList() };
  }

  return getAddressTransactions;
}

module.exports = getAddressTransactionsFactory;
