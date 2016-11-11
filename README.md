# ipfs-blip

An IPFS-based platform for something like twitter.


## setup
* run `npm install` or `yarn install` to install tools and dependencies
* run development server with `npm start`

## ideas

* store password-protected private key on device
* upload pubkey to server & allow for revocation of other keys with an existing key
* run keyserver like [this](https://github.com/mailvelope/keyserver)
* accept uploaded files, if sig is valid & under size-limit, post to IPFS
* make Dockerfile with [npm-on-ipfs](https://github.com/diasdavid/npm-on-ipfs) and ipfs installed, run signed-text to ipfs gateway on same machine
* Integration with keybase & other identity managers (create larger identity web)
