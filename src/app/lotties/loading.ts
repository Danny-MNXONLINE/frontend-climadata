import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading',
  template: `     <div class="flex items-center justify-center h-screen">
      <ng-lottie [options]="options" style="width:300px; height:300px;"></ng-lottie>
    </div>`,
  standalone: true,
  imports: [LottieComponent],
})
export class Loading {
  options: AnimationOptions = {
    path: '/public/loading.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}