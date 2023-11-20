import Foundation
import Capacitor
import GoogleMobileAds

class AdAppOpenExecutor: NSObject, GADFullScreenContentDelegate {
    public weak var plugin: AdMob?
    var appOpen: GADAppOpenAd!

    func prepareAppOpen(_ call: CAPPluginCall, _ request: GADRequest, _ adUnitID: String) {
        GADAppOpenAd.load(
            withAdUnitID: adUnitID,
            request: request,
            completionHandler: { (ad, error) in
                if let error = error {
                    NSLog("Rewarded ad failed to load with error: \(error.localizedDescription)")
                    self.plugin?.notifyListeners(AppOpenAdPluginEvents.FailedToLoad.rawValue, data: [
                        "code": 0,
                        "message": error.localizedDescription
                    ])
                    call.reject("Loading failed")
                    return
                }

                self.appOpen = ad
                self.appOpen.fullScreenContentDelegate = self
                self.plugin?.notifyListeners(AppOpenAdPluginEvents.Loaded.rawValue, data: [
                    "adUnitId": adUnitID
                ])
                call.resolve([
                    "adUnitId": adUnitID
                ])
            }
        )
    }

    func showAppOpen(_ call: CAPPluginCall) {
        if let rootViewController = plugin?.getRootVC() {
            if let ad = self.appOpen {
                ad.present(fromRootViewController: rootViewController)
                call.resolve([:])
            } else {
                NSLog("Ad wasn't ready")
                call.reject("Ad wasn't ready")
            }
        }
    }

    public func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        NSLog("AppOpenFullScreenDelegate Ad failed to present full screen content with error \(error.localizedDescription).")
        self.plugin?.notifyListeners(AppOpenAdPluginEvents.FailedToShow.rawValue, data: [
            "code": 0,
            "message": error.localizedDescription
        ])
    }

    public func adWillPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        NSLog("AppOpenFullScreenDelegate Ad did present full screen content.")
        self.plugin?.notifyListeners(AppOpenAdPluginEvents.Showed.rawValue, data: [:])
    }

    public func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        NSLog("AppOpenFullScreenDelegate Ad did dismiss full screen content.")
        self.plugin?.notifyListeners(AppOpenAdPluginEvents.Dismissed.rawValue, data: [:])
    }
}
