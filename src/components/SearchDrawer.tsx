import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Drawer,
  TextField,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Typography,
  CSSObject,
  Theme,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { debounce } from "lodash";
import styles from "./SearchBar/SearchBar.module.css";
import { searchUsers } from "@/client/searchClient";
import { followUser } from "@/client/followUser";

const drawerWidth = 300;

// Drawer Styling
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: theme.spacing(7),
  [theme.breakpoints.up("sm")]: {
    width: theme.spacing(9),
  },
});

const OpenDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SearchDrawer = ({ isSearchOpen, toggleSearchDrawer }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Follow/Unfollow handler
  const handleFollowToggle = async (id: number, followed: boolean) => {
    try {
      await followUser(id);

      setResults((prevResults): any =>
        prevResults.map((user: any) =>
          user.id === id ? { ...user, followed: !followed } : user
        )
      );
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  // API Call
  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchUsers(term);
      setResults(data);
    } catch (error) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced Search
  const debouncedSearch = useCallback(
    debounce((term: string) => handleSearch(term), 500),
    []
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedSearch(searchTerm);
    } else {
      setResults([]);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <Box>
      <IconButton onClick={toggleSearchDrawer}>
        <SearchIcon />
      </IconButton>

      <OpenDrawer open={isSearchOpen} variant="permanent" anchor="right">
        <Box p={2} className={styles.drawerStyling}>
          <Box className={styles.toggleButton}>
            <ChevronRightIcon
              onClick={toggleSearchDrawer}
              className={styles.iconSize}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h4>Search</h4>
            <IconButton onClick={toggleSearchDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && debouncedSearch(searchTerm)}
            autoFocus
          />

          {loading ? (
            <Box textAlign="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {results.length > 0 ? (
                results.map((result: any, index: number) => (
                  <ListItem key={index} alignItems="center">
                    <Avatar src={result.profilePicture} alt={result.username} />
                    <Box ml={2} flexGrow={1}>
                      <Typography variant="body1" fontWeight="bold">
                        {result.username}
                        {result.verified && (
                          <CheckCircleIcon fontSize="small" color="primary" style={{ marginLeft: 4 }} />
                        )}
                      </Typography>
                      {/* <Typography variant="body2" color="textSecondary">
                        {result.bio || "No bio available"}
                      </Typography> */}
                    </Box>
                    <Button
                      variant={result.followed ? "contained" : "outlined"}
                      color={result.followed ? "secondary" : "primary"}
                      onClick={() => handleFollowToggle(result.id, result.followed)}
                    >
                      {result.followed ? "Following" : "Follow"}
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Box textAlign="center" mt={2}>
                  <p>No results found</p>
                </Box>
              )}
            </List>
          )}
        </Box>
      </OpenDrawer>
    </Box>
  );
};

export default SearchDrawer;
