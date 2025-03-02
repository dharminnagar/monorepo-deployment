import { prismaClient } from "@repo/prisma/client";

export default async function Home() {
    const user = await prismaClient.user.findMany();

    return (
        <div>
            <h1>Hello World</h1>
            <ul>
                {user &&
                    user.map((user) => (
                        <li key={user.id}>
                            {user.email} {user.password}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
