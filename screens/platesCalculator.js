import React, { useState, } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper"
import { Picker as SelectPicker } from "@react-native-picker/picker";
import Slider from '@react-native-community/slider';

export const FormField = ({ onChangeText, placeholder, val, }) => {
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

export const BarbellWeightSelector = ({ barbellWeight, setBarbellWeight }) => {
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

export function generatePlatesRequired(weightToLoad, platesAvailable) {
    // to accommodate decimal weights 
    let dp = new Array(4 * weightToLoad + 4);
    let plates = new Array(4 * weightToLoad * 4);
    
    for (let i = 0; i <= 4 * weightToLoad + 3; i++) {
      if (i === 0) {
        dp[i] = 0; 
        plates[i] = [];
      }
      else {
        dp[i] = Number.MAX_VALUE; 
        plates[i] = [-1];
      }
    }
    
    for (let j = 1; j <= 4 * weightToLoad + 3; j++) {
      let plateChosen = -1; 
      let indexOfSubProb = -1;
      
      for (let k = 0; k < platesAvailable.length; k++) {
        if (platesAvailable[k] <= j / 4) {
          let subProblem = dp[j - 4 * platesAvailable[k]];
          if (subProblem !== Number.MAX_VALUE && 1 + subProblem < dp[j]) {
            dp[j] = 1 + subProblem;
            plateChosen = platesAvailable[k];
            indexOfSubProb = j - 4 * platesAvailable[k];
          }
        }
      }
      
      if (indexOfSubProb !== -1) {
        plates[j] = [... plates[indexOfSubProb], plateChosen];
      }
    }
    
    return plates[4 * weightToLoad];
}

export default function PlatesCalculator() {
    const [targetWeight, setTargetWeight] = useState(0);
    const [barbellWeight, setBarbellWeight] = useState(20);
    const [selectedPlateWeights, setSelectedPlateWeights] = useState({
        TWENTY_FIVE: [25, false, 'red'],
        TWENTY: [20, false, 'blue'],
        FIFTEEN: [15, false, 'yellow'],
        TEN: [10, false, 'green'],
        FIVE: [5, false, 'black'],
        TWO_POINT_FIVE: [2.5, false, 'black'],
        TWO: [2, false, 'black'],
        ONE_POINT_FIVE: [1.5, false, 'black'],
        ONE_POINT_TWO_FIVE: [1.25, false, 'black'],
        ONE: [1, false, 'black'],
        ZERO_POINT_FIVE: [0.5, false, 'black'],
    });

    const PlateType = ({ identifier }) => {
        const weight = selectedPlateWeights[identifier][0];
        const selected = selectedPlateWeights[identifier][1];
        let backgroundColor = selectedPlateWeights[identifier][2];
        let width = weight >= 10 ? 100 : 50;
        let height = weight >= 10 ? 100 : 50;
        let borderRadius = weight >= 10 ? 50 : 25;
        let opacity = selected ? 1 : 0.2;
        let fontColor = weight >= 10 ? 'black' : 'white'

        return (
            <TouchableOpacity
                style={{
                    opacity: opacity,
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                    backgroundColor: backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => setSelectedPlateWeights(prev => {
                    const newSelectedPlateWeights = { ...prev };
                    newSelectedPlateWeights[identifier][1] = !newSelectedPlateWeights[identifier][1];
                    return newSelectedPlateWeights;
                })}>
                <Text style={{ fontFamily: 'lato-bold', fontSize: 18, color: fontColor }}>{weight}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <FormField onChangeText={setTargetWeight} placeholder='Target Weight' val={targetWeight} />

            <BarbellWeightSelector barbellWeight={barbellWeight} setBarbellWeight={setBarbellWeight} />
            <View style={{ margin: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={{ fontSize: 16, margin: 10, fontFamily: 'lato-bold' }} >
                    Select the plates available to your gym!
                </Text>
                <PlateType identifier='TWENTY_FIVE' />
                <PlateType identifier='TWENTY' />
                <PlateType identifier='FIFTEEN' />
                <PlateType identifier='TEN' />
                <PlateType identifier='FIVE' />
                <PlateType identifier='TWO_POINT_FIVE' />
                <PlateType identifier='TWO' />
                <PlateType identifier='ONE_POINT_FIVE' />
                <PlateType identifier='ONE_POINT_TWO_FIVE' />
                <PlateType identifier='ONE' />
                <PlateType identifier='ZERO_POINT_FIVE' />
            </View>


            <Button
                onPress={() => {
                    const weightPerSide = (targetWeight - barbellWeight) / 2;
                    let platesAvailable = [];
                    let platesInformation = Object.values(selectedPlateWeights);
                    for (let i = 0; i < platesInformation.length; i++) {
                        if (platesInformation[i][1]) {
                            platesAvailable.push(platesInformation[i][0]);
                        }
                    }
                    const platesPerSide = generatePlatesRequired(weightPerSide, platesAvailable); 
                    if (platesPerSide[0] === -1) {
                        alert("Sorry, it's impossible.")
                    } else {
                        let str = '';
                        let plateTracker = {};
                        for (let i = 0; i < platesPerSide.length; i++) {
                            plateTracker[platesPerSide[i]] = (plateTracker[platesPerSide[i]] || 0) + 1;
                        }
                        const weightsOfPlatesChosen = Object.keys(plateTracker);
                        
                        for (let i = 0; i < weightsOfPlatesChosen.length; i++) {
                            const punctuation = i === weightsOfPlatesChosen.length - 1 ? '' : ', '
                            const weight = weightsOfPlatesChosen[i];
                            const count = plateTracker[weight];
                            const noun = count > 1 ? 'plates' : 'plate'
                            str += count + 'x' + weight + 'kg ' + noun + punctuation;
                        }
                        Alert.alert("Here's what you need on each side", str);
                    }
                }}
                style={{ marginBottom: 10 }}
            >
                <Text style={{ fontFamily: 'karla-bold', fontSize: 16 }}>Calculate!</Text>
            </Button>
        </ScrollView>
    )
}

