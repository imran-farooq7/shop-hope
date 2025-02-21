"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const PaymentMethodForm = ({ paymentMethod }: { paymentMethod: string }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	return <div></div>;
};

export default PaymentMethodForm;
