import type { PluginListenerHandle } from '@capacitor/core';
import type { ValidateAllEventsEnumAreImplemented } from '../private/validate-all-events-implemented.type';
import type { AdLoadInfo, AdMobError, AdOptions } from '../shared';
import type { AppOpenAdPluginEvents } from './appopen-ad-plugin-events.enum';
export declare type AppOpenDefinitionsHasAllEvents = ValidateAllEventsEnumAreImplemented<AppOpenAdPluginEvents, AppOpenDefinitions>;
export interface AppOpenDefinitions {
    /**
     * Prepare app open banner
     *
     * @group AppOpen
     * @param options AdOptions
     * @since 1.1.2
     */
    prepareAppOpen(options: AdOptions): Promise<AdLoadInfo>;
    /**
     * Show app open ad when it’s ready
     *
     * @group AppOpen
     * @since 1.1.2
     */
    showAppOpen(): Promise<void>;
    addListener(eventName: AppOpenAdPluginEvents.FailedToLoad, listenerFunc: (error: AdMobError) => void): PluginListenerHandle;
    addListener(eventName: AppOpenAdPluginEvents.Loaded, listenerFunc: (info: AdLoadInfo) => void): PluginListenerHandle;
    addListener(eventName: AppOpenAdPluginEvents.Dismissed, listenerFunc: () => void): PluginListenerHandle;
    addListener(eventName: AppOpenAdPluginEvents.FailedToShow, listenerFunc: (error: AdMobError) => void): PluginListenerHandle;
    addListener(eventName: AppOpenAdPluginEvents.Showed, listenerFunc: () => void): PluginListenerHandle;
}
