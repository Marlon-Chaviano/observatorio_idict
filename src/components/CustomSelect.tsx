import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = ["Admin", "Usuario"];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

interface Props {
	personName: string[];
	setPersonName: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function MultipleSelectChip({
	personName,
	setPersonName,
}: Props) {
	const theme = useTheme();

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
			<Select
				labelId="demo-multiple-chip-label"
				id="demo-multiple-chip"
				// multiple
				value={personName}
				onChange={handleChange}
				input={
					<OutlinedInput
						id="select-multiple-chip"
						label="Chip"
					/>
				}
				renderValue={(selected) => (
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
						{selected.map((value) => (
							<Chip
								key={value}
								label={value}
							/>
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{names.map((name) => (
					<MenuItem
						key={name}
						value={name}
						style={getStyles(name, personName, theme)}
					>
						{name}
					</MenuItem>
				))}
			</Select>
		</div>
	);
}
