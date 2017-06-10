import { Injectable } from '@angular/core'

import { Http } from '@angular/http'

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
      this.http
        .post(`${API_BASE_URL}/recognize`, {
          file: data.file
        })
        .first()
        .subscribe((next) => {
          console.log(next)
        }, reject)
    })
  }
}
