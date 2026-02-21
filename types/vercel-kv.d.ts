declare module '@vercel/kv' {
  export const kv: {
    set: (key: string, value: unknown) => Promise<unknown>
    zadd: (
      key: string,
      value: {
        score: number
        member: string
      }
    ) => Promise<unknown>
  }
}
