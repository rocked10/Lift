import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    StatusBar, Modal, TouchableWithoutFeedback, Keyboard, Image
} from "react-native";
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Signup from '../screens/signup';
import { loginStyles, pictures } from '../styles/global'
import { Button } from 'react-native-paper'
// import { app } from 'firebase-admin';

export default function Login({ userDetails }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (

        <View style={loginStyles.container}>
            <Image
                style={styles.tinyLogo}
                source={pictures.logo}
            />

            {/* <Text style={loginStyles.appTitle}>LIFT</Text> */}

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    userDetails(values);
                    actions.resetForm();
                }}
            >
                {(props) => (
                    <View>
                        <View style={loginStyles.inputView} >
                            <MaterialIcons name="email" size={24} color="black" />
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Email...'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </View>

                        <View style={loginStyles.inputView} >
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Password...'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </View>

                        <Button mode="contained" onPress={props.handleSubmit} style={{borderRadius: 10}}>
                            <Text style={{fontFamily: 'karla-bold'}}>LOGIN</Text>
                        </Button>
                    </View>
                )}

            </Formik>

            <View>
                <Modal visible={modalOpen} animationType='slide' >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <MaterialIcons
                                name='close'
                                size={26}
                                style={{ ...styles.modalToggle, ...styles.modalClose }}
                                onPress={() => setModalOpen(false)}
                            />

                            <Signup />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                
                <TouchableOpacity onPress={() => setModalOpen(true)} style={{marginTop: 14}}>
                    <Text style={{fontFamily: 'karla-bold'}}>SIGNUP</Text>
                </TouchableOpacity>
            </View>

            <StatusBar></StatusBar>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
    },

    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },

    modalToggle: {
        alignSelf: 'center',
    },

    tinyLogo: {
        borderRadius: 30,
        // overflow: "hidden",
        width: 150,
        height: 150,
        marginVertical: 24
    },
});