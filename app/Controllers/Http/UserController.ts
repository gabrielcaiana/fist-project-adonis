import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UserController {
  public async index({}: HttpContextContract) {
    const users = await User.query().orderBy("id", "asc");

    return users;
  }

  public async store({ request, auth }: HttpContextContract) {
    const { name, email, password } = await request.all();

    const user = await User.create({ name, email, password });

    return user;
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}
