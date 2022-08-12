import { Store, Pinia, Persist } from '../utils'

@Store
export class User extends Pinia {
  // 使用Persist修饰器持久化数据
  @Persist
  location = []
  name = ''
  area = ''
  line = ''
  resetUpScroll = false

  // 允许直接编写getter
  get locationArr() {
    return this.location
  }

  // 或action
  async addLocation(location) {
    this.location = location
  }
  async addName(name) {
    this.name = name
  }
  async addArea(area) {
    this.area = area
  }
  async addLine(line) {
    this.line = line
  }
  async addresetUpScroll() {
    this.resetUpScroll = !this.resetUpScroll
  }
}
