import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import reset from "../assets/reset.png";

export default function lotteryBox(props) {
    const [balls, setBalls] = useState(
        new Array(45).fill().map((value, index) => {
            return { num: index + 1, key: index };
        })
    );
    const [winningNums, setWinningNums] = useState(Array(7).fill());
    const [drawing, setDrawing] = useState(false);

    const clickHandler = () => {
        if (!drawing) {
            const timer = setInterval(() => {
                randomNumber();
            }, 200);

            setTimeout(() => {
                clearTimeout(timer);
                setDrawing(false);
            }, 3000);
        }
    };

    const reset = () => {
        setWinningNums(Array(7).fill());
    };
    const randomNumber = () => {
        var prevBalls = new Array(45).fill().map((value, index) => {
            return index + 1;
        });
        var pool = [];
        var prevWinningNums = [];

        while (prevBalls.length > 0) {
            var pick = prevBalls.splice(
                Math.floor(Math.random() * prevBalls.length),
                1
            )[0];
            pool.push(pick);
        }
        for (var i = 0; i < 7; i++) {
            var pick = pool.splice(
                Math.floor(Math.random() * pool.length),
                1
            )[0];
            prevWinningNums.push(pick);
        }
        setWinningNums(prevWinningNums);
    };

    return (
        <View style={style.container}>
            <View style={style.lotteryBox}>
                <Text
                    style={{
                        fontFamily: "nanumpenB",
                        marginBottom: "10%",
                        textAlign: "center",
                        fontSize: 25,
                    }}
                >
                    Get your Luck!
                </Text>
                <FlatList
                    columnWrapperStyle={{
                        flex: 1,
                    }}
                    numColumns={5}
                    data={balls}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                {ball({
                                    num: item.num,
                                    drawing:
                                        winningNums.indexOf(item.num) > -1
                                            ? true
                                            : false,
                                })}
                            </View>
                        );
                    }}
                />
                <View style={style.touchArea}>
                    <TouchableOpacity
                        style={drawing ? style.selectedBtn : style.selectBtn}
                        onPress={clickHandler}
                    >
                        {randomBtn()}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={reset}>
                        {resetBtn()}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function ball(props) {
    return (
        <View style={props.drawing ? style.checkedBall : style.uncheckedBall}>
            <Text
                style={{
                    fontSize: 18,
                    color: "brown",
                    textAlign: "center",
                    marginTop: 7,
                    fontFamily: "nanumpenB",
                }}
            >
                {props.num}
            </Text>
        </View>
    );
}

function randomBtn(props) {
    return (
        <Text
            style={{
                fontSize: 18,
                fontFamily: "nanumpenB",
            }}
        >
            Random Draw
        </Text>
    );
}

function resetBtn(props) {
    return (
        <Image
            style={{
                width: 30,
                height: 30,
                marginLeft: "20%",
                marginTop: "30%",
            }}
            source={reset}
        />
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(82, 74, 74)",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    lotteryBox: {
        flex: 1,
        backgroundColor: "rgb(169, 169, 169)",
        padding: "6%",
        margin: "7%",
        borderRadius: 20,
    },
    checkedBall: {
        borderWidth: 1,
        borderRadius: 50,
        borderBottomColor: "white",
        width: 40,
        height: 40,
        marginVertical: "8%",
        marginHorizontal: "3%",
        backgroundColor: "rgb(195, 95, 12)",
    },
    uncheckedBall: {
        borderWidth: 1,
        borderRadius: 50,
        //borderBottomColor: "white",
        width: 40,
        height: 40,
        marginVertical: "8%",
        marginHorizontal: "3%",
        backgroundColor: " rgb(178, 189, 24)",
    },
    selectBtn: {
        width: "62%",
        height: "80%",
        backgroundColor: "rgba(206, 104, 21, 0.623)",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginLeft: "20%",
        marginTop: "5%",
    },
    touchArea: { flex: 10, flexDirection: "row" },
});
