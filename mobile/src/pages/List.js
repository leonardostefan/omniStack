import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, AsyncStorage, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import logo from "../assets/logo.png";

import SpotList from '../components/SpotList'

import api from "../services/api"

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            if (storageTechs) {
                const techsArray = storageTechs.split(', ').map(tech => tech.trim());
                setTechs(techsArray);
            } else {
                async function getAll() {
                    const response =await api.get('/spots/getAll');
                    setTechs( response.data);
                }
                getAll();
            }
        })
    }, [])

    function handleLogout() {
        AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}

            </ScrollView>
            <TouchableOpacity onPress={handleLogout}
            ><Text>SAIR</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 42,
    }
});
