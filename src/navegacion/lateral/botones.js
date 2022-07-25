import Dashboard from "@mui/icons-material/Dashboard";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PercentIcon from '@mui/icons-material/Percent';
import SavingsIcon from '@mui/icons-material/Savings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

const botones = [

	{ texto: "Inicio", icono: Dashboard, link: '/' },

	{ texto: "personal", esTitulo: true },
	{ texto: "Mis nóminas", icono: PaymentsIcon, link: '/nomina' },
	{ texto: "Anticipos", icono: SavingsIcon, link: '/anticipos' },
	{
		texto: "Vales de emplead@", icono: ShoppingBagIcon, subMenu: [
			{ texto: "Crear vale", icono: AddShoppingCartIcon, link: '/vales/catalogo' },
			{ texto: "Consultar", icono: ReceiptLongIcon, link: '/vales/consulta' },
		]
	},
	{
		texto: "IRPF", icono: AccountBalanceIcon, subMenu: [
			{ texto: "Situación", icono: AssignmentIndIcon, link: '/irpf/situacion' },
			{ texto: "Incremento Voluntario", icono: PercentIcon, link: '/irpf/incremento' },
			{ texto: "Certificado de Retenciones", icono: HistoryEduIcon, link: '/irpf/incremento' },
		]
	},
	{ texto: "Mis accesos", icono: FingerprintIcon, link: '/accesos' },

	{ texto: "Empresa", esTitulo: true },
	{ texto: "Soporte CPD", icono: SupportAgentIcon, link: '/tickets' },
	{ texto: "Gestiones", icono: BuildCircleOutlinedIcon, link: '/gestiones' },


]

export default botones;