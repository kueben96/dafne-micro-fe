import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, styled } from '@mui/material';


const useStyles = styled((theme) => ({
    heading: {
        fontSize: '2rem',
    }
}));


const ServicesCard = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    {/* Row 1: Icon and Heading */}
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Grid item>
                                {/* Your icon */}
                            </Grid>
                            <Grid item>
                                <h1 className={classes.heading}>Custom Styled Heading</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Row 2: Description */}
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                            A Description Text with smaller font about 3 rows. A Description Text with smaller font about 3 rows. A Description Text with smaller font about 3 rows.
                        </Typography>
                    </Grid>
                    {/* Row 3: Separator Line */}
                    <Grid item xs={12}>
                        <hr />
                    </Grid>
                    {/* Row 4: Icon + Feature 1 */}
                    <Grid item xs={4}>
                        <Grid container alignItems="center">
                            <Grid item>
                                {/* Icon */}
                            </Grid>
                            <Grid item>
                                <Typography>Feature 1</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Row 5: Icon + Feature 2 */}
                    <Grid item xs={4}>
                        <Grid container alignItems="center">
                            <Grid item>
                                {/* Icon */}
                            </Grid>
                            <Grid item>
                                <Typography>Feature 2</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Row 6: Icon + Feature 3 */}
                    <Grid item xs={4}>
                        <Grid container alignItems="center">
                            <Grid item>
                                {/* Icon */}
                            </Grid>
                            <Grid item>
                                <Typography>Feature 3</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button color="primary">Button</Button>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ServicesCard;
