import { Point } from '../../types/Types'
import {NODE_RADIUS, SCALE_FACTOR, TRANS_FACTOR} from './Constants'

export function getScaledAndTranslatedCoords (raw: Point, k: number = 1): Point {
  return [raw[0] * SCALE_FACTOR[0] + k * TRANS_FACTOR[0],
    raw[1] * SCALE_FACTOR[1] + k * TRANS_FACTOR[1]]
}

export function moveToCircleBorder (start: Point, end: Point): [Point, Point] {
  // x2: end[0] y2: end[1]
  // x1: start[0] y1: start[1]
  const dis = Math.sqrt((end[1] - start[1]) ** 2 + (end[0] - start[0]) ** 2)
  const a = NODE_RADIUS * (end[0] - start[0]) / dis
  return [pointOnLine(start, end, a), pointOnLine(start, end, end[0] - start[0] - a)]
}

function pointOnLine (start: Point, end: Point, xDis: number): Point {
  const k = (end[1] - start[1]) / (end[0] - start[0])
  const x = start[0] + xDis
  const y = k * x + (end[1] - k * end[0])
  return [x, y]
}
