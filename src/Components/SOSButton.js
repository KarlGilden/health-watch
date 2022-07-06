import * as React from 'react';
import Button from '@mui/material/Button';

const SOSButton = () => {
    return (
        <div>
            <Button
            variant="contained"
            color="error"
            sx={{borderRadius: 30, height:150, width:150}}
            >
                SOS
            </Button>
        </div>
    )
}

export default SOSButton;