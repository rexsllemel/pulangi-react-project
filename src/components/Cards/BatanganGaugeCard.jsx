import React from 'react';
import {
    withStyles, Card, CardContent, CardHeader,  Typography
} from 'material-ui';
import PropTypes from 'prop-types';

import { chartCardStyle } from 'variables/styles';
import Guage from '../Guage/BatanganGauge';

class ChartCard extends React.Component{
    render(){
        const { classes, chartColor,  title, text,  } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    classes={{
                        root: (classes.cardHeader + " " + classes[chartColor+"CardHeader"]),
                    }}
                    subheader={< Guage/>}
                />
                <CardContent className={classes.cardContent}>
                    <Typography type="title" component="h4" className={classes.cardTitle}>
                        {title}
                    </Typography>
                    <Typography component="p" className={classes.cardCategory}>
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

ChartCard.defaultProps = {
    chartColor: 'white'
};

ChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
    chart: PropTypes.object.isRequired,
    title: PropTypes.node,
    text: PropTypes.node,
    chartColor: PropTypes.oneOf(['orange','green','red','blue','purple']),
    statLink: PropTypes.object,
    statText: PropTypes.node
};

export default withStyles(chartCardStyle)(ChartCard);
