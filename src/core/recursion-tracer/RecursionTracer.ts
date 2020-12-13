import { AdjList, FunctionContent, VerticesContext } from '../../types/Types'

const MAX_VERTICES = 200

const getUserFnDeclaration = (fnContent: FunctionContent) => {
  const params = fnContent.params.join(', ')

  const fnDeclaration = `var x; x = function (${params}) {
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
  const memo: Record<string, any> = {}

  let v = 0

  function fnWrapper (...args: any[]) {
    if (v >= MAX_VERTICES) {
      throw new Error(`Too many vertices. Maximum number of vertices allowed: ${MAX_VERTICES}.`)
    }

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

    let res

    if (fnContent.enableMemo && JSON.stringify(args) in memo) {
      res = memo[JSON.stringify(args)]
      v++
      verticesContext[curV] = { args: args, returnValue: res, isMemo: true }
    } else {
      res = userFunction.apply(self, args)
      verticesContext[curV] = { args: args, returnValue: res, isMemo: false }
    }

    if (fnContent.enableMemo) {
      memo[JSON.stringify(args)] = res
    }

    callStack.pop()

    return res
  }

  const fn = fnWrapper
  const args = fnContent.args
  fn(...args)

  return [adjList, verticesContext]
}
