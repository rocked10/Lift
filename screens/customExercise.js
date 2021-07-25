import React, { useState, } from 'react';
import { View, Text, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import * as DB from '../api/database';
import * as Auth from '../api/auth';
import { Button, TextInput } from "react-native-paper"
import { Picker as SelectPicker } from "@react-native-picker/picker";

const FormField = ({ onChangeText, placeholder, val, }) => {
    return (
        <TextInput
            style={{
                // borderWidth: 1,
                borderColor: '#ddd',
                fontFamily: 'lato-regular',
                // padding: 12,
                margin: 5,
                fontSize: 18,
                borderRadius: 6,
                backgroundColor: 'white'
            }}
            onChangeText={onChangeText}
            placeholder={placeholder}
            value={val} 
            theme={{ fonts: { regular: { fontFamily: 'lato-regular' } } }}
        />
    )
}

export default function CustomExercise({ navigation, route }) {
    const { categoryExercisesSetters } = route.params;
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [url, setUrl] = useState('');

    const submissionHandler = async (selectedCategory, name, url, userId) => {
        if (selectedCategory === '' || name === '') {
            Alert.alert('', 'Ensure you have filled up all compulsory fields')
        } else {
            const YouTubeGetID = url => {
                url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
            }
            const videoId = YouTubeGetID(url); 
            DB.addCustomExercise(selectedCategory, name, videoId, userId);
            
            const categoryNames = ['Olympic', 'Legs', 'Chest', 'Back', 'Arms', 'Cardio'];
            categoryExercisesSetters[categoryNames.indexOf(selectedCategory)](prev => {
                const newCategoryExercises = [... prev];
                newCategoryExercises.push({ category: selectedCategory, exerciseName: name, userId: userId, videoId: videoId})
                return newCategoryExercises;  
            })
            navigation.goBack();
        }
    }

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ ...globalStyles.titleText, alignSelf: 'center' }}>Add a custom exercise! </Text>
            <FormField onChangeText={setName} placeholder='Exercise Name' val={name} />
            <FormField onChangeText={setUrl} placeholder='Youtube Link (Optional)' val={url} />

            <SelectPicker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                }
                prompt='Choose a category'
                testID={'Category Picker'}
            >
                <SelectPicker.Item label="Olympic" value="Olympic" fontFamily="lato-regular" />
                <SelectPicker.Item label="Legs" value="Legs" fontFamily="lato-regular" />
                <SelectPicker.Item label="Chest" value="Chest" fontFamily="lato-regular" />
                <SelectPicker.Item label="Back" value="Back" fontFamily="lato-regular" />
                <SelectPicker.Item label="Arms" value="Arms" fontFamily="lato-regular" />
                <SelectPicker.Item label="Cardio" value="Cardio" fontFamily="lato-regular" />
            </SelectPicker>

            {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}> */}
            <Button onPress={() => submissionHandler(selectedCategory, name, url, userId)} >
                <Text style={{ fontFamily: 'karla-bold', fontSize: 16 }}>CREATE NEW EXERCISE!</Text>
            </Button>
            {/* </View > */}


        </View >
    )
}
