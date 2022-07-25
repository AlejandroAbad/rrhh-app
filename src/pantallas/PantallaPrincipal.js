
import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Pantallas from "./Pantallas";

import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import RedeemIcon from '@mui/icons-material/Redeem';

export default function PantallaPrincipal() {

	const navigate = useNavigate();
	const fnIrA = React.useCallback(destino => {
		navigate(destino);
	}, [navigate])

	return (<>

		<Grid container sx={{ mb: 8 }} spacing={2}>
			<Grid item xs={12} md={6}>
				<Paper elevation={3}>
					<Typography variant="h5" component="div" sx={{ pt: 3, px: 4, mb: 0 }}>
						Notificaciones
					</Typography>

					<List sx={{ width: '100%', pr: 6, pl: 2 }}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar sx={{bgcolor: 'success.light'}}><RedeemIcon /></Avatar>
							</ListItemAvatar>
							<ListItemText
								primary="Cesta de navidad"
								secondary={
									<>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											22 julio 2022
										</Typography>
										{" — Elige ya la cesta de navidad que mas te guste"}
									</>
								}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: "error.light" }}><MedicalInformationOutlinedIcon /></Avatar>
							</ListItemAvatar>
							<ListItemText
								primary="Reconocimiento médico"
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											21 julio 2022
										</Typography>
										{" — Indica si quieres realizarte el reconocimiento médico este año."}
									</React.Fragment>
								}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: "primary.main" }}><PaymentsIcon /></Avatar>
							</ListItemAvatar>
							<ListItemText
								primary="Nómina de julio"
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											24 julio 2022
										</Typography>
										{' — Ya puedes descargar tu nómina de julio 2022.'}
									</React.Fragment>
								}
							/>
						</ListItem>
					</List>
				</Paper>
			</Grid>
			<Grid item xs={12} md={6}>
				<Paper elevation={3}>

					<Typography variant="h5" component="div" sx={{ pt: 3, px: 4, mb: 0 }}>
						Accesos rápidos
					</Typography>

					<List sx={{ width: '100%', px: 2, py: 2 }} component="nav">
						<ListItemButton onClick={() => fnIrA('/nomina')}>
							<ListItemIcon>
								<PaymentsIcon />
							</ListItemIcon>
							<ListItemText primary="Mis nóminas" />
						</ListItemButton>
						<ListItemButton onClick={() => fnIrA('/anticipos')}>
							<ListItemIcon>
								<SavingsIcon />
							</ListItemIcon>
							<ListItemText primary="Anticipos y préstamos" />
						</ListItemButton>
						<ListItemButton onClick={() => fnIrA('/vales/catalogo')}>
							<ListItemIcon>
								<AddShoppingCartIcon />
							</ListItemIcon>
							<ListItemText primary="Hacer un vale de emplead@" />
						</ListItemButton>
					</List>
				</Paper>
			</Grid>
		</Grid>

		<Pantallas.Gestiones />
	</>)
}