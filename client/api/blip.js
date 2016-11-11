/* global localStorage */

// import kbpgp from 'kbpgp'

export function reducer (state = {error: false, userid: localStorage.userid, priv: localStorage.priv, pub: localStorage.pub}, action) {
  switch (action.type) {
    case 'error':
      return Object.assign({}, state, {error: action.data})
    case 'create_key_success':
      return Object.assign({}, state, {error: false}, action.data)
    case 'create_key':
      const userid = `${action.data.name} <${action.data.email}>`
      const passphrase = action.data.password
      return dispatch => {
        // const resolve = data => dispatch({type: 'create_key_success', data})
        // const reject = err => dispatch({type: 'error', data: err})
        // kbpgp.KeyManager.generate_rsa({ userid, passphrase }, (err, user) => {
        //   if (err) return reject(err)
        //   user.sign({}, err => {
        //     if (err) return reject(err)
        //     user.export_pgp_private({ passphrase }, (err, priv) => {
        //       if (err) return reject(err)
        //       user.export_pgp_public({}, (err, pub) => {
        //         if (err) return reject(err)
        //         localStorage.userid = userid
        //         localStorage.priv = priv
        //         localStorage.pub = pub
        //         resolve({userid, priv, pub})
        //       })
        //     })
        //   })
        // })
      }
    default:
      return state
  }
}
