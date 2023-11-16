package com.getcapacitor.community.admob.appopen;

import android.app.Activity;
import android.content.Context;
import androidx.core.util.Supplier;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import com.getcapacitor.community.admob.helpers.AdViewIdHelper;
import com.getcapacitor.community.admob.helpers.RequestHelper;
import com.getcapacitor.community.admob.models.AdMobPluginError;
import com.getcapacitor.community.admob.models.AdOptions;
import com.getcapacitor.community.admob.models.Executor;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.appopen.AppOpenAd;
import com.google.android.gms.common.util.BiConsumer;

public class AdAppOpenExecutor extends Executor {

    public static AppOpenAd appOpenAd;

    AppOpenAdCallbackAndListeners adCallbackAndListeners;

    public AdAppOpenExecutor(
        Supplier<Context> contextSupplier,
        Supplier<Activity> activitySupplier,
        BiConsumer<String, JSObject> notifyListenersFunction,
        String pluginLogTag,
        AppOpenAdCallbackAndListeners adCallbackAndListeners
    ) {
        super(contextSupplier, activitySupplier, notifyListenersFunction, pluginLogTag, "AdRewardExecutor");
        this.adCallbackAndListeners = adCallbackAndListeners;
    }

    public void prepareAppOpen(final PluginCall call, BiConsumer<String, JSObject> notifyListenersFunction) {
        final AdOptions.AdOptionsFactory factory = AdOptions.getFactory();
        final AdOptions adOptions = factory.createAppOpenOptions(call);

        try {
            activitySupplier
                .get()
                .runOnUiThread(
                    () -> {
                        final AdRequest adRequest = RequestHelper.createRequest(adOptions);
                        final String id = AdViewIdHelper.getFinalAdId(adOptions, adRequest, logTag, contextSupplier.get());
                        AppOpenAd.load(
                            activitySupplier.get(),
                            id,
                            adRequest,
                            adCallbackAndListeners.getAppOpenAdLoadCallback(call, notifyListenersFunction)
                        );
                    }
                );
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage(), ex);
        }
    }

    public void showAppOpen(final PluginCall call, BiConsumer<String, JSObject> notifyListenersFunction) {
        if (appOpenAd == null) {
            String errorMessage = "No AppOpen can be show. It was not prepared or maybe it failed to be prepared.";
            call.reject(errorMessage);
            AdMobPluginError errorObject = new AdMobPluginError(-1, errorMessage);
            notifyListenersFunction.accept(AppOpenAdPluginPluginEvent.FailedToLoad, errorObject);
            return;
        }

        activitySupplier
            .get()
            .runOnUiThread(
                () -> {
                    try {
                        appOpenAd.show(activitySupplier.get());
                        call.resolve();
                    } catch (Exception ex) {
                        call.reject(ex.getLocalizedMessage(), ex);
                    }
                }
            );
    }
}
