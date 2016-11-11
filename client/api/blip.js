/* global localStorage */

import openpgp, {generateKey, HKP} from 'openpgp'
openpgp.initWorker({ path: 'openpgp.worker.js' })
openpgp.config.aead_protect = true

export function reducer (state = {id: JSON.parse(localStorage.id || 'false'), priv: localStorage.priv, pub: localStorage.pub}, action) {
  switch (action.type) {
    case 'create_key':
      const options = {
        userIds: [{ name: action.data.name, email: action.data.email }],
        passphrase: action.data.password,
        numBits: 4096
      }
      return generateKey(options)
        .then(key => {
          localStorage.id = JSON.stringify({ name: action.data.name, email: action.data.email })
          localStorage.priv = key.privateKeyArmored
          localStorage.pub = key.publicKeyArmored
          const hkp = new HKP(process.env.HKP_SERVER)
          hkp.upload(key.publicKeyArmored)

          return Object.assign({}, {
            priv: key.privateKeyArmored,
            pub: key.publicKeyArmored,
            id: { name: action.data.name, email: action.data.email }
          }, state)
        })
    default:
      return state
  }
}
