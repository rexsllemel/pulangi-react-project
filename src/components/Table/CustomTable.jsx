// CustomTable.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { tableStyle } from 'variables/styles';

const styles = theme => ({
    tableCell: {
        border: '1px solid #dddddd',
        padding: '8px',
    },
});

class CustomTable extends React.Component {
    render() {
        const { classes, tableHead, tableData, rowColors, tableHeaderColor } = this.props;
        return (
            <div>
                <Table>
                    <TableHead className={classes[tableHeaderColor+"TableHeader"]}>
                        <TableRow>
                            {tableHead.map((headCell, index) => (
                                <TableCell key={index} className={classes.tableCell}>{headCell}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, rowIndex) => (
                            <TableRow key={rowIndex} style={{ backgroundColor: rowColors && rowColors[rowIndex] }}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex} className={classes.tableCell}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    rowColors: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles({ ...styles, ...tableStyle })(CustomTable);
