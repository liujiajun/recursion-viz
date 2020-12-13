import { FunctionContent, Point } from '../../types/Types'
import { NODE_RADIUS, SCALE_FACTOR, TRANS_FACTOR } from './Constants'

export function getScaledAndTranslatedCoords (raw: Point, k: number = 1): Point {
  return [raw[0] * SCALE_FACTOR[0] + k * TRANS_FACTOR[0],
    raw[1] * SCALE_FACTOR[1] + k * TRANS_FACTOR[1]]
}

export function moveToCircleBorder (start: Point, end: Point): [Point, Point] {
  // FIXME: a small part of the line is inside circle
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

export function toFunctionContent (code: string, call: string, enableMemo: boolean): FunctionContent {
  const params = split(between(code))

  const body = between(code, '{', '}')

  const args = split(between(call))

  return { body, params, args, enableMemo }
}

export function toCodeAndCall (fnContent: FunctionContent): [string, string] {
  const code = `function fn (${fnContent.params.join(', ')}) {
  ${fnContent.body}
}`
  const call = `fn(${fnContent.args.join(', ')})`

  return [code, call]
}

function between (str: string, left: string = '(', right: string = ')') {
  const leftIdx = str.indexOf(left) + 1
  const rightIdx = str.indexOf(right)
  return str.substring(leftIdx, rightIdx).trim()
}

function split (str: string, delimiter: string = ',') {
  // FIXME: something like 'a, '
  if (str.trim() === '') {
    return []
  }
  return str.split(delimiter).map(value => value.trim())
}
