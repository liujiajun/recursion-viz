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
import ControlPanel from '../control-penel/ControlPanel'

export const App = () => {
  const [vertices, setVertices] = React.useState({})
  const [edges, setEdges] = React.useState({})
  const [verticesContext, setVerticesContext] = React.useState({})
  const [time, setTime] = React.useState(0)
  // eslint-disable-next-line no-unused-vars
  const [autoPlay, setAutoPlay] = React.useState(true)
  const [error, setError] = React.useState('')

  const runAnimation = (fnContent: FunctionContent) => {
    try {
      const [adjList, newVerticesContext] = getRecursionTree(fnContent)
      const root = drawTree(adjList)
      const [newVertices, newEdges] = drawTimedTree(root)

      setError('')
      setTime(0)
      setAutoPlay(true)
      setVertices(newVertices)
      setEdges(newEdges)
      setVerticesContext(newVerticesContext)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box w={{ base: '100%', md: '20rem' }} h="100vh" py={3} pl={3} pr={{ base: 3, md: 0 }}>
          <Box height="100%" width="100%" borderWidth={2} borderRadius="lg">
            <ControlPanel onSubmit={runAnimation} alertMessage={error} />
          </Box>
        </Box>
        <Box flexGrow={1} h="100vh" padding={3}>
          <Box height="100%" width="100%" padding={3} borderWidth={2} borderRadius="lg">
            <TreeViewer vertices={vertices}
                        edges={edges}
                        verticesContext={verticesContext}
                        time={time}
                        onTimeChange={v => setTime(v)}
                        play={autoPlay}
                        onPlayChange={() => setAutoPlay(p => !p)}
            />
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}
