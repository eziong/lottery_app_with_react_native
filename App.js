import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Lottery from "./app/screens/lottery.js";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const getFont = () => {
    return Font.loadAsync({
        nanumpenB: require("./app/assets/fonts/NanumBarunpenB.ttf"),
        nanumpenR: require("./app/assets/fonts/NanumBarunpenR.ttf"),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (fontLoaded) {
        return <Lottery />;
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

    return <Lottery />;
}
