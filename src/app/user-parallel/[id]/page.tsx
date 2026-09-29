type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
type Album = {
    userId: number;
    id: number;
    title: string;
};
async function getUserPosts(userId: string): Promise<Post[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return res.json();
}

async function getUserAlbums(userId: string): Promise<Album[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    return res.json();
}

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [posts, albums] = await Promise.all([getUserPosts(id), getUserAlbums(id)]);

    return (
        <main className="mx-auto max-w-5xl space-y-8 p-6">
            <h1 className="text-3xl font-bold">User {id}</h1>
            <section>
                <h2 className="mb-4 text-2xl font-semibold">Posts</h2>
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="rounded-lg bg-white p-5 shadow">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="mt-2 text-gray-700">{post.body}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="mb-4 text-2xl font-semibold">Albums</h2>
                <ul className="space-y-2">
                    {albums.map((album) => (
                        <li key={album.id} className="rounded-lg bg-white p-4 shadow">
                            {album.title}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}