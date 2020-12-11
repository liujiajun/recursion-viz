import { AdjList, FunctionContent, VerticesContext } from '../../types/Types'

const getUserFnDeclaration = (fnContent: FunctionContent) => {
  const paramsList = fnContent.params.map(v => v.name).join(', ')

  const fnDeclaration = `var x; x = function (${paramsList}) {
    ${fnContent.body}
  }`

  return fnDeclaration
}

export default function getRecursionTree (fnContent: FunctionContent): [AdjList, VerticesContext] {
  // eslint-disable-next-line no-eval
  const userFunction: Function = eval(getUserFnDeclaration(fnContent))

  const callStack: number[] = []
  const adjList: AdjList = {}
  const verticesContext: VerticesContext = {}
  let v = 0

  function fnWrapper (...args: any[]) {
    if (callStack.length > 0) {
      const u = callStack[callStack.length - 1]

      if (!adjList[u]) {
        adjList[u] = []
      }

      if (!adjList[v]) {
        adjList[v] = []
      }

      adjList[u].push(v)
    }

    callStack.push(v)
    const curV = v
    v++

    const res = userFunction.apply(self, args)
    verticesContext[curV] = { args: args, returnValue: res }

    callStack.pop()

    return res
  }

  const fn = fnWrapper
  const args = fnContent.params.map(v => v.value)
  fn(...args)

  return [adjList, verticesContext]
}
