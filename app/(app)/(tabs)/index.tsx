import AlertCardList from "@/components/alerts/AlertCardList";
import {Theme} from "@/constants/theme";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {fetchAlerts} from "@/services/alerts";
import {useSession} from "@/context/AuthSessionContext";
import {Alert} from "@/types/alert";

export default function Tab() {
    const [unattendedAlerts, setUnattendedAlerts] = useState<Alert[] | null>(null);
    const [attendedAlerts, setAttendedAlerts] = useState<Alert[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {session} = useSession();

    const getAlerts = async (isRefresh = false) => {
        if (!session) return; // Only proceed if session is available

        if (!isRefresh) {
            setLoading(true);
        }

        setError(null);
        try {
            const {alerts} = await fetchAlerts(session!);
            const {unattendedAlerts, attendedAlerts} = alerts.reduce(
                (acc, alert) => {
                    if (alert.alert_status === "Unattended") {
                        acc.unattendedAlerts.push(alert);
                    } else {
                        acc.attendedAlerts.push(alert);
                    }
                    return acc;
                },
                {unattendedAlerts: [] as typeof alerts, attendedAlerts: [] as typeof alerts}
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
        if (session) {
            getAlerts(); // Trigger fetch when session is available
        }
    }, [session]);

    const onRefresh = () => {
        setIsRefreshing(true);
        getAlerts(true);
    };

    if (loading && !isRefreshing) {
        return (
            <SafeAreaView style={styles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black}/>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.background}>
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
                    <Text style={styles.errorText}>Error: {error}</Text>
                </ScrollView>
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
                    <Text style={styles.h1}>Alertas No Atendidas</Text>
                    {unattendedAlerts ?
                        <Text style={styles.p}>No se han encontrado alertas</Text> :
                        <AlertCardList alerts={unattendedAlerts} unattended/>}
                    <Text style={[styles.h1, styles.marginTop]}>Alertas Atendidas de Hoy</Text>
                    {attendedAlerts ?
                        <Text style={styles.p}>No se han encontrado alertas</Text> :
                        <AlertCardList alerts={attendedAlerts}/>}
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
    p: {
        color: Theme.colors.gray,
        fontSize: Theme.size.h3,
        fontFamily: Theme.fonts.regular,
    }
});
