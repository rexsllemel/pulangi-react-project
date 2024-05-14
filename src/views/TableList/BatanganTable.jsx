import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { RegularCard, ItemGrid } from 'components';
import CustomTable from 'components/Table/CustomTable';

class BatanganTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      rowColors: []
    };
  }

  componentDidMount() {
    const fetchData = () => {
      fetch('http://faithvpn.site:5000/batangan')
        .then(response => response.json())
        .then(data => {
          const rowColors = data.map(row => {
            const waterLevel = parseFloat(row[1]);
            if (waterLevel >= 3 && waterLevel < 4) {
              return '#ffa21a';
            } else if (waterLevel >= 4) {
              return '#f55a4e';
            } else {
              return '';
            }
          });
          // Selecting the last 15 rows
          const lastIndex = data.length - 1;
          const limitedData = data.slice(Math.max(0, lastIndex - 19), lastIndex + 1);
          const limitedRowColors = rowColors.slice(Math.max(0, lastIndex - 19), lastIndex + 1);
          this.setState({ tableData: limitedData, rowColors: limitedRowColors });
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchData();

    this.interval = setInterval(fetchData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const reversedTableData = [...this.state.tableData].reverse(); // Reverse the order of tableData
    const reversedRowColors = [...this.state.rowColors].reverse(); // Reverse the order of rowColors

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Batangan Node"
            cardSubtitle="Batangan Water Level History"
            content={
              <CustomTable
                tableHeaderColor="primary"
                tableHead={['Date', 'Water Level', 'Time']}
                tableData={reversedTableData} // Use reversedTableData
                rowColors={reversedRowColors} // Use reversedRowColors
              />
            }
          />
        </ItemGrid>
      </Grid>
    );
  }
}

export default BatanganTable;
