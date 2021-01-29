import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import { ScrollableBox } from ".";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import { ActionResult } from "../models/Action";
import { IBasePayload } from "../models/IPayloads";
import { useHistory, useRouteMatch } from "react-router-dom";
import Routes from "../constants/Routes";
import UserDetails from "./UserDetails";
import NewUserDialog from "./Dialogs/NewUserDialog";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    marginTop: theme.spacing(3),
    height: "100%",
  },
  headerBox: {
    display: "flex",
  },
  searchBox: {
    margin: "0px 5px",
  },
  newUserBtn: {
    flex: "none",
    paddingTop: 15,
    paddingBottom: 15,
    margin: "0px 5px",
  },
  usersBox: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    height: "calc(100% - 100px)",
  },
  tableRow: {
    cursor: "pointer",
  },
}));

interface UserItem {
  key: string;
  email: string;
  type: string;
  onClick: () => void;
}

interface IUserItemsPayload extends IBasePayload {
  items: UserItem[];
}

// Local state
interface ILocalState {
  userItems: UserItem[];
  showNewUserDialog: boolean;
}

// Local default state
const DefaultLocalState: ILocalState = {
  userItems: [],
  showNewUserDialog: false,
};

// Local actions
const LocalAction = {
  AddUserItems: "AddUserItems",
  ToggleNewUserDialog: "ToggleNewUserDialog",
};

// Local reducer
const LocalReducer = (
  state: ILocalState,
  action: ActionResult<IBasePayload>
): ILocalState => {
  switch (action.type) {
    case LocalAction.AddUserItems: {
      let newItems = (action.payload as IUserItemsPayload).items;
      return { ...state, userItems: [...state.userItems, ...newItems] };
    }
    case LocalAction.ToggleNewUserDialog: {
      return { ...state, showNewUserDialog: !state.showNewUserDialog };
    }
    default: {
      return state;
    }
  }
};

const Users: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useReducer(LocalReducer, DefaultLocalState);
  const userItemRoute = useRouteMatch({
    path: `${Routes.USERS}/:userId`,
  });

  function getUsers(count: number, currentCount: number) {
    let newItems: UserItem[] = [];
    for (let loop = 0; loop < count; loop++) {
      let count = currentCount + 1 + loop;
      newItems.push({
        key: `${count}`,
        email: `hanzlamateen${count}@live.com`,
        type: "User",
        onClick: () => console.log("hello"),
      });
    }

    return newItems;
  }

  useEffect(() => {
    let users = getUsers(20, state.userItems.length);
    dispatch({
      type: LocalAction.AddUserItems,
      payload: {
        items: users,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.rootBox}>
      <Container className={classes.container} disableGutters>
        <Box className={classes.headerBox}>
          <TextField
            className={classes.searchBox}
            label="Search"
            type="search"
            variant="outlined"
            margin="normal"
            autoComplete="search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Button
            className={classes.newUserBtn}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => dispatch({ type: LocalAction.ToggleNewUserDialog })}
          >
            New User
          </Button>
        </Box>

        <Grid container>
          <Grid item xs>
            <ScrollableBox
              className={classes.usersBox}
              onScrollBottom={() => {
                let users = getUsers(20, state.userItems.length);
                dispatch({
                  type: LocalAction.AddUserItems,
                  payload: {
                    items: users,
                  },
                });
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell key="email" align="center">
                        Email
                      </TableCell>
                      <TableCell key="type" align="center">
                        Type
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.userItems.map((item, index) => {
                      return (
                        <TableRow
                          hover
                          className={classes.tableRow}
                          role="checkbox"
                          tabIndex={-1}
                          key={`user_${index}`}
                        >
                          <TableCell
                            key={`email_${index}`}
                            align="left"
                            onClick={() =>
                              history.push(`${Routes.USERS}/${item.key}`)
                            }
                          >
                            {item.email}
                          </TableCell>
                          <TableCell
                            key={`type_${index}`}
                            align="left"
                            onClick={() =>
                              history.push(`${Routes.USERS}/${item.key}`)
                            }
                          >
                            {item.type}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </ScrollableBox>
          </Grid>
          {userItemRoute && (
            <Grid item xs={4}>
              <UserDetails />
            </Grid>
          )}
        </Grid>
      </Container>

      <NewUserDialog
        open={state.showNewUserDialog}
        onClose={() =>
          dispatch({
            type: LocalAction.ToggleNewUserDialog,
          })
        }
      />
    </Box>
  );
};

export default Users;
