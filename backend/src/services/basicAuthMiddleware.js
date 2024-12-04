import basicAuth from 'express-basic-auth'

// const basicAuthMiddleware = (_, __, next) => next() // dev

const basicAuthMiddleware = basicAuth({
    users: {
        admin: 'secret_admin',
        user: 'secret_user'
    },
    challenge: true,
    unauthorizedResponse: '401 Unauthorized',
})

export default basicAuthMiddleware;