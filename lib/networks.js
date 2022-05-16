'use strict';
var _ = require('lodash');

var BufferUtil = require('./util/buffer');
var JSUtil = require('./util/js');
var networks = [];
var networkMaps = {};

/**
 * A network is merely a map containing values that correspond to version
 * numbers for each Coin network.
 * @constructor
 */
function Network() {}

Network.prototype.toString = function toString() {
  return this.name;
};

/**
 * @function
 * @member Networks#get
 * Retrieves the network associated with a magic number or string.
 * @param {string|number|Network} arg
 * @param {string|Array} keys - if set, only check if the magic number associated with this name matches
 * @return Network
 */
function get(arg, keys) {
  if (~networks.indexOf(arg)) {
    return arg;
  }
  if (keys) {
    if (!_.isArray(keys)) {
      keys = [keys];
    }
    var containsArg = function(key) {
      return networks[index][key] === arg;
    };
    for (var index in networks) {
      if (_.some(keys, containsArg)) {
        return networks[index];
      }
    }
    return undefined;
  }
  if(networkMaps[arg] && networkMaps[arg].length >= 1) {
    return networkMaps[arg][0];
  } else {
    return networkMaps[arg];
  }
}

/**
 * @function
 * @member Networks#add
 * Will add a custom Network
 * @param {Object} data
 * @param {string} data.name - The name of the network
 * @param {string} data.alias - The aliased name of the network
 * @param {Number} data.pubkeyhash - The publickey hash prefix
 * @param {Number} data.privatekey - The privatekey prefix
 * @param {Number} data.scripthash - The scripthash prefix
 * @param {string} data.bech32prefix - The native segwit prefix
 * @param {Number} data.xpubkey - The extended public key magic
 * @param {Number} data.xprivkey - The extended private key magic
 * @param {Number} data.networkMagic - The network magic number
 * @param {Number} data.port - The network port
 * @param {Array}  data.dnsSeeds - An array of dns seeds
 * @return Network
 */
function addNetwork(data) {

  var network = new Network();

  JSUtil.defineImmutable(network, {
    name: data.name,
    alias: data.alias,
    pubkeyhash: data.pubkeyhash,
    privatekey: data.privatekey,
    scripthash: data.scripthash,
    bech32prefix: data.bech32prefix,
    xpubkey: data.xpubkey,
    xprivkey: data.xprivkey
  });

  if (data.networkMagic) {
    JSUtil.defineImmutable(network, {
      networkMagic: BufferUtil.integerAsBuffer(data.networkMagic)
    });
  }

  if (data.port) {
    JSUtil.defineImmutable(network, {
      port: data.port
    });
  }

  if (data.dnsSeeds) {
    JSUtil.defineImmutable(network, {
      dnsSeeds: data.dnsSeeds
    });
  }
  _.each(network, function(value) {
    if (!_.isUndefined(value) && !_.isObject(value)) {
      if(!networkMaps[value]) {
        networkMaps[value] = [];
      }
      networkMaps[value].push(network);
    }
  });

  networks.push(network);

  return network;

}

/**
 * @function
 * @member Networks#remove
 * Will remove a custom network
 * @param {Network} network
 */
function removeNetwork(network) {
  for (var i = 0; i < networks.length; i++) {
    if (networks[i] === network) {
      networks.splice(i, 1);
    }
  }
  for (var key in networkMaps) {
    const index = networkMaps[key].indexOf(network);
    if (index >= 0) {
      delete networkMaps[key][index];
    }
  }
}




addNetwork({
  name: 'bitcoin',
  alias: 'bitcoin',
  pubkeyhash: 0,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: 'bc',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xF9BEB4D9, // pchMessageStart
  port: 8333,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var bitcoin = get('bitcoin');




addNetwork({
  name: 'bitcoin',
  alias: 'bitcoin',
  pubkeyhash: 0,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xE3E1F3E8, // pchMessageStart
  port: 8333,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var bitcoinsv = get('bitcoinsv');




addNetwork({
  name: 'bitcoincash',
  alias: 'bitcoincash',
  pubkeyhash: 0,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x02fda926,      // EXT_PUBLIC_KEY
  xprivkey: 0x02fda4e8,     // EXT_SECRET_KEY
  networkMagic: 0x5241564E, // pchMessageStart
  port: 9108,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var bitcoincash = get('bitcoincash');




addNetwork({
  name: 'bitcoingold',
  alias: 'bitcoingold',
  pubkeyhash: 38,         // PUBKEY_ADDRESS
  scripthash: 23,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: 'btg',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xE1476D44, // pchMessageStart
  port: 8338,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var bitcoingold = get('bitcoingold');




addNetwork({
  name: 'litecoin',
  alias: 'litecoin',
  pubkeyhash: 48,         // PUBKEY_ADDRESS
  scripthash: 50,         // SCRIPT_ADDRESS
  privatekey: 176,         // SECRET_KEY
  bech32prefix: 'ltc',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xFBC0B6DB, // pchMessageStart
  port: 9333,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var litecoin = get('litecoin');




addNetwork({
  name: 'dogecoin',
  alias: 'dogecoin',
  pubkeyhash: 30,         // PUBKEY_ADDRESS
  scripthash: 22,         // SCRIPT_ADDRESS
  privatekey: 158,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x02FACAFD,      // EXT_PUBLIC_KEY
  xprivkey: 0x02FAC398,     // EXT_SECRET_KEY
  networkMagic: 0xC0C0C0C0, // pchMessageStart
  port: 22556,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var dogecoin = get('dogecoin');




addNetwork({
  name: 'digibyte',
  alias: 'digibyte',
  pubkeyhash: 30,         // PUBKEY_ADDRESS
  scripthash: 63,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: 'dgb',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xFAC3B6DA, // pchMessageStart
  port: 12024,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var digibyte = get('digibyte');




addNetwork({
  name: 'komodo',
  alias: 'komodo',
  pubkeyhash: 60,         // PUBKEY_ADDRESS
  scripthash: 85,         // SCRIPT_ADDRESS
  privatekey: 188,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xF9EEE48D, // pchMessageStart
  port: 7770,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var komodo = get('komodo');




addNetwork({
  name: 'reddcoin',
  alias: 'reddcoin',
  pubkeyhash: 61,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 189,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xFBC0B6DB, // pchMessageStart
  port: 45444,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var reddcoin = get('reddcoin');




addNetwork({
  name: 'ravencoin',
  alias: 'ravencoin',
  pubkeyhash: 60,         // PUBKEY_ADDRESS
  scripthash: 122,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0x5241564E, // pchMessageStart
  port: 8767,              // nDefaultPort
  dnsSeeds: [ ]             // vSeeds
});
/**
 * @instance
 * @member Networks#livenet
 */
var ravencoin = get('ravencoin');




/**
 * @namespace Networks
 */
module.exports = {
  add: addNetwork,
  remove: removeNetwork,
  defaultNetwork: bitcoin,
  bitcoin: bitcoin,
  bitcoingold: bitcoingold,
  bitcoincash: bitcoincash,
  bitcoinsv: bitcoinsv,
  litecoin: litecoin,
  dogecoin: dogecoin,
  digibyte: digibyte,
  komodo: komodo,
  reddcoin: reddcoin,
  ravencoin: ravencoin,
  get: get
};