const FastPriorityQueue = require("fastpriorityqueue")
const assert = require('assert')

class AStar {
  
  /**
   * Build an instance of A*
   * 
   * @param  {params} Object
   * @return {[type]}
   */

  constructor(params) {
    assert.ok(params)
    assert.ok(!!params.start)
    assert.ok(!!params.end)
    assert.ok(!!params.distance)
    assert.ok(!!params.costEstimate)

    this.start = params.start
    this.end = params.end

    // Function to describe the distance between two points
    this.distance = params.distance

    // Function of a heuristic for distance from point to finish
    this.costEstimate = params.costEstimate

    // Set of already evaluated points
    this.redSet = []

    // The cost of going from start to a specific node
    this.getToCost = {
      [params.start.id]: 0
    }

    // Which neighbor connected to which 
    this.cameFrom = {}

    // The cost of going from a specific node to end
    this.goFromCost = {
      [params.start.id]: this.costEstimate(params.start, params.end)
    }

    // Points being currently being evaluated
    this.greenSet = new FastPriorityQueue((a, b) => this.goFromCost[a.id] > this.goFromCost[b.id])
    this.greenSet.add(params.start)
  }

  travel() {
    let path

    // Continue looking while we still have points
    while (!this.greenSet.isEmpty()) {

      // Get the lowest distance fringe point
      const current = this.greenSet.poll()

      // If the point we are on is the goal, recall the path between start and end
      if (current.id === this.end.id) {
        path = this._reconstructPath()
        break
      }

      // We have explored this point so mark it so we don't travel to this point again
      this.redSet.push(current.id)

      // Go through each neighbor of this point
      current.neighbors.forEach((neighbor) => {
        // Don't explore things you've already seen!
        if (this.redSet.indexOf(neighbor.id) > -1) {
          return
        }

        // Explore things you haven't!
        if (this.greenSet.array.filter(item => item.id === neighbor.id).length === 0) {
          this.greenSet.add(neighbor)
        }

        // Find the distance between the start and this point
        const possibleDist = this.getToCost[current.id] + this.distance(current, neighbor)

        // If the cost of getting to this neighbor point is greater than the cost 
        if (this.getToCost[neighbor.id] && possibleDist >= this.getToCost[neighbor.id]) {
          return
        }

        // So we know this point is the best first choice, let's keep it 

        // Mark what point got us here so we can recall it later
        this.cameFrom[neighbor.id] = current.id

        // How much does it cost to get to this point
        this.getToCost[neighbor.id] = possibleDist

        // How much will it probably cost to get from this point to the finish
        this.goFromCost = possibleDist + this.costEstimate(neighbor, this.end)
      })
    }

    return path
  }

  _reconstructPath() {
    const path = [ this.end.id ]

    while (path.slice(-1)[0] !== this.start.id) {
      const current = this.cameFrom[path.slice(-1)[0]]
      path.push(current)
    }

    return path.reverse()
  }
}

module.exports = AStar
