import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddComment } from '../components/AddComment';
import { ArticleDetail } from '../components/ArticleDetail';
import { Comment } from '../components/Comment';
import { Navbar } from '../components/NavBar';
import { PostsHeader } from '../components/PostsHeader';
import { AppContext } from '../context/AppContext';
import { AppContextInterface, UserInterface } from '../interface/App';
import { CommentInterface } from '../services/CommentApi';
import { getComments } from '../services/LoginApi';

// declare function useParams<K extends string = string>(): Readonly<Params<K>>;

export const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  const [data, setData] = useState<CommentInterface[]>([]);

  /**
   * set state with all comments
   * @param id 
   */
  const allComments = async (id: string) => {
    const response = await getComments(id);
    setData(response.data);
  };

  useEffect(() => {
    if (articleId) {
      allComments(articleId);
    }
  }, []);
  return (
    <>
      {context?.loggedIn ? <Navbar login={true} /> : <Navbar />}
      <Container sx={{ marginTop: 9 }}>
        <Box>
          <ArticleDetail articleId={`${articleId}`} />
        </Box>
        <Box sx={{ marginTop: '72px', marginBottom: '24px' }}>
          <PostsHeader count={data.length} name='comments' textSize='24px' />
        </Box>
        <Box>
          {context?.loggedIn && (
            <AddComment
              width='1000px'
              articleId={`${articleId}`}
              placeholder='Write a comment...'
              labelAbove='Add Comment'
              refreshComment={allComments}
              Comment={true}
            />
          )}
        </Box>
        <Box mt={3}>
          {data.length > 0 &&
            data.map((o) => {
              return <Comment key={o.id} object={o} />;
            })}
        </Box>
      </Container>
    </>
  );
};
