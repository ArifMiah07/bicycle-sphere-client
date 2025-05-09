import { blogs } from '@/lib/data/blogs';
import { BlogPost } from '@/types';
import { Link } from 'react-router-dom';

const Blogs = () => {
  return (
    <section className="mx-auto mt-24 w-full bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-4xl font-bold text-cyan-700 italic">
          Expert Cycling Tips & Articles
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((post:BlogPost) => (
            <div
              key={post.slug}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <img src={post.cover} alt={post.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-semibold text-gray-800">{post.title}</h3>
                <p className="mb-4 text-gray-600">{post.date}</p>
                <Link to={`/blogs/${post.slug}`} className="font-medium text-cyan-600 hover:underline">
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

export default Blogs;
