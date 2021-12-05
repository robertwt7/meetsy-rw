import { Link, routes } from '@redwoodjs/router'
import BlogPostCell from 'src/components/BlogPostCell'
import { MetaTags } from '@redwoodjs/web'

const BlogPostPage = ({id}) => {
  return (
    <BlogPostCell id={id} />
  )
}

export default BlogPostPage
