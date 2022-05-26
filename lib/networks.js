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
function Network() { }

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
    var containsArg = function (key) {
      return networks[index][key] === arg;
    };
    for (var index in networks) {
      if (_.some(keys, containsArg)) {
        return networks[index];
      }
    }
    return undefined;
  }
  if (networkMaps[arg] && networkMaps[arg].length >= 1) {
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

  if (data.explorers) {
    JSUtil.defineImmutable(network, {
      explorers: data.explorers
    });
  }

  JSUtil.defineImmutable(network, {
    n: data.n
  });

  _.each(network, function (value) {
    if (!_.isUndefined(value) && !_.isObject(value)) {
      if (!networkMaps[value]) {
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
  alias: 'btc',
  pubkeyhash: 0,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: 'bc',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xF9BEB4D9, // pchMessageStart
  port: 8333,              // nDefaultPort
  dnsSeeds: [
    "seed.bitcoin.sipa.be",
    "dnsseed.bluematt.me",
    "dnsseed.bitcoin.dashjr.org",
    "seed.bitcoinstats.com",
    "seed.bitnodes.io",
    "bitseed.xf2.org",
  ],                        // vSeeds
  explorers: [
    "https://bitcoinblockexplorers.com/api/v2/",
    "https://bitcoin.atomicwallet.io/api/v2/",
    "https://btc1.heatwallet.com/api/v2",
    "https://btcbook.guarda.co/api/v2/",
    "https://btc.exan.tech/api/v2/"
  ],
  n: 0 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#bitcoin
 */
var bitcoin = get('bitcoin');




addNetwork({
  name: 'bitcoin-testnet',
  alias: 'tbtc',
  pubkeyhash: 111,         // PUBKEY_ADDRESS
  scripthash: 196,         // SCRIPT_ADDRESS
  privatekey: 239,         // SECRET_KEY
  bech32prefix: 'tb',      // bech32_hrp
  xpubkey: 0x043587CF,      // EXT_PUBLIC_KEY
  xprivkey: 0x04358394,     // EXT_SECRET_KEY
  networkMagic: 0x0B110907, // pchMessageStart
  port: 18333,              // nDefaultPort
  dnsSeeds: [
    "testnet-seed.bitcoin.jonasschnelli.ch",
    "seed.tbtc.petertodd.org",
    "seed.testnet.bitcoin.sprovoost.nl",
    "testnet-seed.bluematt.me",
  ],             // vSeeds
  explorers: [],
  n: 1 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#bitcoin-testnet
 */
var bitcointest = get('bitcoin-testnet');




addNetwork({
  name: 'bitcoin-sv',
  alias: 'bsv',
  pubkeyhash: 0,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xE3E1F3E8, // pchMessageStart
  port: 8333,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://bchsvexplorer.com/api/v2/"
  ],
  n: 236 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#bitcoin-sv
 */
var bitcoinsv = get('bitcoin-sv');




addNetwork({
  name: 'bitcoin-cash',
  alias: 'bch',
  pubkeyhash: 0,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x02fda926,      // EXT_PUBLIC_KEY
  xprivkey: 0x02fda4e8,     // EXT_SECRET_KEY
  networkMagic: 0x5241564E, // pchMessageStart
  port: 9108,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://bchblockexplorer.com/api/v2/",
    "https://blockbook-bcash.binancechain.io/api/v2/"
  ],
  n: 145 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#bitcoin-cash
 */
var bitcoincash = get('bitcoin-cash');




addNetwork({
  name: 'bitcoin-gold',
  alias: 'btg',
  pubkeyhash: 38,         // PUBKEY_ADDRESS
  scripthash: 23,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: 'btg',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xE1476D44, // pchMessageStart
  port: 8338,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://btgexplorer.com/api/v2",
    "https://btgbook.guarda.co/api/v2/",
    "https://bgold.atomicwallet.io/api/v2/"
  ],
  n: 236 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#bitcoin-gold
 */
var bitcoingold = get('bitcoin-gold');




addNetwork({
  name: 'litecoin',
  alias: 'ltc',
  pubkeyhash: 48,         // PUBKEY_ADDRESS
  scripthash: 50,         // SCRIPT_ADDRESS
  privatekey: 176,         // SECRET_KEY
  bech32prefix: 'ltc',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xFBC0B6DB, // pchMessageStart
  port: 9333,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://litecoinblockexplorer.net/api/v2/",
    "https://blockbook-litecoin.binancechain.io/api/v2/",
    "https://ltc1.heatwallet.com/api/v2/",
    "https://litecoin.atomicwallet.io/api/v2/",
    "https://blockbook-litecoin.tronwallet.me/api/v2/"
  ],
  n: 2 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#litecoin
 */
var litecoin = get('litecoin');




addNetwork({
  name: 'dogecoin',
  alias: 'doge',
  pubkeyhash: 30,         // PUBKEY_ADDRESS
  scripthash: 22,         // SCRIPT_ADDRESS
  privatekey: 158,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x02FACAFD,      // EXT_PUBLIC_KEY
  xprivkey: 0x02FAC398,     // EXT_SECRET_KEY
  networkMagic: 0xC0C0C0C0, // pchMessageStart
  port: 22556,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://dogeblocks.com/api/v2/",
    "https://dogecoin.atomicwallet.io/api/v2/",
    "https://blockbook-dogecoin.tronwallet.me/api/v2/"
  ],
  n: 3 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#dogecoin
 */
var dogecoin = get('dogecoin');




addNetwork({
  name: 'digibyte',
  alias: 'dgb',
  pubkeyhash: 30,         // PUBKEY_ADDRESS
  scripthash: 63,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: 'dgb',      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xFAC3B6DA, // pchMessageStart
  port: 12024,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://digibyteblockexplorer.com/api/v2/",
    "https://digibyte.atomicwallet.io/api/v2/",
    "https://blockbook-digibyte.tronwallet.me/api/v2/",
    "https://digiexplorer.info/api/v2/",
    "https://digiexplorer.net/api/v2/",
    "http://13.114.142.49/api/v2/",
    "https://dgbbook.guarda.co/api/v2/"
  ],
  n: 20 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#digibyte
 */
var digibyte = get('digibyte');




addNetwork({
  name: 'komodo',
  alias: 'kmd',
  pubkeyhash: 60,         // PUBKEY_ADDRESS
  scripthash: 85,         // SCRIPT_ADDRESS
  privatekey: 188,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xF9EEE48D, // pchMessageStart
  port: 7770,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://komodoblockexplorer.com/api/v2/",
    "https://komodo.atomicwallet.io/api/v2/",
    "https://kmdbook.guarda.co/api/v2/"
  ],
  n: 141 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#komodo
 */
var komodo = get('komodo');




addNetwork({
  name: 'reddcoin',
  alias: 'rdd',
  pubkeyhash: 61,         // PUBKEY_ADDRESS
  scripthash: 5,         // SCRIPT_ADDRESS
  privatekey: 189,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0xFBC0B6DB, // pchMessageStart
  port: 45444,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://rddblockexplorer.com/api/v2/"
  ],
  n: 4 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#reddcoin
 */
var reddcoin = get('reddcoin');




addNetwork({
  name: 'ravencoin',
  alias: 'rvn',
  pubkeyhash: 60,         // PUBKEY_ADDRESS
  scripthash: 122,         // SCRIPT_ADDRESS
  privatekey: 128,         // SECRET_KEY
  bech32prefix: null,      // bech32_hrp
  xpubkey: 0x0488B21E,      // EXT_PUBLIC_KEY
  xprivkey: 0x0488ADE4,     // EXT_SECRET_KEY
  networkMagic: 0x5241564E, // pchMessageStart
  port: 8767,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://rvnblockexplorer.com/api/v2/"
  ],
  n: 175 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#ravencoin
 */
var ravencoin = get('ravencoin');




addNetwork({
  name: 'verge',
  alias: 'xvg',
  pubkeyhash: 30,         // PUBKEY_ADDRESS
  scripthash: 33,         // SCRIPT_ADDRESS
  privatekey: 158,         // SECRET_KEY
  bech32prefix: 'vg',      // bech32_hrp
  xpubkey: 0x022D2533,      // EXT_PUBLIC_KEY
  xprivkey: 0x0221312B,     // EXT_SECRET_KEY
  networkMagic: 0xF7A77EFF, // pchMessageStart
  port: 21102,              // nDefaultPort
  dnsSeeds: [],             // vSeeds
  explorers: [
    "https://xvgblockexplorer.com/api/v2/"
  ],
  n: 77 // BIP32 coin number
});
/**
 * @instance
 * @member Networks#verge
 */
var verge = get('verge');




/**
 * @namespace Networks
 */
module.exports = {
  add: addNetwork,
  remove: removeNetwork,
  defaultNetwork: bitcoin,
  bitcoin: bitcoin,
  bitcointest: bitcointest,
  bitcoingold: bitcoingold,
  bitcoincash: bitcoincash,
  bitcoinsv: bitcoinsv,
  litecoin: litecoin,
  dogecoin: dogecoin,
  digibyte: digibyte,
  komodo: komodo,
  reddcoin: reddcoin,
  ravencoin: ravencoin,
  verge: verge,
  get: get
};