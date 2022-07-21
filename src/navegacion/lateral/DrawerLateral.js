import React from "react";
// MUI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";

// MUI-ICONS
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// REDUX
import { useSelector } from "react-redux";
import BotonDeMenuLateral from "./BotonDeMenuLateral";
import botones from "./botones";



const DrawerLateral = ({ abierto, fnCerrar, fnAbrir }) => {

	let usuario = useSelector(state => state.api.usuario.datos);

	return <SwipeableDrawer anchor="left" open={abierto} onClose={fnCerrar} onOpen={fnAbrir} disableSwipeToOpen={usuario.jwt ? null : true}	>
		<Box sx={{ bgcolor: 'barraSuperior.main', minWidth: '400px' }}>
			<IconButton  onClick={fnCerrar} sx={{float: 'left', my: 1.6, ml: 1, mr: 2 }}>
				<ChevronLeftIcon sx={{ fontSize: '38px', color: "barraSuperior.contrastText" }} />
			</IconButton>
			<Typography variant="h6" component="div" sx={{ mt: 1.2, color: "barraSuperior.contrastText" }}>{usuario.pernr}</Typography>
			
		</Box>

		<List>
			{botones.map((boton, i) => <BotonDeMenuLateral key={i} fnCerrarDrawer={fnCerrar} {...boton} />)}
		</List>
	</SwipeableDrawer>

}


export default React.memo(DrawerLateral)