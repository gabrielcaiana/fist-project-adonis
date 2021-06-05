import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title:string

  @column()
  public content:string

  // serializeAs: null oculta o valor no retorno do json
  @column({serializeAs: null})
  public userId:number
  // com a chave extrangeira user_id nem precisaria passar o parametro foreingnKey com o valor, o adonis ja saberia montar
  @belongsTo(() => User, {foreignKey: 'userId'})
  public author: BelongsTo<typeof User>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
