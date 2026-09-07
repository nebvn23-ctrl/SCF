import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE, hasContract } from '../config'

type Status = 'idle' | 'copied' | 'failed'

/** Abbreviated form for narrow screens. The full value is always copied. */
function abbreviate(value: string) {
  return value.length <= 18 ? value : `${value.slice(0, 7)}…${value.slice(-6)}`
}

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the legacy path below */
  }

  // Legacy fallback for insecure contexts / older browsers.
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function ContractAddress({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [status, setStatus] = useState<Status>('idle')
  const valueRef = useRef<HTMLElement | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = useCallback(async () => {
    const ok = await writeToClipboard(SITE.contractAddress)
    setStatus(ok ? 'copied' : 'failed')

    // If the clipboard is unavailable, select the text so the visitor can
    // copy it by hand instead of being left with nothing.
    if (!ok && valueRef.current) {
      const range = document.createRange()
      range.selectNodeContents(valueRef.current)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }

    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setStatus('idle'), 2600)
  }, [])

  return (
    <div className={`ca ca--${tone}`}>
      <span className="ca__label" aria-hidden="true">
        CA
      </span>

      {hasContract ? (
        <code className="ca__value" ref={valueRef}>
          <span className="ca__full">{SITE.contractAddress}</span>
          <span className="ca__short" aria-hidden="true">
            {abbreviate(SITE.contractAddress)}
          </span>
        </code>
      ) : (
        <span className="ca__value ca__value--empty">CA coming soon</span>
      )}

      <button
        type="button"
        className="ca__btn"
        onClick={onCopy}
        disabled={!hasContract}
        aria-label={
          hasContract
            ? `Copy the full contract address, ${SITE.contractAddress}`
            : 'Contract address not published yet'
        }
      >
        {status === 'copied' ? 'Copied' : 'Copy'}
      </button>

      <p className="ca__status" role="status" aria-live="polite">
        {status === 'copied' && 'Contract address copied to clipboard.'}
        {status === 'failed' &&
          'Copying failed. The address is selected — copy it manually.'}
      </p>
    </div>
  )
}
