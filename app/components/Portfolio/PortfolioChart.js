// @flow
import React from 'react';
import { defaults, HorizontalBar } from 'react-chartjs-2';
import { withTheme } from 'material-ui';
import { getTickerPrice } from '../../helpers/transactions';
import type { Ticker } from '../../reducers/ticker/types.d';
import getColor from '../../utils/colors';

// Disable animating charts by default.
defaults.global.animation = false;

type Props = {
  ticker: Ticker,
  portfolio: Object,
  sum: number,
  theme: Object
};

function PortfolioChart({ ticker, portfolio, sum, theme }: Props) {
  const chartData = calculateChartData(ticker, portfolio, sum, theme);

  return (
    <HorizontalBar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'x',
          callbacks: {
            label: (item, data) => `${data.datasets[item.datasetIndex].label}: ${item.xLabel} %`,
          },
        },
        legend: {
          display: true,
          labels: {
            fontColor: theme.palette.text.primary,
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
                color: theme.palette.text.secondary,
              },
              ticks: {
                fontColor: theme.palette.text.primary,
                min: 0,
                max: 100,
              },
            }],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                color: theme.palette.text.secondary,
              },
            }],
        },
      }}
    />
  );
}

export default withTheme()(PortfolioChart);

function calculateChartData(ticker: Ticker, portfolio: Object, sum: number, theme: Object) {
  const datasets = Object.keys(portfolio)
    .filter(asset => portfolio[asset] > 0)
    .filter(asset => ticker[asset])
    .sort((a, b) =>
      (getTickerPrice(ticker, b, 'BTC') * portfolio[b]) - (getTickerPrice(ticker, a, 'BTC') * portfolio[a]))
    .map(asset => ({
      label: asset.toUpperCase(),
      backgroundColor: getColor(asset),
      borderColor: theme.palette.background.default,
      borderWidth: 1,
      data: [((getTickerPrice(ticker, asset, 'BTC') * portfolio[asset] * 100) / sum).toFixed(2)],
    }));

  return { datasets };
}
