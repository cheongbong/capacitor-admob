package com.getcapacitor.community.admob.appopen

import com.getcapacitor.community.admob.models.LoadPluginEventNames

object AppOpenAdPluginPluginEvent: LoadPluginEventNames {
    const val Loaded = "appOpenAdLoaded"
    const val FailedToLoad = "appOpenAdFailedToLoad"
    override val Showed = "appOpenAdShowed"
    override val FailedToShow = "appOpenAdFailedToShow"
    override val Dismissed = "appOpenAdDismissed"
}