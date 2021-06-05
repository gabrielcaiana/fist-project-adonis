// import Database from "@ioc:Adonis/Lucid/Database";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";
import {StoreValidator, UpdateValidator} from 'App/Validators/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    // Exibe os posts por ordem de criaçāo
    // const posts = await Post.all();

    // Exibe os posts ordenando por id
    const posts = await Post.query().orderBy('id')

    return posts;
  }

  public async store({ request, auth }: HttpContextContract) {
    // desconstruindo os dados que vem do frontend
    //const { title, content } = request.all()
    //const post = await Post.create({title, content})

    const data = await request.validate(StoreValidator)

    const user = await auth.authenticate()

    const post = await Post.create({ userId: user.id, ...data});

    await post.preload('author')

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

  public async update({request ,params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    post.merge(data)

    await post.save()

    await post.preload('author')

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  }
}
