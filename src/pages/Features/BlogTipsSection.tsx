// ✅ 1. BlogTipsSection.tsx
import { blogs } from '@/lib/data/blogs';
import { BlogPost } from '@/types';
import { Link } from 'react-router-dom';

const BlogTipsSection = () => {
  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="mx-auto w-[98%] max-w-7xl px-4">
        <h2 className="mb-10 text-3xl md:text-4xl font-extrabold italic text-cyan-700">
          Cycling Tips & Articles
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          {blogs.map((post: BlogPost) => (
            <div
              key={post.slug}
              className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={post.cover}
                alt={post.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="mb-3 text-sm text-gray-500">📅 {post.date}</p>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="text-cyan-600 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogTipsSection;