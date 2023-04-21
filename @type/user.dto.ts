import { Query } from './query.dto'
export interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    dob?: Date;
    isActive: boolean;
    createdAt?: Date;
}
export type UserContextType = {
    users: null,
    readonly setUsers: (users: User[]) => void;
    user: null,
    setUser: (user: User) => void;
    selectedIdUser: null,
    setSelectedIdUser: (id: string) => void;
    query: null,
    setQuery: (query: Query) => void
    isSearchModalVisible: null,
    setIsSearchModalVisible: (status: boolean) => void
};