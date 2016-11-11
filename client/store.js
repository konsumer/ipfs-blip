import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as form } from 'redux-form'

import {reducer as blip} from './api/blip'

const store = createStore(
  combineReducers({
    blip,
    routing,
    form
  },
  applyMiddleware(thunkMiddleware)),
  typeof window !== 'undefined' && window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : undefined
)

export default store
