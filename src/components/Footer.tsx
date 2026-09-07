import { SITE } from '../config'
import { XLink } from './XLink'

export function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__row">
        <p className="ftr__brand">
          {SITE.displayName} <span aria-hidden="true">/</span> {SITE.ticker}
        </p>
        <XLink className="ftr__x" label="Smoking Chicken Fish on X">
          X
        </XLink>
      </div>

      <p className="ftr__disc">
        $SCF is a meme token created for entertainment and community
        participation. Nothing here constitutes financial advice or guarantees
        any platform listing.
      </p>
    </footer>
  )
}
