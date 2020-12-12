import * as React from 'react'
import { HighlightStatus, Point } from '../../../types/Types'

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

  const [opacity, setOpacity] = React.useState('0%')

  React.useEffect(() => {
    if (!animationX.current || !animationY.current) {
      return
    }

    // @ts-ignore
    animationX.current.beginElement()
    // @ts-ignore
    animationY.current.beginElement()

    // a trick to prevent the flickering before edge animation
    setOpacity('100%')
  }, [])

  return (
    <>
      <defs>
        <marker id={`ah-${edgeId}`}
                fill={highlight === 'normal' ? 'black' : '#319795'}
                markerWidth="10"
                markerHeight="7"
                refX="9.5"
                refY="3.5"
                orient="auto">
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
        stroke={highlight === 'normal' ? 'black' : '#319795'}
        opacity={opacity}
        markerEnd={`url(#ah-${edgeId})`}
      >
        <animate
          ref={animationX}
          attributeName="x2"
          from={start[0]}
          to={end[0]}
          dur="0.2s"
          repeatCount="1"
          restart='always'
        />
        <animate
          ref={animationY}
          attributeName="y2"
          from={start[1]}
          to={end[1]}
          dur="0.2s"
          repeatCount="1"
          restart='always'
        />
      </line>
    </>
  )
}

export default Edge
