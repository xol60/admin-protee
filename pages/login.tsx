import { Inter } from 'next/font/google'
import * as Log from '../components/Auth/Login'
const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    return (
        <div>
            <Log.default />
        </div>
    )
}
