import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class CreateUsersSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        name: 'Gabriel Caiana Guedes',
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      },
      {
        name: 'Normal',
        email: "normal@gmail.com",
        password: "123456",
        role: "normal",
      },
    ]);
  }
}
