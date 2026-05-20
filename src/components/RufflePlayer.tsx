import { useEffect, useRef } from 'react'

interface Props {
  swfUrl: string
  onLoad?: () => void
  onError?: (msg: string) => void
}

export default function RufflePlayer({ swfUrl, onLoad, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const onLoadRef = useRef(onLoad)
  const onErrorRef = useRef(onError)
  onLoadRef.current = onLoad
  onErrorRef.current = onError

  useEffect(() => {
    const ruffle = window.RufflePlayer?.newest()
    if (!ruffle) {
      onErrorRef.current?.('Ruffle failed to load')
      return
    }

    const player = ruffle.createPlayer()
    player.style.width = '100%'
    player.style.height = '100%'
    containerRef.current?.appendChild(player)

    player
      .load(swfUrl)
      .then(() => onLoadRef.current?.())
      .catch(() => onErrorRef.current?.('Failed to load SWF file'))

    return () => {
      if (containerRef.current?.contains(player)) {
        containerRef.current.removeChild(player)
      }
    }
  }, [swfUrl])

  return <div ref={containerRef} className="w-full h-full" />
}
