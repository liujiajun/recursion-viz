import * as React from 'react'
import { HighlightStatus, Point } from '../../../types/Types'

type Props = {
  start: Point,
  end: Point,
  highlight: HighlightStatus,
  label?: String,

}

const Edge = ({ start, end, highlight, label } : Props) => {
  return (
    <>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} strokeWidth={1} stroke="black"/>
    </>
  )
}

export default Edge
