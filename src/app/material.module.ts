import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

const modules = [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {
}
