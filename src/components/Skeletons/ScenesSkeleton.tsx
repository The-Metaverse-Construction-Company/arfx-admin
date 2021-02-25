import { Box, Container } from '@material-ui/core';
import React from 'react';
import SceneGridSkeleton from './SceneGridSkeleton';

const ScenesSkeleton: React.FunctionComponent = () => {
  return (
    <Box>
      <Container disableGutters>
        <SceneGridSkeleton itemsCount={45} />
      </Container>
    </Box>
  );
};

export default ScenesSkeleton;
