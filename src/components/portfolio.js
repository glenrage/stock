import React, {Component} from 'react';
import Stock from './stock';

class Portfolio extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="portfolio">
        {
          this.props.stocks.map((stock) => <Stock stock={stock}/>)
        }
      </div>
    )
  }
}

export default Portfolio;
