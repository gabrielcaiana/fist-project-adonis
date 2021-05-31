import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
	email: schema.string({ trim: true}),
	password: schema.string({ trim: true}, [rules.minLength(6), rules.maxLength(10)])
  })
  public messages = {}
}
