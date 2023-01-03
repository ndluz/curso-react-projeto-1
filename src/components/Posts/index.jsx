import { PostCard } from '../PostCard';

import './styles.css';

export const Post = ({ posts }) => (
  <div className='posts'>
    {posts.map( post => (
      <PostCard 
        key={post.id}
        title={post.title}
        id={post.id}
        body={post.body}
        cover={post.cover}
      />
    ))}
  </div>
);
