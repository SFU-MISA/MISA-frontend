import './PhotoWall.css'

type PhotoWallProps = {
  /** Photo URLs. Missing entries render as grey placeholders. */
  photos?: (string | undefined)[]
  /** How many tiles per row when no photos are supplied */
  placeholderCount?: number
  direction?: 'left' | 'right'
}

/**
 * Two rows of photos that slowly slide in opposite directions
 * (Figma: CALEIGH MICRO INTERACTIONS, "Frame 422"). Pauses on hover.
 */
export default function PhotoWall({ photos, placeholderCount = 5, direction }: PhotoWallProps) {
  const tiles = photos?.length ? photos : Array<undefined>(placeholderCount).fill(undefined)
  const allRows = [
    { dir: 'left', tiles },
    { dir: 'right', tiles: [...tiles].reverse() },
  ]
  const rows = direction ? allRows.filter((row) => row.dir === direction) : allRows

  return (
    <div className="photo-wall" aria-hidden="true">
      {rows.map((row) => (
        <div key={row.dir} className={`photo-wall__row photo-wall__row--${row.dir}`}>
          {/* Rendered twice so the loop is seamless */}
          {[...row.tiles, ...row.tiles].map((src, i) =>
            src ? (
              <img key={i} className="photo-wall__tile" src={src} alt="" />
            ) : (
              <div key={i} className="photo-wall__tile placeholder" />
            ),
          )}
        </div>
      ))}
    </div>
  )
}
