import React from 'react';
import { Grid } from 'material-ui';
import { ItemGrid } from 'components';
import LumbayaoTable from './LumbayaoTable';
import BatanganTable from './BatanganTable';

class TableList extends React.Component {
    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={6} md={6}>
                    <LumbayaoTable />
                </ItemGrid>
                <ItemGrid xs={12} sm={6} md={6}>
                    <BatanganTable />
                </ItemGrid>
            </Grid>
        );
    }
}

export default TableList;
