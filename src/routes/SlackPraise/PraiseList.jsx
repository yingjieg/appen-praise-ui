import React, { PureComponent } from 'react';
import PraiseTile from './components/PraiseTile';
import { getPraises } from '../../services/praise';

class PraiseList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      praises: [],
      cursor: -1,
    };
  }

  async componentDidMount() {
    const praises = await getPraises();
    const [lastPraise] = praises;

    let cursor = -1;
    if (lastPraise) {
      cursor = lastPraise.id;
    }

    this.setState({ praises, cursor });
  }

  componentWillUnmount() {}

  render() {
    const { praises } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {praises.map(praise => (
          <PraiseTile
            key={praise.id}
            text={praise.text}
            userName={praise.userName}
            createdAt={praise.createdAt}
          />
        ))}
      </div>
    );
  }
}

export default PraiseList;
