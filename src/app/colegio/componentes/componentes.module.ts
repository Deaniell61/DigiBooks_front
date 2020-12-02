import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';
import { DigibooksComponent } from './digibooks/digibooks.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadersCssModule,
  ],
  declarations: [
    DigibooksComponent
  ],
  exports: [
    DigibooksComponent
  ]
})
export class ComponentesModule { }
