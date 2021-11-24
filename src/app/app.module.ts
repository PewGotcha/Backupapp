import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoComponent } from './video/video.component';
import { AuthComponent } from './auth/auth.component';
import { APIComponent } from './api/api.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { InputOverviewExampleComponent } from './input-overview-example/input-overview-example.component';



@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    AuthComponent,
    APIComponent,
    InputOverviewExampleComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
