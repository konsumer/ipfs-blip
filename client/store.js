import { createStore, combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import {reducer as blip} from './api/blip'

const store = createStore(
  combineReducers({
    blip,
    routing
  }),
  typeof window !== 'undefined' && window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : undefined
)

export default store
