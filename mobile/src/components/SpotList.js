import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api'


function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data)
            console.log(response.data)

        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image
                            source={{ uri: item.thumbnail_url }}
                            style={styles.thumbnail}
                        />
                        <Text
                            style={styles.company}>
                            {item.company}
                        </Text>
                        <Text
                            style={styles.price}>
                            {item.price ? `R$${item.price}/dia` : 'Na faixa mano'}
                        </Text>
                        <TouchableOpacity onPress={()=>handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>

                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        margin: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 200,
        height: 120,
        backgroundColor: '#666',
        resizeMode: 'cover',
        borderRadius: 3,
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: "#999",
        marginTop: 5,
    },
    button: {
        height: 30,
        backgroundColor: '#F05a5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
export default withNavigation(SpotList);