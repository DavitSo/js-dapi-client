const axios = require('axios');
const moment = require('moment');

exports.BWS = function(){
let self = this;
    return {
        BWS:{
          getFeeLevels: function() {
              // let self = this;
              return async function(network, cb){
                  return new Promise(async function (resolve, reject) {
                      let getInsightCandidate = await self.Discover.getInsightCandidate();
                      let getInsightURI = getInsightCandidate.URI;
                      let now = moment().format("YYYY-MM-DD")
                      let lastblock =  await axios.get(`${getInsightURI}/blocks?limit=5&blockDate=${now}`).then(resp=>resp.data.blocks[0].height)
                      let url = `${getInsightURI}/utils/estimatefee?nbBlocks=${lastblock||2}`
                      return axios
                        .get(url)
                        .then(function(response){
                          console.log(url, response.data)
                          return resolve(cb(null, response.data));
                        })
                        .catch(function(error){
                          if(error){
                              console.log(url, error)
                              console.error(`An error was triggered getting fee estimates `);
                              return cb(false);
                          }
                      });
                  });
              }
          },
          getUtxos: function() {
              // let self = this;
              return async function(cb,opts,addresses){
                  return new Promise(async function (resolve, reject) {
                    let getInsightCandidate = await self.Discover.getInsightCandidate();
                    let getInsightURI = getInsightCandidate.URI;
                    let url = `${getInsightURI}/addr`
                    let promises = [];


                    addresses.forEach(addr => {
                      promises.push(axios.get(`${url}/${addr}/utxo`))
                    });

                    axios.all(promises)
                    .then(res => {
                      console.log(49, res)
                      resolve(cb(null, res[1].data))});
                      });
                  }
            },
            getTx: function() {
                // let self = this;
                return async function(txid, cb){
                    return new Promise(async function (resolve, reject) {
                      let getInsightCandidate = await self.Discover.getInsightCandidate();
                      let getInsightURI = getInsightCandidate.URI;
                      let url = `${getInsightURI}/tx`

                      return axios
                        .get(`${url}/${txid}`)
                        .then(function(response){
                          console.log(`${url}/${txid}`, response.data)
                          return resolve(cb(null, response.data));
                        })
                        .catch(function(error){
                          if(error){
                              console.log(url, error)
                              console.error(`An error was triggered getting tx {txid} `);
                              return cb(false);
                          }
                      });
                    })
                }
            },
            getBalance: function() {
                // let self = this;
                return async function(twoStep, cb){
                    return new Promise(async function (resolve, reject) {
                      let res =  await SDK.Explorer.API.getBalance('yj6xVHMyZGBdLqGUfoGc9gDvU8tHx6iqb4')
                      //how do you know the address to use? prob stored on the opt object that is global? use placehodler for now
                      return resolve(cb(null, res))}
                      );
                    }
              },
              broadcastRawTx: function() {
                  // let self = this;
                  return async function(opts, network, rawTx, cb){
                      return new Promise(async function (resolve, reject) {
                        let res = await SDK.Explorer.API.send(rawTx)
                        return resolve(cb(null, res))}
                        );
                      }
                },
        }
      }
};


// API.getFeeLevels()('live',(err, x)=>{console.log('res', x)})
// API.getUtxos()((err, x)=>{console.log('res!!!', x)},'nada',['XfmtHzRb8TLGpE3z3bV9iMXr7N8UbNsLfk', 'Xmghk9LmasjpKbg6bBfFDMQwMapjbC33kU'])
// API.getTx()('02e7146fed1eeca237a0304d0d4252314773cc08273a37624bf4928275ccdd28',(err, x)=>{console.log('res', x)} )
