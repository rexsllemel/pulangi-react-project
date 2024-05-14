import React, { useEffect, useState } from 'react';
import ChartistGraph from 'react-chartist';
import axios from 'axios';
import Chartist from 'chartist';

const dailySalesChart = () => {
    const [salesData, setSalesData] = useState({
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
            [40, 30, 20, 10, 23, 18, 38]
        ]
    });

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            fetchSalesData();
        }, 5000); // Fetch data every 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(fetchDataInterval);
    }, []);

    const fetchSalesData = async () => {
        try {
            const response = await axios.get('http://faithvpn.site:5000/test');
            const newData = response.data;
            console.log(newData);

            setSalesData(prevState => ({
                ...prevState,
                series: [newData]
            }));
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    return (
        <div>
            <ChartistGraph data={salesData} type="Line" />
        </div>
    );
};

const emailsSubscriptionChart = {
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
        ]
    },
    options: {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
        }
    },
    responsiveOptions: [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ],
    animation: {
        "draw": function(data) {
            if (data.type === 'bar') {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * 80,
                        dur: 500,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        }
    }
};

const completedTasksChart = {
    data: {
        labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
        series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
        ]
    },
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    animation: {
        "draw": function(data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * 80,
                        dur: 500,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        }
    }
};

export { dailySalesChart, emailsSubscriptionChart, completedTasksChart };
