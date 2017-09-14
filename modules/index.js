const R = require('ramda')

const set = lens => ({
  as: value => [lens, R.always(value), 'set'],
  with: setter => [lens, setter, 'set'],
  using: setter => [lens, setter, 'over']
})

const createReducer = handlers => (state, action) => {
  const { type } = action

  const actionHandlers = R.propOr([], type, handlers)

  return actionHandlers.reduce(
    (nextState, [lens, setter, method]) =>
      R.has(method, R)
        ? R[method](lens, setter(action, nextState), nextState)
        : nextState,
    state
  )
}

module.exports = {
  set,
  createReducer
}
