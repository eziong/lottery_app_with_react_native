import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Lottery from "./app/screens/lottery.js";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from "expo-ads-admob";

const getFont = () => {
    return Font.loadAsync({
        nanumpenB: require("./app/assets/fonts/NanumBarunpenB.ttf"),
        nanumpenR: require("./app/assets/fonts/NanumBarunpenR.ttf"),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    const interstitial = async () => {
        await AdMobInterstitial.setAdUnitID(
            "ca-app-pub-8596476786252416/9061795742"
        );
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    };

    const banner = () => {
        return (
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-8596476786252416/6253451969"
                servePersonalizedAds
                onDidFailToReceiveAdWithError={this.bannerError}
            />
        );
    };

    useEffect(() => {
        interstitial();
    }, [fontLoaded]);

    if (fontLoaded) {
        return (
            <View style={styles.container}>
                <Lottery />
                {banner()}
            </View>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFont}
                onFinish={() => {
                    setFontLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
