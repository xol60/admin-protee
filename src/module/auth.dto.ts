export interface RequestResetPassword {
    email: string;
}
export interface RequestLogin {
    email?: string;
    password?: string;
}
export interface ResetPassword {
    secretKey: string;
    newPassword: string;
}