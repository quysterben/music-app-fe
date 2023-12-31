/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import useQueueStore from '../../hooks/useQueueStore';

import { Grid, GridItem } from '@chakra-ui/react';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import MusicPlayer from '../components/MusicPlayer';

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function DefaultLayout({ children }) {
  const queue = useQueueStore((state) => state.queue);

  if (queue.length === 0)
    return (
      <Grid
        templateAreas={`"nav header"
                    "nav main"
                    `}
        gridTemplateRows={'60px 1fr'}
        gridTemplateColumns={'240px 1fr'}
        h="100vh"
      >
        <GridItem area={'header'}>
          <Header />
        </GridItem>
        <GridItem area={'nav'}>
          <SideBar />
        </GridItem>
        <GridItem area={'main'}>{children}</GridItem>
      </Grid>
    );

  return (
    <Grid
      templateAreas={`"nav header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={'60px 1fr 80px'}
      gridTemplateColumns={'240px 1fr'}
      h="100vh"
    >
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <GridItem area={'nav'}>
        <SideBar />
      </GridItem>
      <GridItem area={'main'}>{children}</GridItem>
      <GridItem area={'footer'}>
        <MusicPlayer />
      </GridItem>
    </Grid>
  );
}
