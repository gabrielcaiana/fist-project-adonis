import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Post from "App/Models/Post";

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.all();

    return posts;
  }

  public async store({ request }: HttpContextContract) {
    // desconstruindo os dados que vem do frontend
    //const { title, content } = request.all()
    //const post = await Post.create({title, content})

    const data = await request.only(["title", "content"]);

    const post = await Post.create(data);

    return post;
  }

  public async show({ params }: HttpContextContract) {
    // Realizando uma busca por um post no banco de dados utilizando SQL
    // const post = await Database.rawQuery(`select * from posts where id = ${params.id}`)

    // Exemplos de utilizando do find

    // Busca no banco de dados um post por Id
    // const post = await Post.find(params.id);

    // Busca no banco de dados por algum tipo de informaçāo
    // const post = await Post.findBy('title', params.title)
    

    // Busca no banco de dados e caso nao encontre exibe o erro automaticamente
    // Ao utilizar o findOrFail nao preciso utilizar o codigo abaixo e nao preciso pegar na requisicao o "response"

     // if (!Post) {
    //   return response.notFound({ error: { message: "Not found!" } });
    // }

     const post = await Post.findOrFail(params.id)

    return post;
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
