import Route from "@ioc:Adonis/Core/Route";

// Exemplo definindo as rotas de da forma padrao

// Route.post('/auth', 'AuthController.store')
// Route.delete('/auth', 'AuthController.destroy')

// Exemplo agrupando as rotas e definindo um prefixo, ideal para quando existe uma quantidade grande de rotas

Route.group(() => {
  Route.post("/", "AuthController.store");
  Route.delete("/", "AuthController.destroy");
}).prefix("/auth");
