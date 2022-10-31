import { useEffect, useRef, useState } from 'react';
import authAxios from '../auth/authAxios';
import { PostInterface } from '../interface/App';

const useInfiniteScrollOnMyArticles = (
  query: number,
  pageLink: string,
  id: string
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const cursor = useRef<any>();

  useEffect(() => {
    localStorage.setItem('link', '/articles');
    setLoading(true);
    setError(false);
    if (typeof id === 'string') {
      authAxios
        .get(`/users/${id}/posts?limit=${query}&nextPage=${pageLink}`)
        .then((res) => {
          console.log('API WAS CALLED');
          setPosts((prevPosts) => {
            return [
              ...new Set([...prevPosts, ...res.data[1].map((p: object) => p)]),
            ];
          });
          setHasMore(res.data[0].next_page !== null);
          setLoading(false);
          cursor.current = res.data[0].next_page;
          console.log(res.data);
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          console.log(e);
        });
    }
  }, [query, pageLink]);
  return { loading, error, posts, hasMore, cursor };
};

export default useInfiniteScrollOnMyArticles;
