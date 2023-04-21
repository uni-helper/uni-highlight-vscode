export function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timeoutId)
      clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      func.apply(this, args)
      timeoutId = null
    }, delay)
  }
}
