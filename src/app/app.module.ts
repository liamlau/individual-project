import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmPageComponent } from './algorithm-page/algorithm-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatAnimatedIconComponent } from './algorithm-page/mat-animated-icon/mat-animated-icon.component';
import { GsCodeComponent } from './algorithm-page/algorithms/gale-shapley/gs-code/gs-code.component';
import { SimpleCodeComponent } from './algorithm-page/algorithms/simple/simple-code/simple-code.component';
import { PlaybackControlsComponent } from './algorithm-page/playback-controls/playback-controls.component';
import { CodeDisplayComponent } from './algorithm-page/code-display/code-display.component';
import { VariableDisplayComponent } from './algorithm-page/variable-display/variable-display.component';
import { GsVariablesComponent } from './algorithm-page/algorithms/gale-shapley/gs-variables/gs-variables.component';
import { SimpleVariablesComponent } from './algorithm-page/algorithms/simple/simple-variables/simple-variables.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeTabContentComponent } from './home-page/home-tab-content/home-tab-content.component';
import { AlgorithmTabContentComponent } from './home-page/algorithm-tab-content/algorithm-tab-content.component';
import { AboutMeTabContentComponent } from './home-page/about-me-tab-content/about-me-tab-content.component';
import { AlgorithmSelectionDialogComponent } from './home-page/algorithm-tab-content/algorithm-selection-dialog/algorithm-selection-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmPageComponent,
    MatAnimatedIconComponent,
    GsCodeComponent,
    SimpleCodeComponent,
    PlaybackControlsComponent,
    CodeDisplayComponent,
    VariableDisplayComponent,
    GsVariablesComponent,
    SimpleVariablesComponent,
    HomePageComponent,
    HomeTabContentComponent,
    AlgorithmTabContentComponent,
    AboutMeTabContentComponent,
    AlgorithmSelectionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
