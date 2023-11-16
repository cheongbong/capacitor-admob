// This enum should be keep in sync with their native equivalents with the same name
export var AppOpenAdPluginEvents;
(function (AppOpenAdPluginEvents) {
    /**
     * Emits after trying to prepare and AppOpen, when it is loaded and ready to be show
     */
    AppOpenAdPluginEvents["Loaded"] = "appOpenAdLoaded";
    /**
     * Emits after trying to prepare and AppOpen, when it could not be loaded
     */
    AppOpenAdPluginEvents["FailedToLoad"] = "appOpenAdFailedToLoad";
    /**
     * Emits when the AppOpen ad is visible to the user
     */
    AppOpenAdPluginEvents["Showed"] = "appOpenAdShowed";
    /**
     * Emits when the AppOpen ad is failed to show
     */
    AppOpenAdPluginEvents["FailedToShow"] = "appOpenAdFailedToShow";
    /**
     * Emits when the AppOpen ad is not visible to the user anymore.
     */
    AppOpenAdPluginEvents["Dismissed"] = "appOpenAdDismissed";
})(AppOpenAdPluginEvents || (AppOpenAdPluginEvents = {}));
//# sourceMappingURL=appopen-ad-plugin-events.enum.js.map