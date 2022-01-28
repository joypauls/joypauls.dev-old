/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
// import BlogListItem from "@lekoarts/gatsby-theme-minimal-blog/src/components/blog-list-item";
import BlogListCard from "../../../components/blog-list-card";

type ListingProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
  className?: string
  showTags?: boolean
}

const Listing = ({ posts, className = ``, showTags = true }: ListingProps) => (
  <section sx={{ mb: [5, 6, 7], mt: [4, 5], mx: [4, 3, 0] }} className={className}>
    <Grid columns={[1, 2, 3]}>
      {posts.map((post) => (
        <BlogListCard key={post.slug} post={post} showTags={showTags} />
      ))}
    </Grid>
  </section>
);

export default Listing;
