
export interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    dob?: Date;
    isActive: boolean;
    createdAt?: Date;
}
export interface Auth {
    email?: string;
    password?: string;
}
export type UserContextType = {
    isSearchModalVisible: boolean,
    setIsSearchModalVisible: (status: boolean) => void
};