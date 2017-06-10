import { Component } from '@angular/core'

import { NavParams } from 'ionic-angular'

@Component({
  selector: 'pin-modal',
  templateUrl: 'pin-modal.html'
})
export class PinModalComponent {
  public name
  public amount
  public password = ['*', '*', '', '']

  constructor(
    private navParams: NavParams
  ) {
    this.name = this.navParams.get('name')
    this.amount = this.navParams.get('amount')
  }
}
