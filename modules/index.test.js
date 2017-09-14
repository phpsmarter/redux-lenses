/* eslint-env jest */
const R = require('ramda')
const { set, createReducer } = require('./')

describe('Redux Lenses Modules', () => {
  describe('set', () => {
    /**
     * First we test that our returned value
     * is the correct shape ( Duck Typing )
     */
    test('returns an object with the correct keys', () => {
      const returned = set()

      expect(R.has('with', returned)).toBe(true)
      expect(R.has('as', returned)).toBe(true)
      expect(R.has('using', returned)).toBe(true)
    })

    test('returns an object with the correct methods', () => {
      const returned = set()
      const isFunc = R.is(Function)
      expect(isFunc(returned.with)).toBe(true)
      expect(isFunc(returned.as)).toBe(true)
      expect(isFunc(returned.using)).toBe(true)
    })
  })

  /**
   * Next, let's test each method
   */
  describe('set.as', () => {
    test('returns the correct values in the correct order', () => {
      const lens = {}
      const value = 1
      const returned = set(lens)
      const setter = returned.as(value)

      expect(setter.length).toBe(3)

      const [setLens, setSetter, setMethod] = setter

      expect(setLens).toBe(lens)
      expect(setMethod).toBe('set')
      expect(setSetter()).toBe(value)
    })
  })

  describe('set.with', () => {
    test('returns the correct values in the correct order', () => {
      const lens = {}
      const setter = () => {}
      const returned = set(lens)
      const result = returned.with(setter)

      expect(result.length).toBe(3)

      const [setLens, setSetter, setMethod] = result

      expect(setLens).toBe(lens)
      expect(setMethod).toBe('set')
      expect(setSetter).toBe(setter)
    })
  })

  describe('set.using', () => {
    test('returns the correct values in the correct order', () => {
      const lens = {}
      const setter = () => {}
      const returned = set(lens)
      const result = returned.using(setter)

      expect(result.length).toBe(3)

      const [setLens, setSetter, setMethod] = result

      expect(setLens).toBe(lens)
      expect(setMethod).toBe('over')
      expect(setSetter).toBe(setter)
    })
  })

  describe('createReducer', () => {
    test('returns a function of arity 2', () => {
      const handlers = {}
      const reducer = createReducer(handlers)

      expect(reducer.length).toBe(2)
    })

    test('returns the given state if no handlers found', () => {
      const handlers = {}
      const reducer = createReducer(handlers)
      const state = {}
      const nextState = reducer(state, { type: 'Not real' })

      expect(nextState).toBe(state)
    })

    test('applies action handlers that match the given type', () => {
      const state = {
        name: 'Tim'
      }

      const nameLens = R.lensProp('name')

      const handler = set(nameLens).as('John')

      const handlers = {
        real: [handler]
      }
      const reducer = createReducer(handlers)
      const nextState = reducer(state, { type: 'real' })

      expect(nextState).toEqual({ name: 'John' })
    })

    test('applies action handlers in order', () => {
      const state = {
        name: 'Tim'
      }

      const nameLens = R.lensProp('name')

      const handler = set(nameLens).as('John')
      const handler2 = set(nameLens).using(() => lastValue => {
        expect(lastValue).toBe('John')
        return 'Smith'
      })

      const handlers = {
        real: [handler, handler2]
      }
      const reducer = createReducer(handlers)
      const nextState = reducer(state, { type: 'real' })

      expect(nextState).toEqual({ name: 'Smith' })
    })
  })
})
