import { Store, Pinia, Persist } from '../utils'

@Store
export class User extends Pinia {
  // 使用Persist修饰器持久化数据
  @Persist
  location = []

  // 允许直接编写getter
  get locationArr() {
    return this.location
  }

  // 或action
  async addLocation(location) {
    this.location = location
  }
}
