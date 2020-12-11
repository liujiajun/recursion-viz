import * as React from 'react'
import { Point } from '../../../types/Types'

type Props = {
  center: Point
}

const Vertex = ({ center } : Props) => {
  return (
    <circle cx={center[0]} cy={center[1]} r="30" stroke="black" strokeWidth="1" fill="transparent"/>
  )
}

export default Vertex
