import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
	// regra para remover os espaçamentos em branco do titulo
	titile: schema.string({ trim: true}, [rules.unique({ table: 'posts', column: 'title'})]),
	content: schema.string({ trim: true}),
  })
  public messages = {}
}
