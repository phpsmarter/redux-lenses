# Redux Lenses

![](https://cdn.shopify.com/s/files/1/0267/4223/products/i-gotta-wear-shades-t-shirt-teeturtle_large.jpg)

[![Build Status](https://travis-ci.org/beardedtim/redux-lenses.svg?branch=master)](https://travis-ci.org/beardedtim/redux-lenses)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Usage

```js
import { createStore } from 'redux'
import { set, createReducer } from '@kofile/redux-lenses'

const handlers = {
  [ACTION_TYPE]: [
    set(lens.to.desired.state).as(false),
    set(lens.to.other.desired.state).with((payload, state) => newValue),
    set(lens.to.other.desired.state).using(
      (payload, state) => oldSliceValue => newValue
    )
  ]
}

const reducer = createReducer(handlers)

export default createStore(reducer)
```

## API

_**set**_

> lens -> SetterObject

Takes in a lens to set a value at. Returns an object with 3 methods:

* `with` : `setter -> ([lens, setter, 'set'])`
    - `setter` is a function that expects `(action, state)` and returns a new value for the `lens`
* `as` : `value -> ([lens, setter, 'set'])`
    - `value` is the value to set at that lens
* `using` : `setter -> ([lens, setter, 'over'])`
    - `seter` 0s a function that expects `(action, state)` and returns a function expeting `oldValue` of the lens and returns a new value for the lens.

_**createReducer**_

> handlers -> (state, action) -> state

Takes in an object of `{ [actionTypes]: [...([lens, setter, methodName])] }` and returns a function of `(state, action) -> nextState`.

## Tests

```
$ yarn test
```

All tests are held inside of `modules/index.test.js`