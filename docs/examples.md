# Cryptocurrency examples

## Generate a random address

```javascript
var privateKey = new PrivateKey();

// Legacy Pay2PublicScriptHash address
var legacy = privateKey.toAddress();
var legacy = privateKey.toAddress('legacy');

// Segwit Pay2SegwitPublicKeyHash address
var segwit = privateKey.toAddress('segwit');

// Segwit Pay2ScriptHash address
var native = privateKey.toAddress('script');
```

## Generate a address from a SHA256 hash

```javascript
var value = Buffer.from('correct horse battery staple');
var hash = bitlike.crypto.Hash.sha256(value);
var bn = bitlike.crypto.BN.fromBuffer(hash);

var address = new bitlike.PrivateKey(bn).toAddress();
```

## Generate address from mnemonic

```javascript
var mnemonic = 'hockey lumber soda negative link evolve pole retreat sponsor voice hurt feature';

var seed = BIP39.MnemonicToSeed(mnemonic);

// Then folow the BIP32 Hierarchical Deterministic Wallet 
var HD = HDPrivateKey.fromSeed(seed);
var derived = HD.derive("m/44'/20'/0'/0/0");

var address = derived.privateKey.toAddress();
```

## Import an address via WIF

```javascript
var wif = 'cPhfFK19spZ2HgPc4btPchpVjHGMVYWmEph6nxV1cE2R83kQNNVC';

var address = new PrivateKey(wif).toAddress();
```

## Create a Transaction

```javascript
var privateKey = new PrivateKey('cPhfFK19spZ2HgPc4btPchpVjHGMVYWmEph6nxV1cE2R83kQNNVC');
var utxo = {
  "txid" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "vout" : 0,
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};

var transaction = new Transaction()
  .from(utxo)
  .to('mhbErZpbSxQQv9imuSmTzxwrK7QAGDcBNk', 15000)
  .sign(privateKey);
```

## Sign a message

```javascript
var privateKey = new PrivateKey('cPhfFK19spZ2HgPc4btPchpVjHGMVYWmEph6nxV1cE2R83kQNNVC');
var message = new Message('This is an example of a signed message.');

var signature = message.sign(privateKey);
```

## Verify a message

```javascript
var address = 'mhbErZpbSxQQv9imuSmTzxwrK7QAGDcBNk';
var signature = 'HymC2vmlu6K3pHuMiD6KyNkLd4OhhfDtbSdZ+WEa2Ro2HD+RNqjSVMxT1fP3MlnAB7X0MMIjNR+6ucyXYHtw5mE=';

var verified = new Message('This is an example of a signed message.').verify(address, signature);
 ```

## Create an OP RETURN transaction

```javascript
var privateKey = new PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
var utxo = {
  "txid" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "vout" : 0,
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};

var transaction = new bitlike.Transaction()
    .from(utxo)
    .addData('cryptocurrency rocks') // Add OP_RETURN data
    .sign(privateKey);
```

## Create a 2-of-3 multisig P2SH address

```javascript
var publicKeys = [
  '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
  '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
  '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
];
var requiredSignatures = 2;

var address = new Address(publicKeys, requiredSignatures);
```

## Spend from a 2-of-2 multisig P2SH address

```javascript
var privateKeys = [
  new PrivateKey('L1wFriaUCJ2WpDEJN7iGMqtC4JmfRJCNnuUFjnW1bPtAraehbYdv'),
  new PrivateKey('KzJhat1sHE7tyj4L71FCNJ4YzdeUgL4wpP9QH46dh6SA5eFZsLCF')
];
var publicKeys = privateKeys.map(PublicKey);
var address = new Address(publicKeys, 2); // 2 of 2

var utxo = {
  "txid" : "153068cdd81b73ec9d8dcce27f2c77ddda12dee3db424bff5cafdbe9f01c1756",
  "vout" : 0,
  "script" : new bitlike.Script(address).toHex(),
  "satoshis" : 20000
};

var transaction = new bitlike.Transaction()
    .from(utxo, publicKeys, 2)
    .to('mhbErZpbSxQQv9imuSmTzxwrK7QAGDcBNk', 20000)
    .sign(privateKeys);
```