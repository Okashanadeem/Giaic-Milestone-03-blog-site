// app/page.tsx
import Navbar from './myComponents/Navbar';
import client from '../sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';  // Import the Link component

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: { children: { text: string }[] }[];
  publishedAt: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
}

const query = `*[_type == "blog"]{
  _id,
  title,
  slug,
  content,
  publishedAt,
  mainImage {
    asset -> {
      _id,
      url
    }
  }
}`;

export default async function Home() {
  const posts: BlogPost[] = await client.fetch(query);

  if (!posts || posts.length === 0) {
    return (
      <div>
        <Navbar />
        <main className="p-4">
          <h1 className="text-4xl font-bold text-center mb-6">Welcome to My Blog</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">No Blog Posts Available</h2>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to My Blog</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {posts.map((post) => (
              <article key={post._id} className="border p-4 rounded-lg shadow-lg">
                <Image
                  src={post.mainImage?.asset?.url}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
                <p className="mt-2">
                  {/* Check if content exists and render the first block */}
                  {post.content && post.content.length > 0 && post.content[0]?.children?.[0]?.text}
                </p>
                <Link
                  href={`/blog/${post.slug.current}`}  // Use Link instead of <a>
                  className="text-blue-500 mt-4 inline-block"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
