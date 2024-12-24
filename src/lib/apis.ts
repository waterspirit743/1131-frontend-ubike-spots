export type Location = {
  lat: number
  lng: number
}

export type Spot = {
  name: string
  location: Location
  total_lots: number
  n_empty_lots: number
  n_currenet_lots: number
}

type RawSpot = {
  ar: string // name
  lat: string
  lng: string
  tot: string // total_lots
  sbi: string // n_current_lots
  bemp: string // n_empty_lots
}

type ResponseData = {
  retCode: number
  retVal: RawSpot[]
}

export async function fetchUbike(): Promise<Spot[]> {
  const response = await fetch(
    'https://datacenter.taichung.gov.tw/swagger/OpenData/86dfad5c-540c-4479-bb7d-d7439d34eeb1',
  )
  const json: ResponseData = await response.json()
  if (json.retCode !== 1) {
    alert("Can't get data")
    return []
  }
  return json.retVal.map(parseSpot)
}

function parseSpot(rawSpot: RawSpot): Spot {
  return {
    name: rawSpot.ar,
    location: {
      lat: parseFloat(rawSpot.lat),
      lng: parseFloat(rawSpot.lng),
    },
    total_lots: parseInt(rawSpot.tot),
    n_currenet_lots: parseInt(rawSpot.sbi),
    n_empty_lots: parseInt(rawSpot.bemp),
  }
}
