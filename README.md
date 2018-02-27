## A*

A slightly opinionated, cleaned-up version of A-Star implementation

## Install

`npm install a-star-algo`

## How to use

```
const aStar = require('a-star-algo')

// Abuse the fact that objects are call-by-sharing ("pass by reference" with some differences) to chain everything together.
// You have to do it this way for now, or you can submit a PR to add something like https://www.npmjs.com/package/graph-data-structure in. ;)
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

// These are all the parameters available or necessary
const as = new aStar({
    // Which element to start from
    start: elements.start,
    // Which element to end at
    end: elements.end,
    // Heuristic for cost to go between two points
    costEstimate: (to, from) => {
      return 1
    },
    // How far apart two points are
    distance: (to, from) => {
      return 1
    }
  })

// [ 1, 2, 4 ]
const result = as.travel()
```

## Methods

### travel()

Call when you are ready to traverse