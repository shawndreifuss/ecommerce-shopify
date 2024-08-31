import authConfig from '@/auth.config'
import NextAuth from 'next-auth'


const { auth } = NextAuth( authConfig )

export default auth((req) => {
    const isLogged = !!req.auth
    console.log(`isLogged: ${isLogged}`)

})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/api|trpc)(.*)'],
}