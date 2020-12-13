import { AdjList, TreeNode } from '../../types/Types'
import { getAllSiblings, getLeftMostChild, getMaxKey, getPreviousSibling, getRightMostChild, isLeftMost } from './Utils'

export default function drawTree (adjList: AdjList): TreeNode {
  // empty adjlist. Show nothing in the viewer.
  if (!(0 in adjList)) {
    adjList[0] = []
  }

  const root = buildTree(adjList, 0, null)
  calculateInitialX(root)
  calculateFinalPos(root, 0)
  return root
}

function buildTree (adjList: AdjList, rootId: number, parent: TreeNode | null): TreeNode {
  const u: TreeNode = {
    id: rootId,
    parent: parent,
    children: [],
    x: -1,
    y: parent ? parent.y + 1 : 0,
    mod: 0
  }

  for (const neighbourId of adjList[rootId]) {
    u.children.push(buildTree(adjList, neighbourId, u))
  }

  return u
}

function calculateInitialX (root: TreeNode) {
  for (const child of root.children) {
    calculateInitialX(child)
  }

  if (root.children.length === 0) {
    if (isLeftMost(root)) {
      root.x = 0
    } else {
      root.x = getPreviousSibling(root).x + 1
    }
  } else if (root.children.length === 1) {
    if (isLeftMost(root)) {
      root.x = 0
    } else {
      root.x = getPreviousSibling(root).x + 1
      root.mod = root.x - root.children[0].x
    }
  } else {
    const midX = (getLeftMostChild(root).x + getRightMostChild(root).x) / 2

    if (isLeftMost(root)) {
      root.x = midX
    } else {
      root.x = getPreviousSibling(root).x + 1
      root.mod = root.x - midX
    }
  }

  if (root.children.length > 0 && !isLeftMost(root)) {
    resolveConflicts(root)
  }
}

function resolveConflicts (root: TreeNode) {
  const minDistance = 1
  let shiftDistance = 0

  const myContour = {}
  getLeftContour(root, 0, myContour)

  let curSiblingIdx = 0
  const endSiblingIdx = getAllSiblings(root).indexOf(root)
  while (curSiblingIdx < endSiblingIdx) {
    const sib = getAllSiblings(root)[curSiblingIdx]
    const sibContour = {}
    getRightContour(sib, 0, sibContour)

    for (let level = root.y + 1; level <= Math.min(getMaxKey(myContour), getMaxKey(sibContour)); level++) {
      const diff = myContour[level] - sibContour[level]
      if (diff + shiftDistance < minDistance) {
        shiftDistance = minDistance - diff
      }
    }

    if (shiftDistance > 0) {
      root.x += shiftDistance
      root.mod += shiftDistance

      centerNodesBetween(root, sib)

      shiftDistance = 0
    }

    curSiblingIdx++
  }
}

function centerNodesBetween (left: TreeNode, right: TreeNode) {
  const leftIdx = getAllSiblings(left).indexOf(right)
  const rightIdx = getAllSiblings(left).indexOf(left)
  const numBetween = rightIdx - leftIdx - 1

  if (numBetween <= 0) {
    return
  }

  const disBetween = (left.x - right.x) / (numBetween + 1)

  let count = 1
  for (let i = leftIdx + 1; i < rightIdx; i++) {
    const midNode = getAllSiblings(left)[i]
    const desiredX = right.x + disBetween * count
    const offset = desiredX - midNode.x
    midNode.x += offset
    midNode.mod += offset

    count++
  }

  resolveConflicts(left)
}

function getLeftContour (root: TreeNode, modSum: number, res: Record<number, number>) {
  if (!(root.y in res)) {
    res[root.y] = root.x + modSum
  } else {
    res[root.y] = Math.min(res[root.y], root.x + modSum)
  }

  modSum += root.mod
  for (const child of root.children) {
    getLeftContour(child, modSum, res)
  }
}

function getRightContour (root: TreeNode, modSum: number, res: Record<number, number>) {
  if (!(root.y in res)) {
    res[root.y] = root.x + modSum
  } else {
    res[root.y] = Math.max(res[root.y], root.x + modSum)
  }

  modSum += root.mod
  for (const child of root.children) {
    getRightContour(child, modSum, res)
  }
}

function calculateFinalPos (root: TreeNode, modSum: number) {
  root.x += modSum
  modSum += root.mod

  for (const child of root.children) {
    calculateFinalPos(child, modSum)
  }
}
