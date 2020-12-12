import * as React from 'react'
import { HighlightStatus, Point } from '../../../types/Types'
// import { keyframes } from '@emotion/react'
// import styled from '@emotion/styled'

type Props = {
  start: Point,
  end: Point,
  highlight: HighlightStatus,
  label?: String,

}

const Edge = ({ start, end, highlight, label } : Props) => {
  const edgeId = `${Math.round(start[0]) + ',' + Math.round(start[1])}-${Math.round(end[0]) + ',' + Math.round(end[1])}`

  const animationX = React.useRef<SVGAnimateElement>(null)
  const animationY = React.useRef<SVGAnimateElement>(null)

  React.useEffect(() => {
    if (animationX.current === null || animationY.current === null) {
      return
    }

    // @ts-ignore
    animationX.current.beginElement()
    // @ts-ignore
    animationY.current.beginElement()
  }, [])

  return (
    <>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                refX="9.5" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
      <line
        id={edgeId}
        x1={start[0]}
        y1={start[1]}
        x2={end[0]}
        y2={end[1]}
        strokeWidth={2}
        stroke="black"
        markerEnd="url(#arrowhead)"
      >
        <animate
          ref={animationX}
          attributeName="x2"
          from={start[0]}
          to={end[0]}
          dur="0.3s"
          repeatCount="1"
          restart='whenNotActive'
        />
        <animate
          ref={animationY}
          attributeName="y2"
          from={start[1]}
          to={end[1]}
          dur="0.3s"
          repeatCount="1"
          restart='whenNotActive'
        />
      </line>
    </>
  )
}

export default Edge
