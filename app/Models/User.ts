import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { column, beforeSave, BaseModel } from "@ioc:Adonis/Lucid/Orm"; // import computed caso for usar

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  // A propriedade s"erializeAs: null" oculta a senha para o frontend
  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  // @computed()
  // public get firstName() {
  //   return this.name.split(' ')[0]
  // }

  @column()
  public role: "admin" | "normal";

  @column()
  public rememberMeToken?: string;

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
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

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
