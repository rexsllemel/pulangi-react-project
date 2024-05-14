import React, { useEffect, useState } from 'react';
import ChartistGraph from 'react-chartist';
import axios from 'axios';

const DailySalesChart = () => {
    const [salesData, setSalesData] = useState({
        labels: ['30  mins ago', '1 Hour ago', 'W', 'T', 'F', 'S', 'S'],
        series: [
            [1, 2, 3, 4, 5, 6, 7]
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

            setSalesData({
                ...salesData,
                series: [newData]
            });
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    const chartOptions = {
        lineSmooth: 'Cardinal',
        low: 0,
        high: 10,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    };

    const chartAnimation = {
        draw: function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: 'easeOutQuint'
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
    };

    return (
        <div>
            <ChartistGraph data={salesData} options={chartOptions} type="Line" listener={chartAnimation} />
        </div>
    );
};

export default DailySalesChart;
