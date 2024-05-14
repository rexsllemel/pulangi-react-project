import React, { useEffect } from 'react';
import {
    withStyles, Grid
} from 'material-ui';
import {
    ArrowUpward, AccessTime, ArrowDownward,
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
import BatanganGaugeCard from '../../components/Cards/BatanganGaugeCard';
import LumbayaoGaugeCard from '../../components/Cards/LumbayaoGaugeCard';

import {
    ChartCard, ItemGrid
} from 'components';

import {
    //dailySalesChart,
    completedTasksChart
} from 'variables/charts';

import { dashboardStyle } from 'variables/styles';
import BatanganTable from '../TableList/BatanganTable';
import LumbayaoTable from '../TableList/LumbayaoTable';
import DailySalesChart from '../../variables/DailySalesChart';
// import color from 'material-ui/colors/amber';

const Dashboard = ({ classes }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://weatherwidget.io/js/widget.min.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div>
                <a style={{ borderRadius: '3px' }} className="weatherwidget-io" href="https://forecast7.com/en/7d86125d17/valencia-city/" data-label_1="PULANGUI" data-label_2="Valencia City Bukdinon" data-font="Roboto" data-icons="Climacons Animated" data-theme="weather_one" >PULANGUI Valencia City Bukdinon</a>
            </div>
            <br />
            <Grid container>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <BatanganGaugeCard
                            title="Batangan Gauge"
                            text="Batangan Water Level Gauge in meters"
                            statText="Gauge in meters"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <LumbayaoGaugeCard
                            title="Lumbayao Gauge"
                            text="Lumbayao Water Level Gauge in meters"
                            statText="Gauge in meters"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <ChartCard
                            chart={
                                <DailySalesChart/>

                            }
                            chartColor="green"
                            title="Batangan Node"
                            text={
                                <span>
                                    <span style={{ color: 'red' }}><ArrowUpward className={classes.upArrowCardCategory} /> 55%</span> increase in today water level.
                                </span>
                            }
                            statIcon={AccessTime}
                            statText="updated 30 minutes ago"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <ChartCard
                            chart={
                                <ChartistGraph
                                    className="ct-chart"
                                    data={completedTasksChart.data}
                                    type="Line"
                                    options={completedTasksChart.options}
                                    listener={completedTasksChart.animation}
                                />
                            }
                            chartColor="red"
                            title="Lumbayao Node"
                            text={
                                <span>
                                    <span className={classes.successText}><ArrowDownward className={classes.upArrowCardCategory} /> 10%</span> dropped in today water level.
                                </span>
                            }
                            statIcon={AccessTime}
                            statText="updated 30 minutes ago"
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <BatanganTable />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <LumbayaoTable />
                    </ItemGrid>
                </Grid>
            </Grid>
        </div>
    );
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
