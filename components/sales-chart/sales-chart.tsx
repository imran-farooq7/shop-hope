"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface Props {
	salesData: {
		month: string;
		totalSales: number;
	}[];
}
const SalesChart = ({ salesData }: Props) => {
	return (
		<ResponsiveContainer className="mt-8" width="100%" height={350}>
			<BarChart data={salesData}>
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					fill="#8884d8"
				/>
				<YAxis
					tickFormatter={(value) => `$${value}`}
					tickLine={false}
					axisLine={false}
				/>
				<Bar dataKey="totalSales" fill="salmon" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default SalesChart;
