import './PhotoWall.css'

type PhotoWallProps = {
  /** Photo URLs. Missing entries render as grey placeholders. */
  photos?: (string | undefined)[]
  /** How many tiles per row when no photos are supplied */
  placeholderCount?: number
}

/**
 * Two rows of photos that slowly slide in opposite directions
 * (Figma: CALEIGH MICRO INTERACTIONS, "Frame 422"). Pauses on hover.
 */
export default function PhotoWall({ photos, placeholderCount = 5 }: PhotoWallProps) {
  const tiles = photos?.length ? photos : Array<undefined>(placeholderCount).fill(undefined)
  const rows = [tiles, [...tiles].reverse()]

  return (
    <div className="photo-wall" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className={`photo-wall__row photo-wall__row--${r === 0 ? 'left' : 'right'}`}>
          {/* Rendered twice so the loop is seamless */}
          {[...row, ...row].map((src, i) =>
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
