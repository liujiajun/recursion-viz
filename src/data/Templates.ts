import { Template } from '../types/Types'

const templates: Record<string, Template> = {
  custom: {
    name: 'Custom',
    fnContent: {
      body: '// write your recursive function here!',
      params: [],
      args: [],
      enableMemo: false
    }
  },
  fib: {
    name: 'Fibonacci',
    fnContent: {
      body:
        `if (n == 0 || n == 1) return n;
  return fn(n - 1) + fn(n - 2);`,
      params: ['n'],
      args: [3],
      enableMemo: true
    }
  }
}

export default templates
