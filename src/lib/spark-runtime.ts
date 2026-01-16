const sparkInstance = typeof window !== 'undefined' && window.spark ? window.spark : {
  llmPrompt: (strings: any, ...values: any[]): string => {
    if (Array.isArray(strings)) {
      return strings.reduce((result: string, str: string, i: number) => result + str + (values[i] || ''), '')
    }
    return String(strings)
  },
  llm: async () => {
    throw new Error('spark.llm not available')
  },
  user: async () => {
    throw new Error('spark.user not available')
  },
  kv: {
    keys: async () => [],
    get: async () => undefined,
    set: async () => {},
    delete: async () => {}
  }
}

export { sparkInstance as spark }
