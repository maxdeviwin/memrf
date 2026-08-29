var E = 'mainnet-beta',
  m = 'https://oqgrxtobtscsnkvwdzlx.supabase.co/functions/v1/payment-api',
  g = {
    devnet: ['https://api.devnet.solana.com'],
    testnet: ['https://api.testnet.solana.com'],
    'mainnet-beta': [
      'https://solana-rpc.publicnode.com',
      'https://public.rpc.solanavibestation.com',
    ],
  },
  L = g[E],
  S = L[0]
var y = {
  '/': '/',
  '/create-token': '/create-token',
  '/liquidity': '/liquidity',
}
function x() {
  let t = location.pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
  return y[t] || (t === '' ? '/' : 'other')
}
function h(t = 'view') {
  try {
    let e = JSON.stringify({
        path: x(),
        event: t,
        ref: document.referrer ? new URL(document.referrer).host : '',
      }),
      o = `${m}/hit`
    if (navigator.sendBeacon) {
      navigator.sendBeacon(o, new Blob([e], { type: 'application/json' }))
      return
    }
    fetch(o, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: e,
      keepalive: true,
    }).catch(() => {})
  } catch {}
}
document.visibilityState === 'hidden'
  ? document.addEventListener('visibilitychange', function t() {
      document.visibilityState !== 'hidden' &&
        (document.removeEventListener('visibilitychange', t), h())
    })
  : h()
var r = document.createElement('div')
r.className = 'scrollbar'
var n = document.createElement('div')
n.className = 'scrollbar-thumb'
r.appendChild(n)
document.body.appendChild(r)
var T = 44,
  l,
  d = false
function v() {
  let t = document.documentElement,
    e = t.clientHeight,
    o = Math.max(t.scrollHeight, document.body.scrollHeight),
    s = o - e,
    i = Math.max(T, Math.round((e / o) * e))
  return {
    view: e,
    total: o,
    scrollable: s,
    height: i,
    travel: e - i,
  }
}
function c() {
  let { scrollable: t, height: e, travel: o } = v()
  if (t <= 1) {
    r.classList.remove('on', 'show')
    return
  }
  r.classList.add('on')
  let s = (window.scrollY / t) * o
  n.style.height = `${e}px`
  n.style.transform = `translateY(${Math.max(0, Math.min(o, s))}px)`
}
function p() {
  c()
  r.classList.contains('on') &&
    (r.classList.add('show'),
    clearTimeout(l),
    !d && (l = setTimeout(() => r.classList.remove('show'), 900)))
}
window.addEventListener('scroll', p, { passive: true })
window.addEventListener('resize', p)
window.ResizeObserver && new ResizeObserver(c).observe(document.body)
n.addEventListener('pointerdown', (t) => {
  t.preventDefault()
  let { scrollable: e, travel: o } = v()
  if (e <= 1 || o <= 0) {
    return
  }
  let s = t.clientY,
    i = window.scrollY
  d = true
  clearTimeout(l)
  r.classList.add('show', 'dragging')
  n.setPointerCapture(t.pointerId)
  let u = (w) => {
      let b = ((w.clientY - s) / o) * e
      window.scrollTo({
        top: i + b,
        behavior: 'instant',
      })
    },
    a = () => {
      d = false
      r.classList.remove('dragging')
      n.releasePointerCapture?.(t.pointerId)
      n.removeEventListener('pointermove', u)
      n.removeEventListener('pointerup', a)
      n.removeEventListener('pointercancel', a)
      p()
    }
  n.addEventListener('pointermove', u)
  n.addEventListener('pointerup', a)
  n.addEventListener('pointercancel', a)
})
c()
window.addEventListener('load', c)
var A = document.getElementById('toast')
var f = document.querySelector('.site-header')
if (f) {
  let t = () => f.classList.toggle('scrolled', window.scrollY > 10)
  window.addEventListener('scroll', t, { passive: true })
  t()
}
