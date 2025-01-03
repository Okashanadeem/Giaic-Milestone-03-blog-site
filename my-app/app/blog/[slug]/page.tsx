import { notFound } from 'next/navigation'; // To handle 404 page if post not found
import client from '../../../sanity/lib/client'; // Import your client
import Image from 'next/image'; // Import the Image component from next/image
import Link from 'next/link'; // Import Link for navigation

// Define the Block type
interface Block {
  children: { text: string }[];
}

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

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Fetch data from Sanity based on the slug parameter
  const post = await client.fetch(query, { slug: params.slug });

  // If no post is found, show 404
  if (!post) {
    notFound(); // This automatically triggers the 404 page in Next.js
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">{post.title}</h1>

      {/* Main Image */}
      <Image
        src={post.mainImage?.asset?.url}
        alt={post.title}
        width={1200} // Provide a width for the image
        height={800} // Provide a height for the image
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
      />

      {/* Published Date */}
      <div className="text-center text-gray-600 mb-6">
        <p>Published on {new Date(post.publishedAt).toLocaleDateString()}</p>
      </div>

      {/* Blog Content */}
      <div className="space-y-6">
        {post.content?.map((block: Block, index: number) => (
          <div key={index}>
            <p className="text-lg text-gray-800">{block.children[0].text}</p>
          </div>
        ))}
      </div>

      {/* Back to Blog Link */}
      <div className="text-center mt-8">
        <Link href="/" passHref>
          <a className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
            Back to Blog
          </a>
        </Link>
      </div>
    </div>
  );
}
