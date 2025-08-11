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
  CSSObject,
  Theme,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { debounce } from "lodash";
import styles from "./Sidebar.module.css";  

const drawerWidth = 300;

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
  shouldForwardProp: (prop) => prop !== "toggleDrawer",
})(({ theme, open }) => ({
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

const SearchDrawer = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<{ username: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSearchDrawer = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `http://localhost:8081/api/user/search?term=${term}&start=0&pageSize=10`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((term) => handleSearch(term), 500),
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

      <OpenDrawer open={isSearchOpen} variant="permanent">
        <Box p={2} className={styles.drawerStyling}>
          <Box className={styles.toggleButton}>
            <ChevronLeftIcon
              onClick={toggleSearchDrawer}
              className={styles.iconSize}
            />
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
                results.map((result, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={result.username} />
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
