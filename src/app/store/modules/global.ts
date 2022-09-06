import { Store, Pinia, Persist } from '../utils'

@Store
export class Global extends Pinia {
  @Persist
  FontSize = 16
  ticketId = ''

  get FontSizeNum() {
    return this.FontSize
  }
  get GetTicketId() {
    return this.ticketId
  }

  async SetFontSize(num) {
    this.FontSize = num
  }
  async SetTicketId(ticketId) {
    this.ticketId = ticketId
  }
}
