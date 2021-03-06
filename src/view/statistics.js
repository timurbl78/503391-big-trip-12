import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart.js";
import {formatDatesDifference} from "../utils/point";
import {OFFER_TYPE} from "../const";

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, data) => {
  const map = new Map([
    [`TAXI`, 0],
    [`BUS`, 0],
    [`TRAIN`, 0],
    [`SHIP`, 0],
    [`TRANSPORT`, 0],
    [`DRIVE`, 0],
    [`FLIGHT`, 0],
    [`CHECK-IN`, 0],
    [`SIGHTSEEING`, 0],
    [`RESTAURANT`, 0]
  ]);

  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    if (map.has(point.tripPointType.toUpperCase())) {
      const value = map.get(point.tripPointType.toUpperCase());
      map.set(point.tripPointType.toUpperCase(), value + point.cost);
    }
  }

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`🚕 TAXI`, `🚌 BUS`, `🚂  TRAIN`, `🛳 SHIP`, `🚊 TRANSPORT`, `🚗 DRIVE`, `✈ FLIGHT`, `🏨 CHECK-IN`, `🏛 SIGHTSEEING`, `🍽 RESTAURANT`],
      datasets: [{
        data: [map.get(`TAXI`), map.get(`BUS`), map.get(`TRAIN`), map.get(`SHIP`), map.get(`TRANSPORT`),
          map.get(`DRIVE`), map.get(`FLIGHT`), map.get(`CHECK-IN`), map.get(`SIGHTSEEING`), map.get(`RESTAURANT`)],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, data) => {
  const map = new Map([
    [`TAXI`, 0],
    [`BUS`, 0],
    [`TRAIN`, 0],
    [`SHIP`, 0],
    [`TRANSPORT`, 0],
    [`DRIVE`, 0],
    [`FLIGHT`, 0],
    [`CHECK-IN`, 0],
    [`SIGHTSEEING`, 0],
    [`RESTAURANT`, 0]
  ]);

  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    if (map.has(point.tripPointType.toUpperCase())) {
      const value = map.get(point.tripPointType.toUpperCase());
      map.set(point.tripPointType.toUpperCase(), value + 1);
    }
  }

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`🚕 TAXI`, `🚌 BUS`, `🚂  TRAIN`, `🛳 SHIP`, `🚊 TRANSPORT`, `🚗 DRIVE`, `✈ FLIGHT`, `🏨 CHECK-IN`, `🏛 SIGHTSEEING`, `🍽 RESTAURANT`],
      datasets: [{
        data: [map.get(`TAXI`), map.get(`BUS`), map.get(`TRAIN`), map.get(`SHIP`), map.get(`TRANSPORT`),
          map.get(`DRIVE`), map.get(`FLIGHT`), map.get(`CHECK-IN`), map.get(`SIGHTSEEING`), map.get(`RESTAURANT`)],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, data) => {
  const map = new Map([
    [`TAXI`, 0],
    [`BUS`, 0],
    [`TRAIN`, 0],
    [`SHIP`, 0],
    [`TRANSPORT`, 0],
    [`DRIVE`, 0],
    [`FLIGHT`, 0],
    [`CHECK-IN`, 0],
    [`SIGHTSEEING`, 0],
    [`RESTAURANT`, 0]
  ]);

  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    if (map.has(point.tripPointType.toUpperCase())) {
      const value = map.get(point.tripPointType.toUpperCase());
      map.set(point.tripPointType.toUpperCase(), value + (point.endDate - point.startDate));
    }
  }

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`🚕 TAXI`, `🚌 BUS`, `🚂  TRAIN`, `🛳 SHIP`, `🚊 TRANSPORT`, `🚗 DRIVE`, `✈ FLIGHT`, `🏨 CHECK-IN`, `🏛 SIGHTSEEING`, `🍽 RESTAURANT`],
      datasets: [{
        data: [map.get(`TAXI`), map.get(`BUS`), map.get(`TRAIN`), map.get(`SHIP`), map.get(`TRANSPORT`),
          map.get(`DRIVE`), map.get(`FLIGHT`), map.get(`CHECK-IN`), map.get(`SIGHTSEEING`), map.get(`RESTAURANT`)],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${formatDatesDifference(val)}`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (`<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`);
};

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._data = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeChart = null;
    }
  }

  _getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeChart = null;
    }
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * OFFER_TYPE.length;
    transportCtx.height = BAR_HEIGHT * OFFER_TYPE.length;
    timeCtx.height = BAR_HEIGHT * OFFER_TYPE.length;

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._transportChart = renderTransportChart(transportCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
