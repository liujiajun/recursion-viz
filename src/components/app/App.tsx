import * as React from 'react'
import {
  ChakraProvider,
  Box,
  Flex,
  theme
} from '@chakra-ui/react'
import drawTree from '../../core/tree-drawer/TreeDrawer'
import TreeViewer from '../tree-viewer/TreeViewer'
import drawTimedTree from '../../core/tree-drawer/TimedTreeDrawer'
import { FunctionContent } from '../../types/Types'
import getRecursionTree from '../../core/recursion-tracer/RecursionTracer'

function test () {
  const fnContent: FunctionContent = {
    body: `
      if (n == 0 || n == 1) return n;
      return fn(n - 1) + fn(n - 2);
    `,
    params: [{ name: 'n', value: 3 }]
  }

  // const adjList = {
  //   0: [1, 2],
  //   1: [3, 4],
  //   2: [],
  //   3: [],
  //   4: []
  // }

  // const adjList = {
  //   0: [1, 2, 3],
  //   1: [4, 5],
  //   2: [],
  //   3: [8, 9],
  //   4: [],
  //   5: [6, 7],
  //   6: [],
  //   7: [],
  //   8: [],
  //   9: [10, 11, 12, 13, 14],
  //   10: [],
  //   11: [],
  //   12: [],
  //   13: [],
  //   14: []
  // }

  const [adjList, verticesContext] = getRecursionTree(fnContent)
  const root = drawTree(adjList)
  const [vertices, edges] = drawTimedTree(root)

  console.log('---')
  console.log(root)
  console.log('---')
  return <TreeViewer vertices={vertices} edges={edges} verticesContext={verticesContext} time={0} />
}

export const App = () => (
    <ChakraProvider theme={theme}>
      <Flex direction={{ base: 'column', md: 'row' }} >
        <Box w={{ base: '100%', md: '20rem' }} h="100vh">
          {/* { test() } */}
          111
        </Box>
        <Box flexGrow={1} h="100vh" mx={3} >
          { test() }
        </Box>
      </Flex>
    </ChakraProvider>
)
