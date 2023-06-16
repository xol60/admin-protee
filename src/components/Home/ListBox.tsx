import * as React from 'react';
import Stack from '@mui/material/Stack';
import InfoBox from './InfoBox'
import api from '../../api/setUpApi'
import { AnalyticsDto } from '../../module/analytics.dto'
export default function ListBox() {
    const data: string[] = ['user', 'location', 'family']
    const [loading, setLoading] = React.useState(true)
    const [analytic, setAnalytic] = React.useState<AnalyticsDto>({
        user: 0,
        family: 0,
        location: 0
    });
    React.useEffect(() => {
        const resUser = api.analytics.user()
        const resFamily = api.analytics.family()
        const resLocation = api.analytics.location()
        Promise.all([resUser, resFamily, resLocation]).then(values => {
            setAnalytic({
                user: values[0],
                family: values[1],
                location: values[2]
            })
            setLoading(false)
        })
    }, [])
    if (loading) return <></>
    return (
        <div>
            <Stack direction="row" spacing={2}>
                {data.map((info) => {
                    return (
                        <InfoBox type={info} number={analytic[info as keyof AnalyticsDto]} />
                    )
                }
                )}
            </Stack>
        </div>
    );
}