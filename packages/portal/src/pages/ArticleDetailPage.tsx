import { Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddComment } from '../components/AddComment'
import { ArticleDetail } from '../components/ArticleDetail'
import { Comment } from '../components/Comment'
import { Navbar } from '../components/NavBar'
import { PostsHeader } from '../components/PostsHeader'
import { AppContext } from '../context/AppContext'
import { AppContextInterface, CommentInterface } from '../interface/App'
import { getComments } from '../services/LoginApi'

export const ArticleDetailPage = () => {
  const { articleId } = useParams()

  const context: AppContextInterface | null = useContext(AppContext)
  const [data, setData] = useState<CommentInterface[]>([])
  const [commentCursor, setCommentCursor] = useState(1)
  const [next, setNext] = useState(true)
  const [count, setCount] = useState(0)

  /**
   * set state with all comments
   * @param id
   */
  const allComments = async (id: string) => {
    const response = await getComments(id, commentCursor, 3)
    setData([...data, ...response.data.results])
    setCommentCursor(commentCursor + 1)
    setCount(response.data.count)
    response.data.next ? setNext(true) : setNext(false)
  }

  const refreshComments = async (id: string) => {
    const response = await getComments(id, 1, 3)
    setData([...response.data.results])
    setCommentCursor(2)
    setCount(response.data.count)
    response.data.next ? setNext(true) : setNext(false)
  }

  useEffect(() => {
    localStorage.setItem('link', `/articles/${articleId}`)
    if (articleId) {
      allComments(articleId)
    }
  }, [])
  return (
    <>
      {context?.loggedIn ? (
        <Navbar login={true} isArticleDetail={true} />
      ) : (
        <Navbar isArticleDetail={true} />
      )}
      <Container sx={{ marginTop: 9 }}>
        <Box>
          <ArticleDetail articleId={`${articleId}`} />
        </Box>
        {context?.loggedIn ? (
          <Box sx={{ marginTop: '72px', marginBottom: '24px' }}>
            <PostsHeader count={count} name='comments' textSize='24px' />
          </Box>
        ) : (
          <Box sx={{ marginTop: '72px', marginBottom: '24px' }}>
            <PostsHeader
              count={count}
              name='comments .'
              textSize='24px'
              link={true}
            />
          </Box>
        )}
        <Box>
          {context?.loggedIn && (
            <AddComment
              width='1000px'
              articleId={articleId}
              placeholder='Write a comment...'
              labelAbove='Add Comment'
              refreshComment={refreshComments}
              Comment={true}
            />
          )}
        </Box>
        <Box mt={3}>
          {data.length > 0 &&
            data.map((o) => {
              return <Comment key={o.id} object={o} />
            })}
        </Box>
        <Box mt={5} mb={5} display='flex' alignItems='center'>
          {next && (
            <Button
              onClick={() => {
                allComments((articleId as unknown) as string)
              }}
              variant='outlined'
              color='secondary'
              sx={{
                fontWeight: '600',
                textTransform: 'capitalize',
                borderRadius: '18px',
                marginLeft: '280px',
                padding: '4px',
                width: '300px',
              }}
            >
              Load More Comments
            </Button>
          )}
        </Box>
      </Container>
    </>
  )
}
