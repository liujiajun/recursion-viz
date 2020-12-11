import * as React from 'react'
import { TreeNode } from '../../types/Types'
import Vertex from './vertex/Vertex'

type Props = {
  rootNode: TreeNode
}

const nodes = (node: TreeNode) => {
  return (
    <>
      <Vertex center={[node.x * 100 + 40, node.y * 100 + 40]} />
      { node.children.map(child => nodes(child)) }
    </>
  )
}

const TreeViewer = ({ rootNode } : Props) => {
  return (
    <svg height="100%" width="100%">
      { nodes(rootNode) }
    </svg>
  )
}

export default TreeViewer
