import { Store, Pinia, Persist } from '../utils'

@Store
export class Global extends Pinia {
  @Persist
  FontSize = 16

  get FontSizeNum() {
    return this.FontSize
  }

  async SetFontSize(num) {
    this.FontSize = num
  }
}
