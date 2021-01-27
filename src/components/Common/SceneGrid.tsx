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
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gridBox: {
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
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridTile: {
    cursor: 'pointer',
    '& .MuiGridListTile-tile': {
      border: '2px solid transparent',
    },
    '& .MuiGridListTile-tile:hover': {
      border: '2px solid white',
    },
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

export interface SceneItem {
  key: string;
  title: string;
  description: string;
  image: string;
}

interface SceneGridProps {
  /**
   * Items to be rendered in grid.
   */
  items: SceneItem[];
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
const SceneGrid: React.FunctionComponent<WithWidthProps & SceneGridProps> = (
  Props: WithWidthProps & SceneGridProps
) => {
  const history = useHistory();
  const classes = useStyles();
  const { items, width, hideBottomMargin, isHorizontal } = Props;

  // https://stackoverflow.com/a/53463748/2077741
  const getGridListCols = () => {
    if (width && isWidthUp('lg', width)) {
      return 3;
    }

    if (width && isWidthUp('md', width)) {
      return 2;
    }

    return 1;
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
        {items.map((scene) => (
          <GridListTile
            key={scene.key}
            className={classes.gridTile}
            onClick={() => {
              history.push(`${history.location.pathname}/${scene.key}`);
            }}
          >
            <img src={scene.image} alt={scene.title} />
            <GridListTileBar
              className={classes.gridTileBar}
              title={scene.title}
              subtitle={scene.description}
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};

export default withWidth()(SceneGrid);
