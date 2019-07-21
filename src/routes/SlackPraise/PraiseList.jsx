import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import { CSSTransitionGroup } from 'react-transition-group';

import PraiseTile from './components/PraiseTile';
import { getPraises } from '../../services/praise';
import Notifier from './components/Notifier';

const { location } = window;
let proto = location.protocol === 'https' ? 'wss' : 'ws';

const client = new WebSocket(`${proto}://${location.host}/ws`);

class PraiseList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      praises: [],
      cursor: -1,
      isLoading: false,
      hasMore: true,
      onTop: true,
      newPraises: [],
    };

    this.debouncedScrollHandler = debounce(this.scrollHandler, 200);

    window.addEventListener('scroll', this.debouncedScrollHandler);
  }

  componentDidMount() {
    this.loadPraises();

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      try {
        const jsonData = JSON.parse(message.data);

        if (this.state.onTop) {
          this.setState(prevState => ({
            ...prevState,
            praises: [jsonData, ...prevState.praises],
          }));
        } else {
          this.setState(prevState => ({
            ...prevState,
            newPraises: [jsonData, ...prevState.newPraises],
          }));
        }
      } catch (e) {
        console.error(message);
      }
    };
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

  handlerNotifierClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState(prevState => ({
      ...prevState,
      praises: [...prevState.newPraises, ...prevState.praises],
      newPraises: [],
    }));
  };

  render() {
    const { praises, isLoading, hasMore, newPraises, onTop } = this.state;

    return (
      <div className="main-container">
        {newPraises.length > 0 && !onTop && (
          <Notifier onClick={this.handlerNotifierClick} />
        )}

        <CSSTransitionGroup
          transitionName="tile"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300}
          component="div"
          className="flex-container"
        >
          <>
            {praises.map(praise => (
              <PraiseTile
                key={praise.id}
                text={praise.text}
                userName={praise.userName}
                createdAt={praise.createdAt}
              />
            ))}
          </>
        </CSSTransitionGroup>
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>No more data!</div>}
      </div>
    );
  }
}

export default PraiseList;
