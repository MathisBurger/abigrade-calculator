import React from "react";
import { TreeItem, treeItemClasses } from "@mui/lab";
import { styled } from '@mui/material/styles';


const ModifiedTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    padding: '10px',
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  }
}));

export default ModifiedTreeItem;
