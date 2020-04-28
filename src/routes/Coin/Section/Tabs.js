import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import TradeTable from "../../../components/TradeTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs({
  name,
  description,
  homepage,
  site,
  current_price,
  market_cap,
  reddit,
  github,
  tickers,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="개요" {...a11yProps(0)} />
          <Tab label="소개" {...a11yProps(1)} />
          <Tab label="거래소" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          현재 {name} 시세는 ₩{current_price}입니다.
        </div>
        <div>
          자세한 정보는{" "}
          <a href={`${homepage}`} target="_blank" rel="noopener noreferrer">
            {homepage}
          </a>
          에서 확인할 수 있습니다.
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {description}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TradeTable tickers={tickers} />
      </TabPanel>
    </div>
  );
}

export default SimpleTabs;
