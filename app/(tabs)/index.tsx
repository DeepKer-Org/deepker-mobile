import AlertCardList from "@/components/alerts/AlertCardList";
import {Theme} from "@/constants/theme";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {fetchAlerts} from "@/services/alerts";

export default function Tab() {
    const [activeAlerts, setActiveAlerts] = useState([]);
    const [pastAlerts, setPastAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch alerts when the component mounts
        const getAlerts = async () => {
            setLoading(true);
            setError(null);
            try {
                const {alerts} = await fetchAlerts();
                const {activeAlerts, pastAlerts} = alerts.reduce(
                    (acc, alert) => {
                        if (alert.alert_status === "Unattended") {
                            acc.activeAlerts.push(alert);
                        } else {
                            acc.pastAlerts.push(alert);
                        }
                        return acc;
                    },
                    {activeAlerts: [] as typeof alerts, pastAlerts: [] as typeof alerts}
                );
                setActiveAlerts(activeAlerts);
                setPastAlerts(pastAlerts);
            } catch (err) {
                setError("Failed to fetch alerts");
            } finally {
                setLoading(false);
            }
        };
        getAlerts();
    }, []);


    if (loading) {
        return (
            <SafeAreaView style={styles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black}/>
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
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.h1}>Alertas Activas</Text>
                    <AlertCardList alerts={activeAlerts} active/>
                    <Text style={[styles.h1, styles.marginTop]}>Últimas Alertas de Hoy</Text>
                    <AlertCardList alerts={pastAlerts}/>
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
        marginVertical: Theme.margin.vertical,
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
