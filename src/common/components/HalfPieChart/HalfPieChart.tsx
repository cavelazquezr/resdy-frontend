import React from 'react';

import { Pie, Cell, PieChart } from 'recharts';

interface IProps {
	data: { name: string; value: number }[];
	colors: string[];
}

export const HalfPieChart: React.FC<IProps> = (props) => {
	const { data, colors } = props;
	return (
		<PieChart width={200} height={200}>
			<Pie data={data} startAngle={180} endAngle={0} innerRadius={80} outerRadius={100} dataKey="value">
				{data.map((_, index) => (
					<Cell key={`cell-${index}`} fill={colors[index % colors.length]} style={{ outline: 'none' }} />
				))}
			</Pie>
		</PieChart>
	);
};
