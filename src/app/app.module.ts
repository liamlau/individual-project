import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
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
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatAnimatedIconComponent } from './algorithm-page/mat-animated-icon/mat-animated-icon.component';
import { GsCodeComponent } from './algorithm-page/algorithms/gale-shapley/gs-code/gs-code.component';
import { SimpleCodeComponent } from './algorithm-page/algorithms/simple/simple-code/simple-code.component';
import { PlaybackControlsComponent } from './algorithm-page/playback-controls/playback-controls.component';
import { CodeDisplayComponent } from './algorithm-page/code-display/code-display.component';
import { VariableDisplayComponent } from './algorithm-page/variable-display/variable-display.component';
import { GsVariablesComponent } from './algorithm-page/algorithms/gale-shapley/gs-variables/gs-variables.component';
import { SimpleVariablesComponent } from './algorithm-page/algorithms/simple/simple-variables/simple-variables.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { EgsResidentHsCodeComponent } from './algorithm-page/algorithms/egs-resident-hs/egs-resident-hs-code/egs-resident-hs-code.component';
import { HomeContentComponent } from './home-page/home-content/home-content.component';
import { AboutContentComponent } from './home-page/about-content/about-content.component';
import { AlgorithmContentComponent } from './home-page/algorithm-content/algorithm-content.component';
import { FeedbackContentComponent } from './home-page/feedback-content/feedback-content.component';
import { AlgorithmCardComponent } from './home-page/algorithm-content/algorithm-card/algorithm-card.component';
import { IconBannerComponent } from './home-page/icon-banner/icon-banner.component';
import { FeedbackBannerComponent } from './home-page/feedback-banner/feedback-banner.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';

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
    EgsResidentHsCodeComponent,
    HomeContentComponent,
    AboutContentComponent,
    AlgorithmContentComponent,
    FeedbackContentComponent,
    AlgorithmCardComponent,
    IconBannerComponent,
    FeedbackBannerComponent,
    NavbarComponent
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
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    AngularResizedEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
