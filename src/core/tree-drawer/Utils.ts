import { TreeNode } from '../../types/Types'

export function isLeftMost (node: TreeNode) {
  if (!node.parent) {
    return true
  }
  return node.parent.children[0].id === node.id
}

export function getLeftMostChild (node: TreeNode) {
  return node.children[0]
}

export function getRightMostChild (node: TreeNode) {
  return node.children[node.children.length - 1]
}

export function getPreviousSibling (node: TreeNode): TreeNode {
  const siblings = getAllSiblings(node)
  const myIdx = siblings.indexOf(node)
  return siblings[myIdx - 1]
}

export function getAllSiblings (node: TreeNode): TreeNode[] {
  if (!node.parent) {
    return [node]
  }
  return node.parent.children
}

export function getMaxKey (obj: Record<number, number>) {
  return Math.max.apply(null, Object.keys(obj).map(strKey => parseInt(strKey, 10)))
}
