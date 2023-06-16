
import * as React from 'react';
import { Loading } from '../module/loading.dto'
export const LoadingContext = React.createContext<Loading>({
    loading: false, setLoading: () => null
});


const LoadingProvider: React.FC<any> = ({ children }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const value = {
        loading, setLoading
    }
    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
}
export default LoadingProvider