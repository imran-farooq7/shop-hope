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
