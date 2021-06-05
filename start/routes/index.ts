import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './posts'
import './users'

Route.get('/', async () => {
    return { hello: 'world'}
})


