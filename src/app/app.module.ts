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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatAnimatedIconComponent } from './algorithm-page/mat-animated-icon/mat-animated-icon.component';
import { PlaybackControlsComponent } from './algorithm-page/playback-controls/playback-controls.component';
import { CodeDisplayComponent } from './algorithm-page/code-display/code-display.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { HomeContentComponent } from './home-page/home-content/home-content.component';
import { AboutContentComponent } from './home-page/about-content/about-content.component';
import { AlgorithmContentComponent } from './home-page/algorithm-content/algorithm-content.component';
import { FeedbackContentComponent } from './home-page/feedback-content/feedback-content.component';
import { AlgorithmCardComponent } from './home-page/algorithm-content/algorithm-card/algorithm-card.component';
import { IconBannerComponent } from './home-page/icon-banner/icon-banner.component';
import { FeedbackBannerComponent } from './home-page/feedback-banner/feedback-banner.component';
import { NavbarComponent } from './home-page/navbar/navbar.component';
import { EditPreferencesDialogComponent } from './algorithm-page/edit-preferences-dialog/edit-preferences-dialog/edit-preferences-dialog.component';
import { AnimationGuideDialogComponent } from './algorithm-page/animation-guide-dialog/animation-guide-dialog.component';
import { SidebarComponent } from './algorithm-page/sidebar/sidebar.component';
import { AlgDescriptionComponent } from './algorithm-page/sidebar/alg-description/alg-description.component';
import { FreeAgentsComponent } from './algorithm-page/sidebar/free-agents/free-agents.component';
import { PseudocodeComponent } from './algorithm-page/sidebar/pseudocode/pseudocode.component';
import { ExecutionLogComponent } from './algorithm-page/sidebar/execution-log/execution-log.component';
import { AlgorithmNavbarComponent } from './algorithm-page/algorithm-navbar/algorithm-navbar.component';
import { AnimationContainerComponent } from './algorithm-page/animation-container/animation-container.component';
import { AgentTitlesComponent } from './algorithm-page/animation-container/agent-titles/agent-titles.component';
import { CanvasDisplayComponent } from './algorithm-page/animation-container/canvas-display/canvas-display.component';
import { InfoSidebarComponent } from './algorithm-page/info-sidebar/info-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmPageComponent,
    MatAnimatedIconComponent,
    PlaybackControlsComponent,
    CodeDisplayComponent,
    HomePageComponent,
    HomeContentComponent,
    AboutContentComponent,
    AlgorithmContentComponent,
    FeedbackContentComponent,
    AlgorithmCardComponent,
    IconBannerComponent,
    FeedbackBannerComponent,
    NavbarComponent,
    EditPreferencesDialogComponent,
    AnimationGuideDialogComponent,
    SidebarComponent,
    AlgDescriptionComponent,
    FreeAgentsComponent,
    PseudocodeComponent,
    ExecutionLogComponent,
    AlgorithmNavbarComponent,
    AnimationContainerComponent,
    AgentTitlesComponent,
    CanvasDisplayComponent,
    InfoSidebarComponent
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
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    AngularResizedEventModule
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
