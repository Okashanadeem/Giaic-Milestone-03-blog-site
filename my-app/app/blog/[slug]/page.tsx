import { notFound } from 'next/navigation';
import Image from 'next/image';
import client from '../../../sanity/lib/client';

interface BlogPost {
  _id: string;
  title: string;
  mainImage: { asset: { url: string } };
  content: Array<{ children: Array<{ text: string }> }>;
  publishedAt: string;
  author: { name: string };
}

// Fetch blog post data 
async function fetchBlogPost(): Promise<BlogPost | null> {
  const query = `*[_type == "blog"][0] {  // Fetch the first blog post
    _id,
    title,
    mainImage {
      asset -> {
        url
      }
    },
    content,
    publishedAt,
    author -> {
      name
    }
  }`;
  const blog = await client.fetch(query);
  return blog || null;
}

export default async function BlogPostPage() {
  const blog = await fetchBlogPost();

  if (!blog) {
    return notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <div className="text-gray-600 mb-6">
          <p>
            By <span className="font-semibold">{blog.author.name}</span> |{' '}
            {new Date(blog.publishedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <Image
            src={blog.mainImage.asset.url}
            alt={blog.title}
            width={800}
            height={400}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="prose max-w-none">
          {blog.content?.map((block, index) => (
            <p key={index}>
              {block.children?.map((child, i) => (
                <span key={i}>{child.text}</span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
