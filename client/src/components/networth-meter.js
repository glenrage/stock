import React, {Component} from 'react';
import classnames from 'classnames';
import colors from './data/colors';
import Helpers from '../helpers'
import '../css/networth-meter.css';

let size = 300;
let centerX = size / 2;
let centerY = size / 2;
let radius = size / 2;
let gap = 10;
let innerRadius = radius - gap;
let meter_size = 180;

class NetWorthMeter extends Component {

  render() {
    let {netWorth, tickers} = this.props;
    let netWorthPortions = tickers.map(ticker => ticker.quantity * ticker.currentPrice);
    netWorthPortions.reverse();
    let netWorthPercents = netWorthPortions.map(wp => {
      let percent = parseFloat((meter_size * wp) / netWorth.current);
      return Number(percent.toFixed(2));
    });

    let angles = [];
    let rotateAngles = netWorthPercents.slice(0);
    rotateAngles.reduce((memo, ra) => {
      angles.push(memo);
      return memo + ra;
    }, 0);

    let innerCircle = Helpers.arcXY(centerX, centerY, innerRadius, Helpers.angleInRadians(180));
    let netWorthChange = netWorth.current - netWorth.invested;
    let indicator = netWorthChange >= 0 ? '▲' : '▼';
    let netWorthChangeClassNames = classnames({
      'netWorth-change': true,
      up: netWorthChange >= 0,
      down: netWorthChange < 0
    });

    return (
      <div className="netWorth-meter">
        <svg
					width={size}
					height={size / 2}
					viewBox={`0 0 ${size} ${size / 2}`}
					shapeRendering={'geometricPrecision'}
					>
          <defs>
            <radialGradient id="netWorthGrad" cx="50%" cy="100%" r="70%">
              <stop stopColor="#4a5157" offset="0"></stop>
              <stop stopColor="#52b544" offset="0">
                <animate
                  attributeName="offset"
                  dur="0.3s"
                  values="0;.20;.40;.60;.80;.95;"
                  fill="freeze"
                />
              </stop>
            </radialGradient>
          </defs>
          {
            netWorthPercents.map((wp, idx) => {
            let p = Helpers.arcXY(centerX, centerY, radius, Helpers.angleInRadians(wp));

            return (
              <path
								transform={`rotate(${ - angles[idx]},${centerX}, ${centerY})`}
								key={'ticker-' + idx}
                fill={`#${colors.styleOne[idx]}`}
								d={`M${centerX},${centerY} l${centerX},0 A${centerX},${centerY} 0 0,0 ${p.x},${p.y} z`}
							>
              <animateTransform
								attributeName="transform"
								type="rotate"
								from={`0 ${centerX} ${centerY}`}
                to={`${ - angles[idx]} ${centerX} ${centerY}`}
								dur="0.5s"
								fill="freeze"
                />
              </path>
            )
          })
				}
          <path
					fill="url(#netWorthGrad)"
					d={`M${centerX},${centerY} l${centerY - gap},0 A${centerX},${centerY} 0 0,0 ${innerCircle.x},${innerCircle.y} z`}
          />
          <text
            className="netWorth-label"
						x={centerX}
						y={centerY - 75}
						textAnchor="middle"
          >
            Portfolio Value
          </text>
          <text
            className="netWorth-current"
						x={centerX}
						y={centerY - 40}
						textAnchor="middle"
					>
            {Helpers.currency(netWorth.current)}
          </text>
          <text
						className={netWorthChangeClassNames}
						x={centerX}
						y={centerY - 15}
						textAnchor="middle"
					>
            {indicator} {Helpers.currency(netWorthChange)}
          </text>
        </svg>
      </div>
    )
  }
}

export default NetWorthMeter;
