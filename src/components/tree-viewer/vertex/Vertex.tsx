import * as React from 'react'
import { HighlightStatus, Point } from '../../../types/Types'
import { NODE_RADIUS } from '../Constants'

type Props = {
  center: Point,
  highlight: HighlightStatus,
  label?: string
}

const Vertex = ({ center, highlight, label } : Props) => {
  const scaleCss = label ? `scale(${Math.min(1, 1 / label.length * 1.6)})` : 'scale(1)'

  return (
    <>
      <circle cx={center[0]}
              cy={center[1]}
              fill={highlight === 'normal' ? 'transparent' : highlight === 'memo' ? '#3182CE' : '#319795'}
              stroke={highlight === 'normal' ? 'black' : highlight === 'memo' ? '#3182CE' : '#319795'}
              r={ NODE_RADIUS }
              strokeWidth="3"
      />
      <text x={center[0]}
            y={center[1]}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill={highlight === 'normal' ? 'black' : 'white'}
            dy="0.2rem"
            fontSize="45"
            style={{
              transform: scaleCss,
              transformOrigin: 'center',
              transformBox: 'fill-box'
            }}
      >
        {label}
      </text>
    </>
  )
}

export default Vertex
