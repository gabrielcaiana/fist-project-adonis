import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { StoreValidator, UpdateValidator } from 'App/Validators/User'

export default class UserController {
  public async index({}: HttpContextContract) {
    const users = await User.query().orderBy("id", "asc");

    return users;
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const user = await User.create(data);

    return user;
  }

  public async show({ params }: HttpContextContract) {
     const user = await User.findOrFail(params.id)

    return user;
  }

  public async update({request, params}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    user.merge(data)

    await user.save()

    return user
    
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}
