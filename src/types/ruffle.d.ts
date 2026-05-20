interface RufflePlayerElement extends HTMLElement {
  load(config: string | { url: string }): Promise<void>
}

interface Window {
  RufflePlayer?: {
    config?: Record<string, unknown>
    newest(): {
      createPlayer(): RufflePlayerElement
    }
  }
}
