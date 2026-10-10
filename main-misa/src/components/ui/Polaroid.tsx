import './Polaroid.css'

type PolaroidProps = {
  /** Photo URL; a grey placeholder is shown when missing */
  src?: string
  alt?: string
  className?: string
}

/** White instant-photo frame used on Home (Figma: Group 46/47/48). */
export default function Polaroid({ src, alt = '', className = '' }: PolaroidProps) {
  return (
    <figure className={`polaroid ${className}`.trim()}>
      {src ? (
        <img className="polaroid__photo" src={src} alt={alt} />
      ) : (
        <div className="polaroid__photo placeholder">Photo</div>
      )}
    </figure>
  )
}
