import { Component, Injectable } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-loading',
  imports: [LottieComponent],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {
  options: AnimationOptions = {
    path: '/loading.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
