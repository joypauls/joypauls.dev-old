/** @jsx jsx */
/** Based on Listing component from @lekoarts/gatsby-theme-minimal-blog */
import { jsx } from "theme-ui";
import { OrgListItem } from "./org-list-item";


const OrgList = (posts) => (
  <section sx={{ mb: [5, 6, 7] }} className={className}>
    {posts.map((post) => (
      <OrgListItem post={post} />
    ))}
  </section>
);

export default OrgList;
