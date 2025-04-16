import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface Props {
	children?: React.ReactNode;
}

export default function CustomCard({ children }: Props) {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
