/* global localStorage */

export function reducer (state = {name: localStorage.name, priv: localStorage.priv, pub: localStorage.pub}, action) {
  switch (action.type) {
    default:
      return state
  }
}
