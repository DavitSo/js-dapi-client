const broadcastTransactionFactory = require('./broadcastTransactionFactory');
const generateToAddressFactory = require('./generateToAddressFactory');
const getBestBlockHashFactory = require('./getBestBlockHashFactory');
const getBlockByHashFactory = require('./getBlockByHashFactory');
const getBlockByHeightFactory = require('./getBlockByHeightFactory');
const getBlockHashFactory = require('./getBlockHashFactory');
const getMnListDiffFactory = require('./getMnListDiffFactory');
const getStatusFactory = require('./getStatusFactory');
const getAddressBalanceFactory = require('./getAddressBalanceFactory');
const getTransactionFeeFactory = require('./getTransactionFeeFactory');
const getTransactionFactory = require('./getTransaction/getTransactionFactory');
const subscribeToTransactionsWithProofsFactory = require('./subscribeToTransactionsWithProofsFactory');

class CoreMethodsFacade {
  /**
   * @param {JsonRpcTransport} jsonRpcTransport
   * @param {GrpcTransport} grpcTransport
   */
  constructor(jsonRpcTransport, grpcTransport) {
    this.broadcastTransaction = broadcastTransactionFactory(grpcTransport);
    this.generateToAddress = generateToAddressFactory(jsonRpcTransport);
    this.getBestBlockHash = getBestBlockHashFactory(jsonRpcTransport);
    this.getBlockByHash = getBlockByHashFactory(grpcTransport);
    this.getBlockByHeight = getBlockByHeightFactory(grpcTransport);
    this.getBlockHash = getBlockHashFactory(jsonRpcTransport);
    this.getMnListDiff = getMnListDiffFactory(jsonRpcTransport);
    this.getStatus = getStatusFactory(grpcTransport);
    this.getTransaction = getTransactionFactory(grpcTransport);
    this.getAddressBalance = getAddressBalanceFactory(grpcTransport);
    this.getTransactionFee = getTransactionFeeFactory(grpcTransport);
    this.subscribeToTransactionsWithProofs = subscribeToTransactionsWithProofsFactory(
      grpcTransport,
    );
  }
}

module.exports = CoreMethodsFacade;
