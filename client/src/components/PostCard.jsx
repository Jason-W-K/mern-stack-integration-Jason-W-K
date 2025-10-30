export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
      <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-500 mt-1">
        Category: {post.category?.name || 'Uncategorized'}
      </p>
    </div>
  );
}