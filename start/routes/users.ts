import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "UserController.index");
  Route.post("/", "UserController.store");
  Route.delete("/", "UserController.destroy");
}).prefix("/users");
