interface RufflePlayerElement extends HTMLElement {
  load(config: string | { url: string }): Promise<void>
  play(): void
  pause(): void
  destroy(): void
  volume: number
}

interface Window {
  RufflePlayer?: {
    config?: Record<string, unknown>
    newest(): {
      createPlayer(): RufflePlayerElement
    }
  }
}
