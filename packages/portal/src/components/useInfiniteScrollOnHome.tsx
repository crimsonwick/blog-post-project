import { useEffect, useRef, useState } from 'react';
import customAxios from '../interceptor/useAxios';
import { CursorInterface, PostInterface } from '../interface/App';

const useInfiniteScrollOnHome = (query: number, pageLink: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const cursor = useRef<CursorInterface>();

  useEffect(() => {
    localStorage.setItem('link', '/');
    setLoading(true);
    setError(false);
    customAxios
      .get(`/posts?limit=${query}&next_page=${pageLink}`)
      .then((res) => {
        console.log('API WAS CALLED');
        setPosts((prevPosts) => {
          return [
            ...new Set([
              ...prevPosts,
              ...res.data[1].map((p: PostInterface) => p),
            ]),
          ];
        });
        setHasMore(res.data[0].next_page !== null);
        setLoading(false);
        cursor.current = res.data[0].next_page;
        console.log(res.data);
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
  }, [query, pageLink]);
  return { loading, error, posts, hasMore, cursor };
};

export default useInfiniteScrollOnHome;
