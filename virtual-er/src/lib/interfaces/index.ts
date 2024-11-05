export type User = {
    id: number;
    name?: string;
};

export type ER = {
    id: number;
    name?: string;
    capacity?: number;
    waitTime?: number;
};

export type Patient = {
    PatientName: string;
    SeverityOfIllness: string;
    RelevantInformation: string;
    PositionInQueue: string;
    RoomNumber: number;
    severityRank: number;
};