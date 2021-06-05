import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import {CherryPick } from '@ioc:Adonis/Lucid/Model'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public content: string;

  // serializeAs: null oculta o valor no retorno do json
  @column({ serializeAs: null })
  public userId: number;
  // com a chave extrangeira user_id nem precisaria passar o parametro foreingnKey com o valor, o adonis ja saberia montar
  @belongsTo(() => User, { foreignKey: "userId" })
  public author: BelongsTo<typeof User>;

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      // return value.toFormat('dd/MM/yyyy') retorna apenas a data
      return value.toFormat("dd/MM/yyyy HH:mm:ss");
    },
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat("dd/MM/yyyy HH:mm:ss");
    },
  })
  public updatedAt: DateTime;

  // Serializando os relacionamentos e tratando quais propriedades serao retornadas
  public serialize(cherryPick?: CherryPick) {
    return {
      ...this.serializeAttributes(cherryPick?.fields, false),
      ...this.serializeComputed(cherryPick?.fields),
      ...this.serializeRelations({
        author: {
          fields: ['id','email', 'firstName'] // especificando quais campos serao exibidos
          // fields: { omit: ['id','email', 'firstName'] } // especificando quais campos serao ocultados
        }
      }, false)
    }
  }
}
