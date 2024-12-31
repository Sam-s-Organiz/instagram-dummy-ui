import { Drawer, Box, TextField } from "@mui/material";

const SearchDrawer = ({ isSearchOpen, toggleSearchDrawer }: any) => {
  return (
    <Drawer
      anchor="right"
      open={isSearchOpen}
      onClose={toggleSearchDrawer}
      variant="temporary"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
      }}
    >
      <Box>
        <TextField fullWidth variant="outlined" placeholder="Search users..." />
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;
