import Image from 'next/image';
import Link from 'next/link';
import client from '../sanity/lib/client'; // Ensure this path matches your setup

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { url: string } };
  content: Array<{ children: Array<{ text: string }> }>;
}

// Fetch the blog data
async function fetchBlogs(): Promise<Blog[]> {
  const query = `*[_type == "blog"] | order(publishedAt desc)[0..2] {
    _id,
    title,
    slug,
    mainImage {
      asset -> {
        url
      }
    },
    content,
  }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const blogs = await fetchBlogs();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Explore insights, tutorials, and stories on web development and technology.
          </p>
        </div>
      </header>

      {/* Featured Blogs */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Blogs
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <Image
                  src={blog.mainImage.asset.url}
                  alt={blog.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {/* Display the first 100 characters of the first block */}
                    {blog.content?.[0]?.children?.map((child) => child.text).join(' ').slice(0, 100) || 'No content available'}...
                  </p>
                  <Link
                    href={`/blog/${blog.slug.current}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} My Blog. All Rights Reserved.</p>
          <div className="mt-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-blue-400 mx-2 hover:underline"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="text-blue-400 mx-2 hover:underline"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-blue-400 mx-2 hover:underline"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
