export declare enum AppOpenAdPluginEvents {
    /**
     * Emits after trying to prepare and AppOpen, when it is loaded and ready to be show
     */
    Loaded = "appOpenAdLoaded",
    /**
     * Emits after trying to prepare and AppOpen, when it could not be loaded
     */
    FailedToLoad = "appOpenAdFailedToLoad",
    /**
     * Emits when the AppOpen ad is visible to the user
     */
    Showed = "appOpenAdShowed",
    /**
     * Emits when the AppOpen ad is failed to show
     */
    FailedToShow = "appOpenAdFailedToShow",
    /**
     * Emits when the AppOpen ad is not visible to the user anymore.
     */
    Dismissed = "appOpenAdDismissed"
}
