import CallSplit from "@mui/icons-material/CallSplit";
import Input from "@mui/icons-material/Input";
import Dashboard from "@mui/icons-material/Dashboard";
import Storage from "@mui/icons-material/Storage";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';



const botones = [

	{ texto: "Inicio", icono: Dashboard, link: '/' },

	{ texto: "personal", esTitulo: true },
	{ texto: "Mis nóminas", icono: LocalGroceryStoreIcon, link: '/nomina' },
	{ texto: "Anticipos", icono: LocalGroceryStoreIcon, link: '/anticipos' },
	{
		texto: "Vales de empleado", icono: CallSplit, subMenu: [
			{ texto: "Crear vale", icono: Input, link: '/vales/catalogo' },
			{ texto: "Consultar", icono: Storage, link: '/vales/consulta' },
		]
	},
	{
		texto: "IRPF", icono: CallSplit, subMenu: [
			{ texto: "Situación", icono: Input, link: '/irpf/situacion' },
			{ texto: "Modelo 145", icono: Input, link: '/irpf/mod145' },
			{ texto: "Incremento Voluntario", icono: Storage, link: '/irpf/incremento' },
			{ texto: "Certificado de Retenciones", icono: Storage, link: '/irpf/incremento' },
		]
	},	
	{ texto: "Accesos", icono: LocalGroceryStoreIcon, link: '/accesos' },


]

export default botones;