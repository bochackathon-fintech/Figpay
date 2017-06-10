import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { Http, HttpModule} from '@angular/http'

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { CameraPreview } from '@ionic-native/camera-preview'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'

import { MyApp } from './app.component'

import { HomePage } from '../pages/home/home'
import { ApiProvider } from '../providers/api/api';
import { PinModalComponent } from '../components/pin-modal/pin-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PinModalComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PinModalComponent
  ],
  providers: [
    StatusBar,
    ApiProvider,
    SplashScreen,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
