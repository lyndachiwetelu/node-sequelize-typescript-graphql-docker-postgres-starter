import { Table, Column, Model, BeforeCreate } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

@Table({
    tableName: "User"
})

export default class User extends Model {
  @Column(DataTypes.STRING)
  name: string

  @Column(DataTypes.STRING)
  email: string

  @Column(DataTypes.STRING)
  password: string

  public toJSON() {
    return this.get({plain:true})
  }

  @BeforeCreate
  public static hashPassword(instance: User) {
    const salt = bcrypt.genSaltSync();
    instance.set('password', bcrypt.hashSync(instance.get('password'), salt));
  }

  public validPassword = (password:string) => {
    return bcrypt.compareSync(password, this.get('password'));
  }

  public withoutPassword = () => {
    const user = this.toJSON()
    delete user.password
    return user
  }

}