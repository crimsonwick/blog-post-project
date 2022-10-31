import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import customAxios from '../auth/useAxios';
import { PostInterface } from '../interface/App';

const useInfiniteScrollOnHome = (query: number, pageLink: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const cursor = useRef<any>();

  useEffect(() => {
    localStorage.setItem('link', '/');
    setLoading(true);
    setError(false);
    customAxios
      .get(`/post?limit=${query}&nextPage=${pageLink}`)
      .then((res) => {
        console.log('API WAS CALLED');
        setPosts((prevPosts) => {
          return [
            ...new Set([...prevPosts, ...res.data[1].map((p: object) => p)]),
          ];
        });
        setHasMore(res.data[0].nextPage !== null);
        setLoading(false);
        cursor.current = res.data[0].nextPage;
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
