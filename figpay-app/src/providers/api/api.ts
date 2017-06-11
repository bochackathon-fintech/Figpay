import { Injectable } from '@angular/core'

import { Http, Headers } from '@angular/http'

import { ModalController } from 'ionic-angular'

import { API_BASE_URL } from '../../constants'

import { PinModalComponent } from '../../components/pin-modal/pin-modal'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

@Injectable()
export class ApiProvider {
  constructor(
    private http: Http,
    private modalController: ModalController
  ) {}

  pay (data) {
    return new Promise((resolve, reject) => {
      this.recognize(data)
        .then((res:any) => {
          console.log('[ApiProvider] recognize', res)

          data = Object.assign(data, res.data)

          const modalData = {
            name: data.name,
            amount: data.amount
          }
          const modal = this.modalController.create(PinModalComponent, modalData)
          modal.onDidDismiss((res) => {
            console.log('[ApiProvider] PinModalComponent onDismiss', res)

            data = Object.assign(data, res)

            this.makePayment(data)
              .then(resolve)
              .catch((err) => {
                if (err.status === 403) {
                  return reject('Wrong PIN number')
                }

                reject('Something went wrong')
              })
          })
          modal.present()
        })
        .catch((err) => {
          if (err.status === 400) {
            return reject('Face not recognized. Please face the camera')
          } else if (err.status === 404) {
            return reject('Profile not found')
          }

          reject('Something went wrong')
        })
    })
  }

  private recognize (data) {
    return new Promise((resolve, reject) => {
      const postData = {
        file: data.file
      }
      this.http
        .post(`${API_BASE_URL}/recognize`, postData, this.getHeaders())
        .first()
        .map((res) => res.json())
        .subscribe(resolve, reject)
    })
  }

  private makePayment (data) {
    return new Promise((resolve, reject) => {
      const postData = {
        pos: '4e5ce2d9-852a-4160-b544-5688f39dcc4f',
        consumer: data.userId,
        pin: data.pin,
        amount: data.amount,
        description: 'KEO 1/2 pint'
      }
      this.http
        .post(`${API_BASE_URL}/vendor/payments/`, postData, this.getHeaders())
        .first()
        .map((res) => res.json())
        .subscribe(resolve, reject)
    })
  }

  private getHeaders () {
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')

    headers.append('Authorization', 'Token 753400d7e1b1a40d36b78a23fab3c5775799dae9')

    return { headers }
  }
}
