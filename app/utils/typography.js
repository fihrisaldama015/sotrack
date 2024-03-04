import { Inter, Lato, Montserrat } from 'next/font/google'

const lato = Lato({
    weight: '400',
    subsets: ['latin']
})

const latoBold = Lato({
    weight: '700',
    subsets: ['latin']
})

const montserrat = Montserrat({
    weight: '400',
    subsets: ['latin']
})

const inter = Inter({
    weight: '400',
    subsets: ['latin']
})

export{lato,latoBold,montserrat,inter}