import { Component } from '@angular/core'

import {
  CameraPreview, CameraPreviewOptions,
  CameraPreviewPictureOptions
} from '@ionic-native/camera-preview'
import {WS_SERVER_URL} from "../../constants";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public price = 0
  public cameraPreviewEnabled = false
  private ws


  constructor(
    private cameraPreview: CameraPreview
  ) {}

  ionViewDidLoad () {
    this.initSocket()
  }

  pay () {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 500,
      height: 500
    }
    this.cameraPreview
      .takePicture(pictureOpts)
      .then((imageData) => {
        console.log('data:image/jpeg;base64,' + imageData)

        this.cameraPreview
          .stopCamera()
          .then((res) => {
            this.cameraPreviewEnabled = false
            console.log('[HomePage] stopCamera', res)
          })
          .catch((err) => {
            console.error('[HomePage] stopCamera', err)
          })
      }, (err) => {
        console.log(err)
      })
  }

  getContentStyle () {
    return {
      background: this.cameraPreviewEnabled ? 'transparent' : ''
    }
  }

  private startCameraPreview () {
    console.log('[HomePage] starting cameraPreview')

    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: this.cameraPreview.CAMERA_DIRECTION.FRONT,
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }

    this.cameraPreview
      .startCamera(cameraPreviewOpts)
      .then(
        (res) => {
          console.log('[HomePage] cameraPreview startCamera', res)
          this.cameraPreviewEnabled = true
        },
        (err) => {
          console.error('[HomePage] cameraPreview startCamera', err)
        })
  }

  private initSocket () {
    console.log('[HomePage] initSocket')

    this.ws = new WebSocket(WS_SERVER_URL)
    this.ws.onopen = this.wsOnOpen.bind(this)
    this.ws.onmessage = this.wsOnMessage.bind(this)
    this.ws.onerror = this.wsOnError.bind(this)
    this.ws.onclose = this.wsOnClose.bind(this)
  }

  private wsOnOpen () {
    console.log('[HomePage] wsOnOpen')
  }

  private wsOnMessage (res) {
    console.log('[HomePage] wsOnMessage', res)

    res = JSON.parse(res.data)

    console.log('[HomePage] command', res)

    if (res.command === 'fig') {
      this.price = res.value
      this.startCameraPreview.bind(this)
    }
  }

  private wsOnError (err) {
    console.error('[HomePage] wsOnError', err)
  }

  private wsOnClose (code, message) {
    console.log('[HomePage] wsOnClose', code, message)

    setTimeout(this.initSocket.bind(this), 5000)
  }
}
