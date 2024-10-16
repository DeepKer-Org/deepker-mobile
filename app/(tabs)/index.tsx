import AlertCardList from "@/components/alerts/AlertCardList";
import {Theme} from "@/constants/theme";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {fetchAlerts} from "@/services/alerts";

export default function Tab() {
    const [unattendedAlerts, setUnattendedAlerts] = useState([]);
    const [attendedAlerts, setAttendedAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAlerts = async (isRefresh = false) => {
        if (!isRefresh) {
            setLoading(true);
        }
        setError(null);
        try {
            const { alerts } = await fetchAlerts();
            const { unattendedAlerts, attendedAlerts } = alerts.reduce(
                (acc, alert) => {
                    if (alert.alert_status === "Unattended") {
                        acc.unattendedAlerts.push(alert);
                    } else {
                        acc.attendedAlerts.push(alert);
                    }
                    return acc;
                },
                { unattendedAlerts: [] as typeof alerts, attendedAlerts: [] as typeof alerts }
            );
            setUnattendedAlerts(unattendedAlerts);
            setAttendedAlerts(attendedAlerts);
        } catch (err) {
            setError("Failed to fetch alerts");
        } finally {
            setLoading(false);
            if (isRefresh) {
                setIsRefreshing(false);
            }
        }
    };

    useEffect(() => {
        getAlerts();
    }, []);

    const onRefresh = () => {
        setIsRefreshing(true);
        getAlerts(true);
    };


    if (loading && !isRefreshing) {
        return (
            <SafeAreaView style={styles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.background}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.background} edges={[]}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={[Theme.colors.black]} // Android
                        tintColor={Theme.colors.black} // iOS
                    />
                }
            >
                <View style={styles.container}>
                    <Text style={styles.h1}>Alertas Activas</Text>
                    <AlertCardList alerts={unattendedAlerts} unattended/>
                    <Text style={[styles.h1, styles.marginTop]}>Últimas Alertas de Hoy</Text>
                    <AlertCardList alerts={attendedAlerts}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Theme.colors.whiteBlue,
    },
    container: {
        flex: 1,
        marginHorizontal: Theme.margin.horizontal,
        paddingVertical: Theme.padding.vertical
    },
    h1: {
        fontSize: Theme.size.h1,
        fontFamily: Theme.fonts.semibold,
        color: Theme.colors.black,
        marginBottom: Theme.margin.vertical,
    },
    marginTop: {
        marginTop: Theme.margin.vertical * 2.4,
    },
    errorText: {
        color: Theme.colors.red,
        fontSize: Theme.size.h2,
        textAlign: "center",
        marginTop: Theme.margin.vertical,
    },
});
