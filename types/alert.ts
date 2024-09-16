import { Biometrics } from "./biometrics";
import { Diagnosis } from "./diagnosis";
import { Patient } from "./patient";

export interface Alert {
    alertId: string;
    alertStatus: string;
    attendedBy?: string;
    alertTimestamp: string;
    attendedTimestamp?: string;
    timestamp: string;
    biometrics: Biometrics;
    computerDiagnoses: Diagnosis[];
    patient: Patient
}