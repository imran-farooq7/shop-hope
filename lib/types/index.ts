export interface Item {
	id: string;
	name: string;
	slug: string;
	price: number;
	qty: number;
	image: string;
}
export interface Address {
	fullName: string;
	address: string;
	city: string;
	postalCode: string;
	country: string;
	lat?: number;
	lng?: number;
}
