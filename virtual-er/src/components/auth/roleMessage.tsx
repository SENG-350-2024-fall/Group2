import { getRole } from "@/lib/actions";

function titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export default async function RoleMessage() {
    const role = await getRole();

    return (
        <div className="text-sm text-gray-600">
            <p>{`Signed in as ${titleCaseWord(role)}`}</p>
        </div>
    )
}