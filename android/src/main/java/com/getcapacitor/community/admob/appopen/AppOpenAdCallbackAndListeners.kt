package com.getcapacitor.community.admob.appopen

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.getcapacitor.community.admob.helpers.FullscreenPluginCallback
import com.getcapacitor.community.admob.models.AdMobPluginError
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.appopen.AppOpenAd
import com.google.android.gms.ads.appopen.AppOpenAd.AppOpenAdLoadCallback
import com.google.android.gms.common.util.BiConsumer

object AppOpenAdCallbackAndListeners {

    fun getAppOpenAdLoadCallback(call: PluginCall,
                                      notifyListenersFunction: BiConsumer<String, JSObject>,
    ): AppOpenAdLoadCallback {
        return object :AppOpenAdLoadCallback(){
            override fun onAdLoaded(ad: AppOpenAd) {
                ad.fullScreenContentCallback = FullscreenPluginCallback(AppOpenAdPluginPluginEvent, notifyListenersFunction)

                AdAppOpenExecutor.appOpenAd = ad

                val adInfo = JSObject()
                adInfo.put("adUnitId", ad.adUnitId)
                call.resolve(adInfo)

                notifyListenersFunction.accept(AppOpenAdPluginPluginEvent.Loaded, adInfo)
            }

            override fun onAdFailedToLoad(adError: LoadAdError) {
                val adMobError = AdMobPluginError(adError)

                notifyListenersFunction.accept(AppOpenAdPluginPluginEvent.FailedToLoad, adMobError)
                call.reject(adError.message)
            }
        }
    }
}