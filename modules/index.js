const R = require('ramda')

const SET = 'set'
const OVER = 'over'

/**
 * Our helper functions for creating HandlerTuples
 *
 *  EXAMPLE:
 *
 *    set(lens) -> ({ with, as, using })
 *
 *    set(lens).as() -> ([lens, setter, string])
 * @param {Function} lens - The lens to the part of state
 * @return {Object}
 */
const set = lens => ({
  as: value => [lens, R.always(value), SET],
  with: setter => [lens, setter, SET],
  using: setter => [lens, setter, OVER]
})

/**
 * Our helper function for creating a Redux reducer. Returns a reducer
 *
 *  EXAMPLE:
 *
 *    { action: [handlers] } -> (state, action) -> nextState
 * @param {Object} handlers - { action: [handlers] }
 * @return {Function} - (state, action) -> nextState
 */
const createReducer = handlers => (state, action) => {
  const { type } = action

  if (!R.has(type, handlers)) {
    return state
  }

  const actionHandlers = handlers[type]

  return actionHandlers.reduce(
    (nextState, [lens, fn, method]) =>
      R[method](lens, fn(action, nextState), nextState),
    state
  )
}

module.exports = {
  set,
  createReducer
}
