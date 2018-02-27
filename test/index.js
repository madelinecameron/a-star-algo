'use strict'

const test = require('ava')
const aStar = require('../')

test('must provide parameters', t => {
  try {
    const as = new aStar()
    t.fail()
  } catch(e) {
    t.pass()
  }
})

test('find path between two points', t => {
  const elements = {}

  elements.end = {
    id: 4,
    neighbors: [ elements.middle1 ]
  }

  elements.middle1 = {
    id: 2,
    neighbors: [ elements.end ]
  }

  elements.middle2 = {
    id: 3,
    neighbors: []
  }

  elements.start = {
    id: 1,
    neighbors: [ elements.middle1, elements.middle2 ]
  }

  const as = new aStar({
    start: elements.start,
    end: elements.end,
    costEstimate: (to, from) => {
      return 1
    },
    distance: (to, from) => {
      return 1
    }
  })

  t.deepEqual(as.travel(), [ 1, 2, 4 ])
})