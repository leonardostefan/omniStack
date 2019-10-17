import React, { useState } from 'react';
import { View, Text, SafeAreaView, AsyncStorage, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import api from '../services/api';
export default function Book({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');
    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, {
            date
        },
            {
                headers: { user_id }
            }
        )
            Alert.alert('Solicitação de reserva enviada')
            navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.label}> Data de interesse * </Text>
            <TextInput
                style={styles.input}
                placeholder={"Escola a data da reserva"}
                placeholderTextColor="#999"
                autoCapitalize='words'
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>)
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        margin: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 3,
    },
    button: {
        height: 42,
        backgroundColor: '#F05a5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,

    },
    cancelButton: {
        marginTop: 10,
        backgroundColor: '#CCC',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})