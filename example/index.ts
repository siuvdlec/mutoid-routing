import { pipe } from 'fp-ts/function'
import { end, format, imap, int, lit, parse, rgx, Route, str, zero } from '../src/routing'

interface Home {
    readonly _tag: 'Home'
}

interface NotFound {
    readonly _tag: 'NotFound'
}

const home: Location = { _tag: 'Home' }

const notFound: Location = { _tag: 'NotFound' }

type Location = Home | NotFound

// https://www.facile.it/auto/dettaglio/lancia-nuova_ypsilon-10_hybrid_silver_ss_70cv-850CJ58.html

const defaults = end
const homeMatch = lit('home').then(str('id')).then(end)

const aaa = lit('auto')
    .then(lit('dettaglio'))
    .then(str('dettaglio'))
    .then(
        rgx(
            'hello',
            new RegExp(/(.*)-([\w]+)\.html/),
            _ppp => 'xx' as const,
            _ppp => 'zz'
        )
    )
    .then(end)

const y = pipe(
    str('id'),
    imap(
        ({ id }) => ({ userId: id }),
        ({ userId }) => ({ id: userId })
    )
)

const z = pipe(str('id'))

const router = zero<Location>()
    .alt(defaults.parser.map(() => home))
    .alt(homeMatch.parser.map(c => home))
    .alt(aaa.parser.map(c => home))
    .alt(y.parser.map(c => home))
    .alt(z.parser.map(c => home))

const parseLocation = (s: string): Location => parse(router, Route.parse(s), notFound)

const dd1 = format(y.formatter, { userId: 'asdf' })
const dd = format(z.formatter, { id: 'sfg' })

// Route

// Match = Parser + Formatter

// ---

// add RouteMatcher ?

// add Router in array di RouteMatcher ?
