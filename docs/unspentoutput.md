# UnspentOutput

`bitlike.Transaction.UnspentOutput` is a class with stateless instances that provides information about an unspent output:

- Transaction ID and output index
- The "scriptPubKey", the script included in the output
- Amount of satoshis associated
- Address, if available

## Parameters

The constructor is quite permissive with the input arguments. It can take outputs straight out of blockbook's api. Some of the names are not very informative for new users, so the UnspentOutput constructor also understands these aliases:

- `scriptPubKey`: just `script` is also accepted
- `amoint`: expected value in coins. If the `satoshis` alias is used, make sure to use satoshis instead of Coins.
- `vout`: this is the index of the output in the transaction, renamed to `outputIndex`
- `txid`: `txId`

## Example

```javascript
var utxo = new UnspentOutput({
  "txid" : "a0a08e397203df68392ee95b3f08b0b3b3e2401410a38d46ae0874f74846f2e9",
  "vout" : 0,
  "address" : "mtoKs9V381UAhUia3d7Vb9GNak8Qvmcsme",
  "scriptPubKey" : "76a9145d52bfb470a2750da376c18bd3744653a5442ef688ac",
  "amount" : 0.00070000
});
var utxo = new UnspentOutput({
  "txId" : "a0a08e397203df68392ee95b3f08b0b3b3e2401410a38d46ae0874f74846f2e9",
  "outputIndex" : 0,
  "address" : "mtoKs9V381UAhUia3d7Vb9GNak8Qvmcsme",
  "script" : "76a9145d52bfb470a2750da376c18bd3744653a5442ef688ac",
  "satoshis" : 70000
});
```
