import R from 'ramda'
import {getActionType} from './itemsUtils'

export const preReducer = R.curry((prepare, reducer) =>
  (state, action) => R.contains('@@', R.prop('type', action)) ?
    reducer(state, action) : reducer(prepare(state), action)
)

export const enhanceReducer = R.curry((handlers, reducer) =>
  (state, action) => R.propOr(
    reducer,
    getActionType(action),
    handlers
  )(state, action))

export const curriedReducer = R.curry(createReducer)

export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return R.propOr(
      R.identity,
      getActionType(action),
      handlers
    )(state, action)
  }
}
