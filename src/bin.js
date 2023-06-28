import { Command } from 'commander'
import {parseISO} from 'date-fns'

import { getAgeInCycles } from './index.js'

const program = new Command()

program
  .name('age-in-cycles')
  .description('what is your age in orbital body cycles?')
  .version('0.0.0')

program
  .argument('<orbitalBody>', 'orbital body (Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)')
  .requiredOption('--start <date>', 'start (birth) date')
  .option('--end <date>', 'end (death) date, or today if still alive')
  .action((orbitalBody, options) => {
    const { start, end } = options

    const startDate = parseISO(start)
    const endDate = end === undefined ? new Date() : parseISO(end)
    const ageInCycles = getAgeInCycles(orbitalBody, startDate, endDate)

    console.log(`Age in ${orbitalBody} cycles: ${ageInCycles.toFixed(2)}`)
  })

program.parse()
