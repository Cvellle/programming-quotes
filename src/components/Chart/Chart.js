import React from 'react';
import './Chart.css'

class Chart extends React.Component {

  render() {
    const entr = this.props.entr; //Authors and number of quotes by each
    const allQuotes = this.props.allQuotes; //for dividing and gainig precentage

    //Making a list with Object entries - Authors and number of quotes by each
    const list = entr.map((num, i) =>
      // num - shows the number of quotes per author
      <li className="chartdiv">
        <div className="listpart">
          {num[0]}:
            <div className="size"
            style={{ width: (((num[1]) * 100 / allQuotes.length)) * 5 + '%', height: "1em" }} key={i}>
          </div>
          <span className="number">
            {(num[1] / (allQuotes.length) * 100).toFixed(1) + '%'}
          </span>
        </div>
      </li>
    );

    return (
      <ul className="chartlist">{list}</ul>
    );
  }
}

export default Chart;
