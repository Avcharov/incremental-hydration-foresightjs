import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ForesightManager } from 'js.foresight';
import { ForesightDebugger } from 'js.foresight-devtools';

@Injectable({
  providedIn: 'root',
})
export class ForesightService {
  private unregisterMap = new Map<HTMLElement, () => void>();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public init() {
    if (!this.isBrowser) return;

    ForesightManager.initialize({
      debug: true,
      enableMousePrediction: true,
    });

    ForesightDebugger.initialize(ForesightManager.instance, {
      showDebugger: true,
      isControlPanelDefaultMinimized: true, // optional setting which allows you to minimize the control panel on default
      showNameTags: true, // optional setting which shows the name of the element
      sortElementList: 'visibility', // optional setting for how the elements in the control panel are sorted
    });
    console.log('ForesightManager Initialized Successfully.');
  }

  public register(element: HTMLElement, callback: () => void) {
    if (!this.isBrowser || !ForesightManager.instance) return;

    const { unregister } = ForesightManager.instance.register({
      element,
      callback, // Pass the callback directly
    });

    this.unregisterMap.set(element, unregister);
  }

  public unregister(element: HTMLElement) {
    if (!this.isBrowser) return;

    const unregisterFn = this.unregisterMap.get(element);
    if (unregisterFn) {
      unregisterFn();
      this.unregisterMap.delete(element);
    }
  }
}