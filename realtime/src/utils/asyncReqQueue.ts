const asyncQueue: Array<() => Promise<void>> = []
let isProcessing = false

const addToAsyncQueue = async (fn: () => Promise<void>) => {
  asyncQueue.push(fn)
  if (!isProcessing) {
    await processAsyncQueue()
  }
}

const processAsyncQueue = async () => {
  if (asyncQueue.length > 0) {
    const fn = asyncQueue.shift()
    if (fn) {
      isProcessing = true
      await fn()
      isProcessing = false
      await processAsyncQueue()
    }
  }
}

export default addToAsyncQueue
