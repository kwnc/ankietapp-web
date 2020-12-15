import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';

const modules = [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule,
  MatFormFieldModule, MatInputModule, MatCheckboxModule, MatGridListModule];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})
export class MaterialModule {
}
