import React from 'react';
import ReactApexChart  from 'react-apexcharts'


class App extends React.Component {
  constructor(props) {
    super(props);

    var data = [
      
      {
        x: new Date(1538879400000),
        y: [6604.44, 6604.44, 6600, 6603.5]
      },
      {
        x: new Date(1538881200000),
        y: [6603.5, 6603.99, 6597.5, 6603.86]
      },
      {
        x: new Date(1538883000000),
        y: [6603.85, 6605, 6600, 6604.07]
      },
      {
        x: new Date(1538884800000),
        y: [6604.98, 6606, 6604.07, 6606]
      },
    ];
    var volumedata = [
      
      {
        x: new Date(1538879400000),
        y: 10
      },
      {
        x: new Date(1538881200000),
        y: 20
      },
      {
        x: new Date(1538883000000),
        y: 30
      },
      {
        x: new Date(1538884800000),
        y: 40
      },
    ];

    this.timer = this.timer.bind(this);
    setInterval(this.timer, 1000);
    this.state = {
    
      series: [{
        name: 'candle',
        type: 'candlestick',
        data: data
      },
      {
        name: 'volume',
        type: 'column',
        data: volumedata
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        stroke: {
          width: [3, 1]
        },
        tooltip: {
          shared: true,
          custom: [ function({ seriesIndex, dataPointIndex, w }) {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
            return (
              '<div class="apexcharts-tooltip-candlestick">' +
              '<div>Open: <span class="value">' +
              o +
              '</span></div>' +
              '<div>High: <span class="value">' +
              h +
              '</span></div>' +
              '<div>Low: <span class="value">' +
              l +
              '</span></div>' +
              '<div>Close: <span class="value">' +
              c +
              '</span></div>' +
              '<div>volume: <span class="value">' +
              c +
              '</span></div>' +
              '</div>'
            )
          }, function({ seriesIndex, dataPointIndex, w }){
            return "";
          }]
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: [{
          seriesName: "candle",
          opposite: true,
          min: 6600,
          max: 6610,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              color: '#FEB019',
            },
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: '#FEB019',
            }
          }
        },
        {
          seriesName: "volume",
          tooltip: {
            enabled: false
          }
        }]
      },
    
    
    };
  }


  timer()
  {
    const newSeries = [];
    
    console.log(this.state.series);
    this.state.series.forEach(s => {
      const data = s.data.map((d, index) => {
        if(index === 0)
          return { x: d.x, y: [Math.random() * 6600, Math.random() * 6600, Math.random() * 6600, Math.random() * 6600]}
        else
          return d;
      });

      newSeries.push({ data: data, name: s.name, type: s.type });
    });

    //this.setState({series: newSeries});
    console.log(this.state.series);
  }
  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default App;
