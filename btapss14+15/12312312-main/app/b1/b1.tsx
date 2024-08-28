import { GetServerSideProps } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsPageProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts`);
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
  };
};

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
