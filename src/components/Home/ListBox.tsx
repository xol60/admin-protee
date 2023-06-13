import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import InfoBox from './InfoBox'


export default function ListBox() {
    const data = ["user", "location", "family"]
    return (
        <div>
            <Stack direction="row" spacing={2}>
                {data.map((info) => {
                    return (
                        <InfoBox type={info} number={1} />
                    )
                }
                )}
            </Stack>
        </div>
    );
}