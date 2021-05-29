import Route from '@ioc:Adonis/Core/Route'

// o metodo resource sabe criar automaticamente todas as rotas, sendo assim nao precisa criar get, post, put e delete
// o metodo apiOnly() fornece apenas os metodos que foram criados no controller e nao todos que vem por padrao no adonis do MVC

// com o comando no terminal node ace list:routes consigo visualizar todas as rotas criadas
Route.resource('/posts', 'PostsController').apiOnly().middleware({
    //definindo quais metodos do controller serao protegidos e quais serao as middlewares
    store: ['acl:admin'],
    update: ['acl:admin'],
    destroy: ['acl:admin']
})