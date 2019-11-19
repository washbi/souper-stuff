import {NgModule} from '@angular/core';
import {SouperPagesComponent} from './souper-pages.component';
import {SharedModule} from '../../shared-modules/shared.module';
import {SouperPagesRoutingModule} from './souper-pages-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddStuffPageComponent } from './add-stuff-page/add-stuff-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StuffListElementComponent } from './main-page/stuff-list-element/stuff-list-element.component';
import { SelectTagsFieldComponent } from './select-tags-field/select-tags-field.component';
import { StarRatingFieldComponent } from './star-rating-field/star-rating-field.component';
import { ImagesFieldComponent } from './images-field/images-field.component';
import { InfoPageComponent } from './info-page/info-page.component';

@NgModule({
  declarations: [
    SouperPagesComponent,
    LoginPageComponent,
    MainPageComponent,
    AddStuffPageComponent,
    StuffListElementComponent,
    SelectTagsFieldComponent,
    StarRatingFieldComponent,
    ImagesFieldComponent,
    InfoPageComponent,
  ],
  imports: [
    SharedModule,
    SouperPagesRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class SouperPagesModule { }
