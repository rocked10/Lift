import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity,
    StatusBar, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import Signup from '../screens/signup';
import { loginStyles } from '../styles/global'

export default function Login({ userDetails }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (

        <View style={loginStyles.container}>
            <Formik
                initialValues = {{email: '', password: '' }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    userDetails(values);
                    actions.resetForm();
                }}
            >
                {(props) => (
                    <View>
                        <View style={loginStyles.inputView} >
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Email...'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </View>

                        <View style={loginStyles.inputView} >
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Password...'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </View>

                        <Button title='LOGIN' onPress={props.handleSubmit} />
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

                <TouchableOpacity
                    style={styles.modalToggle}
                    onPress={() => setModalOpen(true)}
                >
                    <Text style={loginStyles.loginText}>Signup</Text>
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
    }
});