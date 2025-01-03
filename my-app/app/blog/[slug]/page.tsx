// app/blog/[slug]/page.tsx
'use client'
import { useParams } from 'next/navigation'; // Use next/navigation
import client from '../../../sanity/lib/client';

const query = `*[_type == "blog" && slug.current == $slug][0]{
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

export default async function BlogPost() {
  const { slug } = useParams(); // Access slug parameter from the URL

  // Fetch data from Sanity inside the component
  const post = await client.fetch(query, { slug });

  if (!post) {
    return <div className="text-center py-6 text-xl">Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">{post.title}</h1>

      {/* Main Image */}
      <img
        src={post.mainImage?.asset?.url}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
      />

      {/* Published Date */}
      <div className="text-center text-gray-600 mb-6">
        <p>Published on {new Date(post.publishedAt).toLocaleDateString()}</p>
      </div>

      {/* Blog Content */}
      <div className="space-y-6">
        {post.content?.map((block: any, index: number) => (
          <div key={index}>
            <p className="text-lg text-gray-800">{block.children[0].text}</p>
          </div>
        ))}
      </div>

      {/* Back to Blog Link */}
      <div className="text-center mt-8">
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
        >
          Back to Blog
        </a>
      </div>
    </div>
  );
}
