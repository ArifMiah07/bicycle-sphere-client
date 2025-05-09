import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogs } from '@/lib/data/blogs';
import { BlogPost } from '@/types';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogs.find((b) => b.slug === slug);
    setPost(foundPost || null);
  }, [slug]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-xl text-gray-600">
          <h2 className="text-2xl font-semibold">Oops! Blog not found.</h2>
          <p className="mt-4">Looks like the blog you're looking for doesn't exist. Try searching for something else!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-24 max-w-3xl px-4 py-12 bg-white shadow-lg rounded-xl my-8 transition-all duration-300 ease-in-out hover:scale-105">
      <h1 className="text-5xl font-extrabold text-cyan-700 mb-6">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Published on {post.date}</p>
      <img
        src={post.cover}
        alt={post.title}
        className="my-6 w-full rounded-xl shadow-2xl transition-transform duration-500 ease-in-out transform hover:scale-105"
      />
      <div className="prose prose-lg text-gray-800">
        {post.content?.map((para, index) => (
          <p key={index} className="mb-4 text-lg leading-relaxed">
            {para}
          </p>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="/blogs"
          className="inline-block px-6 py-3 bg-cyan-600 text-white text-lg font-medium rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-cyan-700"
        >
          Back to All Blogs
        </a>
      </div>
    </div>
  );
};

export default BlogDetail;
