import PantallaAccesos from './accesos/PantallaAccesos';
import PantallaAccesosPrueba from './accesos/PantallaAccesosPrueba';
import PantallaAnticipos from './anticipos/PantallaAnticipos';
import PantallaGestiones from './gestiones/PantallaGestiones';
import PantallaNomina from './nomina/PantallaNomina';
import PantallaLogin from './PantallaLogin';
import PantallaPrincipal from './PantallaPrincipal';
import PantallaTickets from './tickets/PantallaTickets';
import PantallaVales from './vales/PantallaVales';

const Pantallas = {
	Principal: PantallaPrincipal,
	Login: PantallaLogin,
	Vales: PantallaVales,
	Nomina: PantallaNomina,
	Accesos: PantallaAccesos,
	AccesosPrueba: PantallaAccesosPrueba,
	Tickets: PantallaTickets,
	Anticipos: PantallaAnticipos,
	Gestiones: PantallaGestiones

}

export default Pantallas;