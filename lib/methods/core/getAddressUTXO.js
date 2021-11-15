const {
  v0: {
    GetAddressUTXORequest,
    CorePromiseClient,
  },
} = require('dapi-grpc');

/**
 * @param {GrpcTransport} grpcTransport
 * @returns {function(string, DAPIClientOptions=): *}
 */
function getAddressUTXOFactory(grpcTransport) {
  /**
   * Get address all transactions
   *
   * @typedef {getAddressUTXO}
   * @param {string} address
   * @param {DAPIClientOptions} [options]
   * @returns {Promise<*>}
   */
  async function getAddressUTXO(address, options = {}) {
    const getAddressUTXORequest = new GetAddressUTXORequest();

    getAddressUTXORequest.setAddress(address);

    const response = await grpcTransport.request(
      CorePromiseClient,
      'getAddressUTXO',
      getAddressUTXORequest,
      options,
    );
    const utxos = [];
    response.getUtxosList().forEach((utxo) => {
      utxos.push(
        {
          transactionId: utxo.getTransactionId(),
          outputIndex: utxo.getOutputIndex(),
          script: utxo.getScript(),
          satoshis: utxo.getSatoshis(),
          address: utxo.getAddress(),
        },
      );
    });

    return { address, utxos };
  }

  return getAddressUTXO;
}

module.exports = getAddressUTXOFactory;
