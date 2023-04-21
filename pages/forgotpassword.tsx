import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as Forgot from '../components/Auth/ForgotPassword'
const inter = Inter({ subsets: ['latin'] })

export default function ForgotPassword() {
    return (
        <div>
            <Forgot.default />
        </div>
    )
}
