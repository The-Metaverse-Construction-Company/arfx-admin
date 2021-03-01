/* eslint-disable react/no-array-index-key */
import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  isWidthUp,
  makeStyles,
  withWidth,
  WithWidthProps,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  gridBox: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gridBoxHorizontal: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridMarginBottom: {
    marginBottom: theme.spacing(10),
  },
  gridListHorizontal: {
    width: '100%',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridTile: {
    '& .MuiGridListTile-tile': {
      border: '2px solid transparent',
    },
  },
  gridImage: {
    height: 120,
    margin: theme.spacing(0, 2),
  },
  gridTileBar: {
    backgroundColor: 'transparent',
    textShadow: '1px 1px 5px black',
    height: 80,
    '& .MuiGridListTileBar-title': {
      fontSize: 30,
      lineHeight: 'inherit',
    },
    '& .MuiGridListTileBar-subtitle': {
      fontSize: 14,
    },
  },
}));

interface SceneGridSkeletonProps {
  /**
   * Items count to be rendered in grid.
   */
  itemsCount: number;
  /**
   * Set true to hide default margin in bottom.
   */
  hideBottomMargin?: boolean;
  /**
   * Set true to render items in a horizontal list.
   */
  isHorizontal?: boolean;
}

// https://github.com/mui-org/material-ui/issues/8824#issuecomment-344124872
const SceneGridSkeleton: React.FunctionComponent<
  WithWidthProps & SceneGridSkeletonProps
> = (Props: WithWidthProps & SceneGridSkeletonProps) => {
  const classes = useStyles();
  const { itemsCount, width, hideBottomMargin, isHorizontal } = Props;

  // https://stackoverflow.com/a/53463748/2077741
  const getGridListCols = () => {
    if (width && isWidthUp('lg', width)) {
      return 5;
    }

    if (width && isWidthUp('md', width)) {
      return 3;
    }

    return 2;
  };

  return (
    <Box
      className={`${classes.gridBox} ${
        hideBottomMargin ?? classes.gridMarginBottom
      } ${isHorizontal && classes.gridBoxHorizontal}`}
    >
      <GridList
        className={`${isHorizontal && classes.gridListHorizontal}`}
        cellHeight={200}
        cols={getGridListCols()}
        spacing={8}
      >
        {Array.from(new Array(itemsCount)).map((_item, index) => (
          <GridListTile key={`g_${index}`} className={classes.gridTile}>
            <Skeleton variant="rect" className={classes.gridImage} />
            <GridListTileBar
              className={classes.gridTileBar}
              title={<Skeleton width="60%" />}
              subtitle={
                <Box>
                  <Skeleton />
                  <Skeleton />
                </Box>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};

export default withWidth()(SceneGridSkeleton);
