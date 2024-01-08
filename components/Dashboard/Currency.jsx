import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, Button } from 'react-native';
import { useTheme } from '../ThemeContext';
import stockService from './../../services/stockService';
import Loader from './Loader';

const Currency = () => {
    const { themeStyles } = useTheme();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [convertData, setConvertData] = useState(null);

    const currencySymbols = ["USD", "EUR", "GBP", "JPY", "INR", "CAD"];
    const [dropdown1, setDropdown1] = useState(currencySymbols[0]);
    const [dropdown2, setDropdown2] = useState(currencySymbols[1]);

    const fetchCurrencyData = async () => {
        setLoading(true);
        try {
            const cData = await stockService.getCurrencyData();
            setData(cData);
        } catch (error) {
            console.error('Error fetching Currency Data:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCurrencyChange = async () => {
        try {
            const currencyPair = `${dropdown1}${dropdown2}`;
            const convertData = await stockService.getConvertCurrency(currencyPair);
            setConvertData(convertData);
        } catch (error) {
            console.error('Error fetching Convert Currency:', error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchCurrencyData();
    }, []);

    return (
        <View style={[styles.container, themeStyles]}>
            <View style={styles.dashboardContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.dashboardTitle}>Currency Rates</Text>
                    <Button title="Refresh Rates" onPress={fetchCurrencyData} color="#4CAF50" />
                </View>
                {loading && <Loader />}

                {error && (
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>
                            Error: {error.message}. Please try again.
                        </Text>
                    </View>
                )}

                {data && data.map((conversion, index) => {
                    const formattedSymbol =
                        `${conversion.symbol.substring(0, 3)} to ${conversion.symbol.substring(3)}`;
                    return (
                        <View key={index} style={styles.card}>
                            <Text style={styles.cardTitle}>{formattedSymbol}</Text>
                            <Text style={styles.cardText}>
                                <Text style={styles.textMuted}>Rate:</Text> {conversion.rate}
                            </Text>
                        </View>
                    );
                })}
                <View style={styles.hr} />
                <View>
                    <View style={styles.selectContainer}>
                        <Text>Select Currency 1:</Text>
                        <Picker
                            selectedValue={dropdown1}
                            onValueChange={(value) => {
                                setDropdown1(value);
                                setConvertData(null);
                            }}>
                            {currencySymbols.map((symbol, index) => (
                                <Picker.Item key={index} label={symbol} value={symbol} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.selectContainer}>
                        <Text>Select Currency 2:</Text>
                        <Picker
                            selectedValue={dropdown2}
                            onValueChange={(value) => {
                                setDropdown2(value);
                                setConvertData(null);
                                }}>
                            {currencySymbols.map((symbol, index) => (
                                <Picker.Item key={index} label={symbol} value={symbol} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleCurrencyChange}>
                        <Text>Get Exchange Rate</Text>
                    </TouchableOpacity>
                    {convertData && (
                        <View style={styles.resultContainer}>
                            <Text>
                                Exchange Rate for <Text style={styles.bold}>{`${dropdown1}${dropdown2}`}:</Text> {convertData[0].rate}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    dashboardContainer: {
        padding: 16,
    },
    dashboardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    alert: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    alertText: {
        color: 'white',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
    },
    cardTitle: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cardText: {
        fontWeight: 'bold',
        color: 'grey',
    },
    textMuted: {
        color: 'grey',
    },
    hr: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 16,
    },
    selectContainer: {
        marginVertical: 10,
    },
    buttonContainer: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    resultContainer: {
        marginTop: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default Currency;
