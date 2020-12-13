import React from 'react'
import {
  Box
} from '@chakra-ui/react'
import { EdgesInfo, Point, VerticesContext, VerticesInfo } from '../../types/Types'
import Vertex from './vertex/Vertex'
import ProgressControl from './progress/ProgressControl'
import Edge from './edge/Edge'
import { getScaledAndTranslatedCoords, moveToCircleBorder } from './Utils'

type Props = {
  vertices: VerticesInfo,
  edges: EdgesInfo,
  verticesContext: VerticesContext,
  time: number,
  onTimeChange: Function,
  play: boolean,
  onPlayChange: Function
}

const getBottomRightCoords = (nodes: VerticesInfo) => {
  const raw: Point = Object.entries(nodes).map(([k, v]) => v).reduce(
    (acc, cur) => {
      return [Math.max(cur.coords[0], acc[0]), Math.max(cur.coords[1], acc[1])]
    }, [-1, -1]
  )
  return getScaledAndTranslatedCoords(raw, 2)
}

const getEndTime = (nodes: VerticesInfo) => {
  return Object.entries(nodes).map(([k, v]) => v).reduce(
    (acc, cur) => {
      return Math.max(cur.highlightAt[cur.highlightAt.length - 1], acc)
    }, 0
  )
}

const getNodes = (nodes: VerticesInfo, context: VerticesContext, time) => {
  return (
    <>
      { Object.entries(nodes).map(([k, v]) => {
        return v.appearFrom <= time &&
        <Vertex key={v.id}
                center={getScaledAndTranslatedCoords(v.coords)}
                highlight={context[v.id].isMemo
                  ? 'memo'
                  : v.highlightAt.includes(time)
                    ? 'current'
                    : 'normal'}
                label={context[v.id].args.join(', ')}
        />
      })}
    </>
  )
}

const getEdges = (edges: EdgesInfo, nodes: VerticesInfo, context: VerticesContext, time) => {
  return (
    <>
      { Object.entries(edges).map(([k, v]) => {
        const [processedStart, processedEnd] = moveToCircleBorder(
          getScaledAndTranslatedCoords(nodes[v.u].coords),
          getScaledAndTranslatedCoords(nodes[v.v].coords)
        )
        return time >= v.interval[0] && time <= v.interval[1] &&
            <Edge start={processedStart}
                  end={processedEnd}
                  highlight={time === v.interval[0] ? 'current' : 'normal'}
            />
      })}
    </>
  )
}

const TreeViewer = ({
  vertices,
  edges,
  verticesContext,
  time,
  play,
  onTimeChange,
  onPlayChange
} : Props) => {
  const bottomRight = getBottomRightCoords(vertices)
  const endTime = getEndTime(vertices)

  React.useEffect(() => {
    if (!play) {
      return
    }

    if (time === 1 && endTime === 0) {
      return
    }

    if (time > endTime) {
      onTimeChange(0)
    }

    const interval = setTimeout(() => {
      if (time === endTime - 1) {
        onPlayChange()
      }
      onTimeChange(time + 1)
    }, 500)

    return () => clearTimeout(interval)
  }, [play, time])

  return (
    <Box width="100%" height="100%">
      <Box width="100%" height="calc(100% - 2.5rem)" backgroundColor="">
        <svg height="100%" width="100%" viewBox={`0 0 ${bottomRight[0]} ${bottomRight[1]}`}>
          { getNodes(vertices, verticesContext, time) }
          { getEdges(edges, vertices, verticesContext, time) }
        </svg>
      </Box>
      <Box width="100%" height="2.5rem">
        <ProgressControl time={time}
                         endTime={endTime}
                         play={play}
                         onTimeChange={(time) => onTimeChange(time) }
                         onPlayChange={() => onPlayChange() }
        />
      </Box>
    </Box>
  )
}

export default TreeViewer
