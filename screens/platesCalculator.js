import React, { useState, } from 'react';
import { View, ScrollView, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper"
import { Picker as SelectPicker } from "@react-native-picker/picker";
import Slider from '@react-native-community/slider';

const FormField = ({ onChangeText, placeholder, val, }) => {
    return (
        <TextInput
            style={{
                // borderWidth: 1,
                borderColor: '#ddd',
                fontFamily: 'lato-regular',
                // padding: 12,
                margin: 8,
                fontSize: 18,
                borderRadius: 6,
                backgroundColor: 'white'
            }}
            onChangeText={onChangeText}
            placeholder={placeholder}
            value={val}
            keyboardType='phone-pad'
            theme={{ fonts: { regular: { fontFamily: 'lato-regular' } } }}
        />
    )
}

const PlateQuantityIndicator = ({ plateWeight, setQuantity, quantity }) => {
    const textString = `${plateWeight} kg plates: ${quantity}`
    return (
        <View style={{ backgroundColor: 'white', margin: 8 }}>
            <Text style={{ textAlign: 'center', fontSize: 16, margin: 10, fontFamily: 'lato-bold' }}>{textString}</Text>
            <Slider
                style={{ flex: 1, height: 40 }}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="#000000"
                onValueChange={setQuantity}
            />
        </View>

    )
}

const generateAllWeightCombinations = (weightToLoad, platesAvailable) => {
    if (weightToLoad === 0) {
        return [[]];
    } else if (weightToLoad < 0 || platesAvailable.length === 0) {
        return [];
    } else {
        const [first, ...rest] = platesAvailable;
        const combiA = generateAllWeightCombinations(weightToLoad, rest);
        const combiB = generateAllWeightCombinations(weightToLoad - first, rest);
        const combiC = combiB.map(combi => [first, ...combi]);
        const res = [...combiA, ...combiC];

        return res;
    }
}

const getLegitimateWeightCombinations = (weightCombinations) => {
    let res = weightCombinations.filter(isLegitCombination).map(combination => combination.sort());

    return Array.from(new Set(res.map(JSON.stringify)), JSON.parse);
}

const isLegitCombination = (combination) => {
    let map = {};
    for (let i = 0; i < combination.length; i++) {
        if (combination[i] in map) {
            map[combination[i]] = map[combination[i]] + 1;
        } else {
            map[combination[i]] = 1;
        }
    }

    return Object.values(map).reduce((acc, curr) => { return (acc && (curr % 2 === 0)) }, true);
}

export default function PlatesCalculator() {
    const [targetWeight, setTargetWeight] = useState(0);
    const [barbellWeight, setBarbellWeight] = useState(0);
    const [twentyFive, setTwentyFive] = useState(0);
    const [twenty, setTwenty] = useState(0);
    const [fifteen, setFifteen] = useState(0);
    const [ten, setTen] = useState(0);
    const [five, setFive] = useState(0);
    const [twoPointFive, setTwoPointFive] = useState(0);
    const [two, setTwo] = useState(0);
    const [onePointFive, setOnePointFive] = useState(0);
    const [onePointTwoFive, setOnePointTwoFive] = useState(0);
    const [one, setOne] = useState(0);
    const [zeroPointFive, setZeroPointFive] = useState(0);

    const BarbellWeightSelector = ({ barbellWeight, setBarbellWeight }) => {
        return (
            <View style={{ backgroundColor: 'white', margin: 8 }}>
                <Text style={{ fontSize: 16, margin: 10, fontFamily: 'lato-bold' }} >
                    Barbell Type
                </Text>
                <SelectPicker
                    selectedValue={barbellWeight}
                    onValueChange={(itemValue, itemIndex) =>
                        setBarbellWeight(itemValue)
                    }
                >
                    <SelectPicker.Item label="7' Olympic Bar (20kg)" value={20} fontFamily="lato-regular" />
                    <SelectPicker.Item label="6' Olympic Bar (15kg)" value={15} fontFamily="lato-regular" />
                </SelectPicker>
            </View>
        )

    }

    return (
        <ScrollView>
            <FormField onChangeText={setTargetWeight} placeholder='Target Weight' val={targetWeight} />

            <BarbellWeightSelector barbellWeight={barbellWeight} setBarbellWeight={setBarbellWeight} />

            <PlateQuantityIndicator plateWeight={25} setQuantity={setTwentyFive} quantity={twentyFive} />
            <PlateQuantityIndicator plateWeight={20} setQuantity={setTwenty} quantity={twenty} />
            <PlateQuantityIndicator plateWeight={15} setQuantity={setFifteen} quantity={fifteen} />
            <PlateQuantityIndicator plateWeight={10} setQuantity={setTen} quantity={ten} />
            <PlateQuantityIndicator plateWeight={5} setQuantity={setFive} quantity={five} />
            <PlateQuantityIndicator plateWeight={2.5} setQuantity={setTwoPointFive} quantity={twoPointFive} />
            <PlateQuantityIndicator plateWeight={2} setQuantity={setTwo} quantity={two} />
            <PlateQuantityIndicator plateWeight={1.5} setQuantity={setOnePointFive} quantity={onePointFive} />
            <PlateQuantityIndicator plateWeight={1.25} setQuantity={setOnePointTwoFive} quantity={onePointTwoFive} />
            <PlateQuantityIndicator plateWeight={1} setQuantity={setOne} quantity={one} />
            <PlateQuantityIndicator plateWeight={0.5} setQuantity={setZeroPointFive} quantity={zeroPointFive} />

            <Button
                onPress={() => {
                    const plates = [twentyFive, twenty, fifteen, ten, five, twoPointFive, two, onePointFive, onePointTwoFive, one, zeroPointFive];
                    const weights = [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1.25, 1, 0.5];
                    let arr = [];

                    for (let i = 0; i < plates.length; i++) {
                        for (let j = 0; j < plates[i]; j++) {
                            arr.push(weights[i]);
                        }
                    }

                    const res = getLegitimateWeightCombinations(generateAllWeightCombinations(targetWeight - barbellWeight, arr));

                    if (res.length === 0) {
                        Alert.alert(
                            "",
                            "Sorry it's impossible",
                        );
                    } else {
                        let str = '';

                        for (let i = 0; i < res.length; i++) {
                            for (let j = 0; j < res[i].length; j++) {
                                str += res[i][j] + ',';
                            }
                            str += '\n'
                        }
                        Alert.alert(
                            "Here are some combinations",
                            str,
                        );
                    }

                }}
                style={{ marginBottom: 10 }}
            >
                <Text style={{ fontFamily: 'karla-bold', fontSize: 16 }}>Calculate!</Text>
            </Button>
        </ScrollView>
    )
}