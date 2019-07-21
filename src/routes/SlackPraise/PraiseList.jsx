import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import PraiseTile from './components/PraiseTile';
import { getPraises } from '../../services/praise';

class PraiseList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      praises: [],
      cursor: -1,
      isLoading: false,
      hasMore: true,
      onTop: true,
    };

    this.debouncedScrollHandler = debounce(this.scrollHandler, 200);

    window.addEventListener('scroll', this.debouncedScrollHandler);
  }

  async componentDidMount() {
    this.loadPraises();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScrollHandler);
  }

  loadPraises = () => {
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        const praises = await getPraises(this.state.cursor);
        const len = praises.length;
        let cursor = -1;
        if (len > 1) {
          cursor = praises[len - 1].id;
        }

        this.setState(prevState => ({
          ...prevState,
          cursor,
          hasMore: len === 10,
          isLoading: false,
          praises: [...prevState.praises, ...praises],
        }));
      }
    );
  };

  scrollHandler = () => {
    const { isLoading, hasMore } = this.state;

    this.setState({ onTop: document.documentElement.scrollTop <= 200 });

    if (isLoading || !hasMore) {
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.loadPraises();
    }
  };

  render() {
    const { praises, isLoading, hasMore } = this.state;
    return (
      <div>
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
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>No more data!</div>}
      </div>
    );
  }
}

export default PraiseList;
