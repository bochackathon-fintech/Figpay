import { Component } from '@angular/core'

import { NavParams, ViewController } from 'ionic-angular'

@Component({
  selector: 'pin-modal',
  templateUrl: 'pin-modal.html'
})
export class PinModalComponent {
  public name
  public amount
  public password = ['', '', '', '']
  private passwordIndex = 0
  private passwordValue = ''

  constructor(
    private navParams: NavParams,
    private viewController: ViewController
  ) {
    this.name = this.navParams.get('name')
    this.amount = this.navParams.get('amount')
  }

  dial (number) {
    this.password[this.passwordIndex] = '*'
    this.passwordValue += number
    ++this.passwordIndex

    if (this.passwordIndex >= this.password.length) {
      this.viewController.dismiss({
        pin: this.passwordValue
      })
    }
  }
}
