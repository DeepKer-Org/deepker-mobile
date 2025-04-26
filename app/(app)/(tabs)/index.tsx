import AlertCardList from "@/components/alerts/AlertCardList";
import {Theme} from "@/constants/theme";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState, useCallback} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {fetchAlerts} from "@/services/alerts";
import {useSession} from "@/context/AuthSessionContext";
import {Alert} from "@/types/alert";
import { commonStyles } from "@/styles/commonStyles";

export default function Tab() {
    const [initialLoading, setInitialLoading] = useState(true);
    const [unattendedAlerts, setUnattendedAlerts] = useState<Alert[]>([]);
    const [attendedAlerts, setAttendedAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {session} = useSession();

    const getAlerts = async (isRefresh = false) => {
        if (!session) return; // Only proceed if session is available

        if (!isRefresh && initialLoading) {
            setLoading(true);
        }

        setError(null);
        try {
            const {alerts} = await fetchAlerts(session!);
            const {unattendedAlerts, attendedAlerts} = alerts.reduce(
                (acc, alert) => {
                    if (alert.alert_status === "Unattended") {
                        console.log("Unattended", alert);
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
            setInitialLoading(false);
            if (isRefresh) {
                setIsRefreshing(false);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
          getAlerts(); 
      
          const interval = setInterval(() => {
            getAlerts();
          }, 5000);
      
          return () => clearInterval(interval); // cleanup
        }, [session])
      );

    const onRefresh = () => {
        setIsRefreshing(true);
        getAlerts(true);
    };

    if (initialLoading) {
        return (
            <SafeAreaView style={commonStyles.background}>
                <ActivityIndicator size="large" color={Theme.colors.black}/>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={commonStyles.background}>
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
                    <Text style={commonStyles.errorText}>Error: {error}</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[commonStyles.background, styles.background]} edges={[]}>
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
                    <Text style={[commonStyles.h2, styles.marginBottom]}>Alertas sin atender</Text>
                    {unattendedAlerts.length === 0 ? (
                        <Text style={commonStyles.p}>No se han encontrado alertas</Text>
                    ) : (
                        <AlertCardList alerts={unattendedAlerts} unattended />
                    )}
                    <Text style={[commonStyles.h2, styles.marginTop, styles.marginBottom]}>Alertas atendidas de hoy</Text>
                    {attendedAlerts.length === 0 ? (
                        <Text style={commonStyles.p}>No se han encontrado alertas</Text>
                    ) : (
                        <AlertCardList alerts={attendedAlerts} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-start",
    },
    container: {
        flex: 1,
        marginHorizontal: Theme.margin.horizontal,
        paddingVertical: Theme.padding.vertical
    },
    marginTop: {
        marginTop: Theme.margin.vertical * 2.4,
    },
    marginBottom: {
        marginBottom: Theme.margin.vertical,
    },
});
