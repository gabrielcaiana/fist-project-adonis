import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
