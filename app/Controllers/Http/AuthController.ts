import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { StoreValidator} from 'App/Validators/Auth'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    // capturo os dados da requisicao 
    const data = await request.validate(StoreValidator);

    // cria uma tentiva de autiticacao com o metodo auth.attempt e declara o tempo para expiracao do token
    const token = await auth.attempt(data.email, data.password, {
      expiresIn: "1 days",
    });

    // retorna o token para o frontend
    return token;
  }

  public async destroy({ auth }: HttpContextContract) {
    // realiza o logout destruindo o token
    await auth.logout()
  }
}
