import React from "react";
import Chart from 'react-apexcharts';



function App() {
  const diagramOptions = {
    series: [{
      name: 'Inflation',
      data: [ 25, 32, 36, 36, 34 ]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      colors: "#20A69D",
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'center', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "°C";
        },
        offsetY: 10,
        style: {
          fontSize: '1.6rem',
          colors: ["#fff"]
        }
      },
    
      xaxis: {
        categories: [ "Fri", "Sat", "Sun", "Mon", "Tue" ],
        position: 'bottom',
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: [ "#495758" ],
            fontSize: '1.5rem'
          },
        }
      },
      
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          align: 'right',
          formatter: function (val) {
            return val + "°C";
          },
          style: {
            colors: [ "#495758" ],
            fontSize: '1.5rem'
          },
        }
      
      },
      
    },
  }
  
  
  return (
    <div className="main" data-theme="default">
      <div className="geo">
        <div className="geo__location">Dubai, United Arab Emirates</div>
        <div className="geo__date">Fri, May 6</div>
      </div>
      
      <div className="temperature">
        <div className="temperature__deg">25</div>
        <div className="temperature__wrap">
          <div className="temperature__mesure">&deg;C</div>
          
          <div className="temperature__box">
            <div className="temperature__max">
              <span className="temperature__mark">{ '\u2191' }</span>
              <p className="temperature__text">38</p>
              <span className="temperature__unit">&deg;C</span>
            </div>
            <div className="temperature__min">
              <span className="temperature__mark">{ '\u2193' }</span>
              <p className="temperature__text">25</p>
              <span className="temperature__unit">&deg;C</span>
            </div>
          </div>
        
        </div>
      </div>
      
      <div className="detail">
        <div className="detail__wrap">
          <span className="detail__icon">
            <i className="wi wi-cloudy"/>
          </span>
          <div className="detail__description">Scattered clouds</div>
        </div>
        
        <div className="detail__box">
          <div className="detail__indicator">
            <div className="detail__info">
              3.82
              <span className="detail__measure">m/s</span>
            </div>
            <div className="detail__name">wind speed</div>
          </div>
          
          <div className="detail__indicator">
            <div className="detail__info">
              57
              <span className="detail__measure">%</span>
            </div>
            <div className="detail__name">humidity</div></div>
          
          <div className="detail__indicator">
            <div className="detail__info">
              1050
              <span className="detail__measure">hpa</span>
            </div>
            <div className="detail__name">pressure</div>
          </div>
        </div>
      
      </div>
      
      <div className="diagram">
        <Chart
          type="bar"
          height={ 280 }
          options={ diagramOptions.options }
          series={diagramOptions.series}
        />
      </div>

    </div>
  );
}

export default App;
