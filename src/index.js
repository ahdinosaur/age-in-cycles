import { differenceInSeconds } from 'date-fns'

const ORBITAL_PERIODS_IN_EARTH_DAYS = {
  Mercury: 87.969,
  Venus: 224.701,
  Earth: 365.256,
  Moon: 29.5305891,
  Mars: 686.98,
  Jupiter: 4332.589,
  Saturn: 10759.22,
  Uranus: 30685.4,
  Neptune: 60189.0,
  Pluto: 90560.0,
}

const HOURS_IN_DAY = 24
const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const SECONDS_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE

export function getAgeInCyclesForOrbitalBody(orbitalBody, startTime, endTime) {
  if (!(orbitalBody in ORBITAL_PERIODS_IN_EARTH_DAYS)) {
    throw new Error(`Unexpected orbital body: ${orbitalBody}`)
  }

  const orbitalPeriodInEarthDays = ORBITAL_PERIODS_IN_EARTH_DAYS[orbitalBody]
  const orbitalPeriodInSeconds = orbitalPeriodInEarthDays * SECONDS_IN_DAY

  const lengthInSeconds = differenceInSeconds(endTime, startTime)

  const ageInCycles = lengthInSeconds / orbitalPeriodInSeconds

  return ageInCycles
}

export function getAgeInCycles(startTime, endTime) {
  return Object.keys(ORBITAL_PERIODS_IN_EARTH_DAYS).reduce((sofar, next) => {
    sofar[next] = getAgeInCyclesForOrbitalBody(next, startTime, endTime)
    return sofar
  }, {})
}
