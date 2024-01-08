
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import stockService from '../../services/stockService';
import Loader from './Loader';

const IPOList = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchIPOData = async () => {
            setLoading(true);
            try {
                const ipoData = await stockService.getIpoData();
                setData(ipoData);
            } catch (error) {
                console.error('Error fetching Stocks:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchIPOData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.dashboardContainer}>
                {/* <Text style={styles.dashboardTitle}>Explore IPO</Text> */}
                {loading && <Loader />}

                {error && (
                    <View style={styles.alert}>
                        <Text style={styles.alertText}>
                            Error: {error.message}. Please try again.
                        </Text>
                    </View>
                )}

                {data && (
                    <View style={styles.ipoCards}>
                        {data.map((ipo, index) => (
                            <View key={index} style={styles.ipoCard}>
                                <Text style={styles.companyName}>{ipo.companyName}</Text>
                                <Text style={styles.status}>Status: {ipo.status}</Text>
                                <Text style={styles.offeringDate}>
                                    Offering Date: {ipo.offeringDate}
                                </Text>
                                <Text style={styles.symbol}>Symbol: {ipo.symbol}</Text>
                                <Text style={styles.priceRange}>
                                    Price Range: ${ipo.priceRangeLow} - ${ipo.priceRangeHigh}
                                </Text>
                                <Text style={styles.volume}>Volume: {ipo.volume}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Set your background color
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
    ipoCards: {
        marginTop: 10,
    },
    ipoCard: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
    },
    companyName: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
    },
    status: {
        fontWeight: 'bold',
        color: 'grey',
    },
    offeringDate: {
        fontWeight: 'bold',
        color: 'grey',
    },
    symbol: {
        fontWeight: 'bold',
        color: 'grey',
    },
    priceRange: {
        fontWeight: 'bold',
        color: 'green',
    },
    volume: {
        fontWeight: 'bold',
        color: 'grey',
    },
});

export default IPOList;
