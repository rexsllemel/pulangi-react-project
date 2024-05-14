import React from 'react';
import {
    Notifications, Dashboard,
} from 'material-ui-icons';
import classNames from 'classnames';
import {
    withStyles, IconButton, MenuItem, MenuList, Grow, Paper, ClickAwayListener, Hidden
} from 'material-ui';
import { Manager, Target, Popper } from 'react-popper';

// import { CustomInput, IconButton as SearchButton } from 'components';

import { headerLinksStyle } from 'variables/styles';

class HeaderLinks extends React.Component {
    state = {
        open: false,
    };
    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <br />
                <IconButton color="inherit" aria-label="Dashboard" className={classes.buttonLink}>
                    <Dashboard className={classes.links} />
                    <Hidden mdUp>
                        <p className={classes.linkText}>Dashboard</p>
                    </Hidden>
                </IconButton>
                <Manager style={{ display: "inline-block" }}>
                    <Target>
                        <IconButton
                            color="inherit"
                            aria-label="Notifications"
                            aria-owns={open ? 'menu-list' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick} className={classes.buttonLink}>
                            <Notifications className={classes.links} />
                            <span className={classes.notifications}>3</span>
                            <Hidden mdUp>
                                <p onClick={this.handleClick} className={classes.linkText}>Notification</p>
                            </Hidden>
                        </IconButton>
                    </Target>
                    <Popper
                        placement="bottom-start"
                        eventsEnabled={open}
                        className={classNames({ [classes.popperClose]: !open }) + " " + classes.pooperResponsive}>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                                <Paper className={classes.dropdown}>
                                    <MenuList role="menu">
                                        <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Bantangan Waterlevel is rising</MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Lumbayao back online</MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classes.dropdownItem}>Lumbayao node is not reachable</MenuItem>
                                    </MenuList>
                                </Paper>
                            </Grow>
                        </ClickAwayListener>
                    </Popper>
                </Manager>
                {/* <IconButton color="inherit" aria-label="Person" className={classes.buttonLink}>
                    <Person className={classes.links}/>
                    <Hidden mdUp>
                        <p className={classes.linkText}>Profile</p>
                    </Hidden>
                </IconButton> */}
            </div>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
