export function convertPrismaObjectToPlain<T>(prismaObject: T): T {
	return JSON.parse(JSON.stringify(prismaObject));
}
export function roundToTwoDecimalPlaces(num: number | string): number {
	if (typeof num === "number") {
		return Math.round(num * 100) / 100;
	} else if (typeof num === "string") {
		return Math.round(Number(num) * 100) / 100;
	}
	throw new Error("Value must be a string or a number");
}
export const formatDateToYYMMDD = (isoDateString: string) => {
	const date = new Date(isoDateString);

	// Extract year (last 2 digits), month, and day
	const year = date.getFullYear().toString().slice(-2);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	return `${year}-${month}-${day}`;
};
