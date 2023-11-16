import type { PluginListenerHandle } from '@capacitor/core';

import type { ValidateAllEventsEnumAreImplemented } from '../private/validate-all-events-implemented.type';
import type { AdLoadInfo, AdMobError, AdOptions } from '../shared';

import type { AppOpenAdPluginEvents } from './appopen-ad-plugin-events.enum';


// This is just to validate that we do not forget to implement any event name
export type AppOpenDefinitionsHasAllEvents = ValidateAllEventsEnumAreImplemented<AppOpenAdPluginEvents, AppOpenDefinitions>;

export interface AppOpenDefinitions {
  /**
   * Prepare interstitial banner
   *
   * @group Interstitial
   * @param options AdOptions
   * @since 1.1.2
   */
   prepareAppOpen(options: AdOptions): Promise<AdLoadInfo>;

   /**
    * Show interstitial ad when it’s ready
    *
    * @group Interstitial
    * @since 1.1.2
    */
  showInterstitial(): Promise<void>;

  addListener(
    eventName: AppOpenAdPluginEvents.FailedToLoad,
    listenerFunc: (error: AdMobError) => void,
  ): PluginListenerHandle;

  addListener (
    eventName: AppOpenAdPluginEvents.Loaded,
    listenerFunc: (info: AdLoadInfo ) => void,
  ): PluginListenerHandle;


  addListener(
    eventName: AppOpenAdPluginEvents.Dismissed,
    listenerFunc: () => void,
  ): PluginListenerHandle;


  addListener(
    eventName: AppOpenAdPluginEvents.FailedToShow,
    listenerFunc: (error: AdMobError) => void,
  ) : PluginListenerHandle;


  addListener (
    eventName: AppOpenAdPluginEvents.Showed,
    listenerFunc: () => void,
  ): PluginListenerHandle;
}
