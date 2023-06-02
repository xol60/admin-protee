
export interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    dob?: Date;
    isActive: boolean;
    createdAt?: Date;
    avt?: string;
}
