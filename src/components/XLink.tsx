import { SITE, hasX } from '../config'

type Props = {
  children: React.ReactNode
  className?: string
  /** Text announced to assistive tech when the link is live. */
  label?: string
}

/**
 * Renders a real external anchor when an X URL is configured, and a plainly
 * disabled control when it is not. It never renders href="#" or a fake handle.
 */
export function XLink({ children, className = '', label }: Props) {
  if (!hasX) {
    return (
      <button
        type="button"
        className={`${className} is-unavailable`}
        disabled
        title="X profile not published yet"
      >
        {children}
        <span className="visually-hidden"> — not available yet</span>
      </button>
    )
  }

  return (
    <a
      className={className}
      href={SITE.xUrl}
      target="_blank"
      rel="noopener noreferrer external"
      aria-label={label}
    >
      {children}
    </a>
  )
}
