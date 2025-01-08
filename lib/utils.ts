export function convertPrismaObjectToPlain<T>(prismaObject: T): T {
	return JSON.parse(JSON.stringify(prismaObject));
}
