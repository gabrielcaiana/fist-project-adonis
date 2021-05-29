import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    // capturo os dados da requisicao 
    const { email, password } = request.all();

    // cria uma tentiva de autiticacao com o metodo auth.attempt e declara o tempo para expiracao do token
    const token = await auth.attempt(email, password, {
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
