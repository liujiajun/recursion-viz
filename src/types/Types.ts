export type Point = [number, number]

export type Var = {name: string, value: any}

export type FunctionContent = {
  body: string,
  params: string[],
  args: any[],
  enableMemo: boolean,
}

export type AdjList = Record<number, number[]>

export type VerticesContext = Record<number, {args: any[], returnValue: any[], isMemo: boolean}>

export type TreeNode = {
  id: number,
  parent: TreeNode | null,
  children: TreeNode[],

  x: number,
  y: number,
  mod: number,

}

export type VerticesInfo = Record<number, {
  id: number,
  coords: Point,
  appearFrom: number,
  highlightAt: number[],
  label?: string
}>

export type EdgesInfo = Record<string, {
  u: number,
  v: number,
  interval: [number, number],
  label?: string
}>

export type HighlightStatus = 'memo' | 'current' | 'normal'

export type Template = {
  name: string,
  fnContent: FunctionContent
}
