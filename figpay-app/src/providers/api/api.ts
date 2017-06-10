import { Injectable } from '@angular/core'

import { Http, Headers } from '@angular/http'

import { API_BASE_URL } from '../../constants'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'

@Injectable()
export class ApiProvider {
  constructor(
    public http: Http
  ) {}

  pay (data) {
    return new Promise((resolve, reject) => {
      this.recognize(data)
        .then((res:any) => {
          console.log('[ApiProvider] recognize', res)

          return this.makePayment(Object.assign(data, res.data))
        })
        .then(resolve)
        .catch(reject)
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
        pin: '1234',
        amount: data.amount,
        description: 'KEO 1/2 pint'
      }
      this.http
        .post(`${API_BASE_URL}/payments/vendors/`, postData, this.getHeaders())
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
