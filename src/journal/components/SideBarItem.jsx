import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";

import {setActiveNote} from "../../store/journal";

export const SideBarItem = ({ title, body, date, id, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onclickNote = () => {
        dispatch(setActiveNote({title, body, date, id, imageUrls}));
    }

    const newTitle = useMemo(() => {
        return title.length > 17
          ? title.substring(0, 17) + '...'
          : title;
    }, [title]);

    return (
        <ListItem disablePadding onClick={onclickNote}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={body}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}