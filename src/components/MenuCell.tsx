import { Box, ListItemText, Typography } from "@mui/material";

interface MenuProps {
  icon: JSX.Element;
  titleText: string;
  isOpen: boolean;
  handleClick?: () => void;
  onIconClick?: () => void;
}

const MenuCell = ({
  icon,
  titleText,
  isOpen,
  handleClick,
  onIconClick,
}: MenuProps) => {
  return (
    <Box
      onClick={onIconClick}
      padding={0}
      display="flex"
      height="var(--px-24)"
    >
      <Box
        paddingRight={isOpen ? 2 : 0}
        alignItems="center"
        display="flex"
        width="clamp(1.875rem, 2.5vw, 2.5rem)"
        height="clamp(1.875rem, 2.5vw, 2.5rem)"
        alignSelf="center"
        justifyContent="center"
      >
        {icon}
      </Box>
      {isOpen && (
        <ListItemText
          onClick={!onIconClick ? handleClick : undefined}
          primary={<Typography fontWeight="700">{titleText}</Typography>}
          sx={{ display: "flex", alignItems: "center" }}
        />
      )}
    </Box>
  );
};

export default MenuCell;
