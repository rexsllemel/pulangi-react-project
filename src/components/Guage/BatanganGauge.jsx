import React, { Component } from 'react';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import axios from 'axios';

class BatanganGauge extends Component {
    state = {
        value: 3.6 // Assuming 3 as initial value, which corresponds to the midpoint of the range
    };
    startColor = 'green';
    endColor = 'red';

    componentDidMount() {
        // Fetch the latest value from the backend initially
        this.fetchLatestValue();

        // Refresh the value every 5 seconds
        this.interval = setInterval(this.fetchLatestValue, 1000);
    }

    componentWillUnmount() {
        // Clear the interval when the component is unmounted
        clearInterval(this.interval);
    }

    fetchLatestValue = () => {
        axios.get('http://faithvpn.site:5000/batangan_level')
            .then(response => {
                const latestValue = response.data[0]; // Assuming the latest value is the first element in the response array
                this.setState({ value: latestValue });
            })
            .catch(error => {
                console.error('Error fetching latest value:', error);
            });
    };
    

    render() {
        const radius = 100;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const valueInPercentage = (this.state.value / 6) * 100; // Convert to percentage
        const fillColor = interpolate(valueInPercentage / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: color(fillColor).brighter(5).toString(),
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

        return (
            <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={valueInPercentage} // Use value in percentage
                    percent=""
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = (props.value / 100 * 6).toFixed(1); // Convert back to the range 0-6 and display as decimal
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const titleStyle = {
                            fontSize: textPixels * 0.4,
                            fill: '#000' // Black color
                        };

                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan x={0} dy="1.2em" style={titleStyle}>METERS</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: `url(#gradient-${this.state.value})`
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                />
                <svg style={{ height: 0, width: 0 }}>
                    <defs>
                        <linearGradient id={`gradient-${this.state.value}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            {gradientStops.map(stop => (
                                <stop
                                    key={stop.key}
                                    offset={stop.offset}
                                    stopColor={stop.stopColor}
                                    stopOpacity={stop.stopOpacity}
                                />
                            ))}
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }
}

export default BatanganGauge;
