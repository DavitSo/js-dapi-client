const {
  v0: {
    GetTransactionFeeRequest,
    CorePromiseClient,
  },
} = require('dapi-grpc');

/**
 * @param {GrpcTransport} grpcTransport
 * @returns {function(string, DAPIClientOptions=): *}
 */
function getTransactionFeeFactory(grpcTransport) {
  /**
   * Get address balance
   *
   * @typedef {getTransactionFee}
   * @param {string} address
   * @param {Number} amount
   * @param {DAPIClientOptions} [options]
   * @returns {Promise<*>}
   */
  async function getTransactionFee(address, amount, options = {}) {
    const getTransactionFeeRequest = new GetTransactionFeeRequest();

    getTransactionFeeRequest.setAddress(address);
    getTransactionFeeRequest.setAmount(amount)

    const response = await grpcTransport.request(
      CorePromiseClient,
      'getTransactionFee',
      getTransactionFeeRequest,
      options,
    );
    return { fee: response.getFee() };
  }

  return getTransactionFee;
}

module.exports = getTransactionFeeFactory;
