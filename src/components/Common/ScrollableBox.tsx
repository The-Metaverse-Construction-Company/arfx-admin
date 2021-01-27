import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  box: {
    overflow: 'auto',
    height: '100%',
  },
}));

interface ScrollableBoxProps {
  /**
   * Class name.
   */
  className?: string;
  /**
   * Child content.
   */
  children?: React.ReactNode;
  /**
   * A callback triggered when scrolled to bottom of box.
   */
  onScrollBottom?: () => void;
  /**
   * If set to true then it will show loading spinner. True will also ignore bottom scroll events.
   */
  isLoading?: boolean;
}

const ScrollableBox: React.FunctionComponent<ScrollableBoxProps> = (
  Props: ScrollableBoxProps
) => {
  const classes = useStyles();

  return (
    <Box
      className={`${Props.className} ${classes.box}`}
      onScroll={(event) => {
        const target = event.target as any;
        if (
          target.scrollHeight - Math.ceil(target.scrollTop) ===
            target.clientHeight &&
          Props.onScrollBottom &&
          !Props.isLoading
        ) {
          Props.onScrollBottom();
        }
      }}
    >
      {Props.children}
    </Box>
  );
};

export default ScrollableBox;
