import { getRole } from "@/lib/actions";
import { permanentRedirect } from "next/navigation";

export default async function Home() {
	const role = await getRole();

	if (role === "admin") {
		permanentRedirect("/admin");
	}

	if (role === "doctor" || role === "nurse" || role === "receptionist") {
		permanentRedirect('/healthcareprofessional');
	}

	if (role === "patient") {
		permanentRedirect('/patient');
	}

	permanentRedirect('/login');
}
