const EARTH_RADIUS_METERS = 6371008.8

function toRad(deg) {
  return (deg * Math.PI) / 180
}

// Accepts both {lat, lng} plain objects and Google Maps LatLng objects (with .lat()/.lng() methods)
function norm(p) {
  return typeof p.lat === 'function' ? { lat: p.lat(), lng: p.lng() } : p
}

export function computeDistanceBetween(a, b) {
  const pa = norm(a)
  const pb = norm(b)
  const dLat = toRad(pb.lat - pa.lat)
  const dLng = toRad(pb.lng - pa.lng)
  const sinDLat = Math.sin(dLat / 2)
  const sinDLng = Math.sin(dLng / 2)
  const c = sinDLat * sinDLat + Math.cos(toRad(pa.lat)) * Math.cos(toRad(pb.lat)) * sinDLng * sinDLng
  return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
}

export function computeLength(path) {
  if (!path?.length || path.length < 2) return 0
  let total = 0
  for (let i = 1; i < path.length; i++) total += computeDistanceBetween(path[i - 1], path[i])
  return total
}

export function interpolateBetween(a, b, t) {
  const pa = norm(a)
  const pb = norm(b)
  return { lat: pa.lat + (pb.lat - pa.lat) * t, lng: pa.lng + (pb.lng - pa.lng) * t }
}

export function computeHeading(from, to) {
  const pf = norm(from)
  const pt = norm(to)
  const dLng = toRad(pt.lng - pf.lng)
  const fromLat = toRad(pf.lat)
  const toLat = toRad(pt.lat)
  const y = Math.sin(dLng) * Math.cos(toLat)
  const x = Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLng)
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}
