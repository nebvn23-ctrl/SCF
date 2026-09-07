/* ============================================================================
 *  SITE CONFIGURATION — THIS IS THE ONLY FILE YOU NEED TO EDIT
 * ============================================================================
 *
 *  1. CONTRACT ADDRESS  -> paste it between the quotes of `contractAddress`
 *  2. X PROFILE URL     -> paste it between the quotes of `xUrl`
 *
 *  Leave a value as an empty string ("") and the site will show an honest
 *  "coming soon" / disabled state instead of a fake link or fake address.
 *  Nothing else in the project needs to change.
 * ========================================================================== */

export const SITE = {
  /** Display name. Shown in the header, hero heading and footer. */
  displayName: 'Smoking Chicken Fish',

  /** Ticker. Shown in the hero, header and throughout the copy. */
  ticker: '$SCF',

  /**
   * CONTRACT ADDRESS
   * Empty string = the CA blocks render "CA COMING SOON" and copying is
   * disabled. Paste the real address here when you have it, e.g.
   *   contractAddress: '7xKX...pump',
   */
  contractAddress: '0x44fc502a4717e85e2636d15e2dca1c448f67438c',

  /**
   * X PROFILE URL
   * Empty string = every X control renders in a clearly disabled state.
   * Paste the full URL when you have it, e.g.
   *   xUrl: 'https://x.com/yourhandle',
   */
  xUrl: 'https://x.com/SCFonRH',
} as const

/** True when a contract address has actually been supplied. */
export const hasContract = SITE.contractAddress.trim().length > 0

/** True when an X profile URL has actually been supplied. */
export const hasX = SITE.xUrl.trim().length > 0
