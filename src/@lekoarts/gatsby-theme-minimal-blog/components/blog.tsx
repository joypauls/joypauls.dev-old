/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Heading, Box, Label, Radio, useThemeUI, Grid, Link as TLink } from "theme-ui";
import { Link } from "gatsby";
import { Flex } from "@theme-ui/components";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
// import Select from "react-select";
import { Dropdown } from 'semantic-ui-react'

import SignalAnimation from "../../../components/signal-animation";

import "semantic-ui-css/semantic.min.css"


// type TagsProps = {
//   list: {
//     fieldValue: string
//     totalCount: number
//   }[]
// }

type PostsProps = {
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
  [key: string]: any
}

const sortOptions = [
  { key: "date descending", value: "date descending", text: "Date ↓" },
  { key: "date ascending", value: "date ascending", text: "Date ↑" },
  { key: "alphabetical descending", value: "alphabetical descending", text: "Alphabetical ↓" },
  { key: "alphabetical ascending", value: "alphabetical ascending", text: "Alphabetical ↑" },
]

const SortDropdown = (props) => (
  <Dropdown
    placeholder="Sort Posts"
    fluid
    selection
    options={props.options}
    defaultValue={props.default}
  />
)

// const getSelectTheme = (theme) => {
//   return ({
//     /*
//     * multiValue(remove)/color:hover
//     */
//     danger: "purple",

//     /*
//      * multiValue(remove)/backgroundColor(focused)
//      * multiValue(remove)/backgroundColor:hover
//      */
//     // dangerLight: theme.palette.grey[200],

//     /*
//      * control/backgroundColor
//      * menu/backgroundColor
//      * option/color(selected)
//      */
//     neutral0: theme.colors.background,

//     /*
//       * control/backgroundColor(disabled)
//      */
//     neutral5: "orange",

//     /*
//      * control/borderColor(disabled)
//      * multiValue/backgroundColor
//      * indicators(separator)/backgroundColor(disabled)
//      */
//     neutral10: theme.colors.tagBackground,

//     /*
//      * control/borderColor
//      * option/color(disabled)
//      * indicators/color
//      * indicators(separator)/backgroundColor
//      * indicators(loading)/color
//      */
//     neutral20: theme.colors.text,

//     /*
//      * control/borderColor(focused)
//      * control/borderColor:hover
//      */
//     // this should be the white, that's normally selected
//     // neutral30: theme.palette.text.primary,

//     /*
//      * menu(notice)/color
//      * singleValue/color(disabled)
//      * indicators/color:hover
//      */
//     neutral40: 'green',

//     /*
//      * placeholder/color
//      */
//     // seen in placeholder text
//     // neutral50: theme.palette.grey['A200'],

//     /*
//      * indicators/color(focused)
//      * indicators(loading)/color(focused)
//      */
//     neutral60: 'purple',
//     neutral70: 'purple',

//     /*
//      * input/color
//      * multiValue(label)/color
//       * singleValue/color
//      * indicators/color(focused)
//      * indicators/color:hover(focused)
//      */
//     neutral80: theme.colors.text,

//     // no idea
//     neutral90: "pink",

//     /*
//      * control/boxShadow(focused)
//      * control/borderColor(focused)
//      * control/borderColor:hover(focused)
//      * option/backgroundColor(selected)
//      * option/backgroundColor:active(selected)
//      */
//     // primary: theme.palette.text.primary,

//     /*
//      * option/backgroundColor(focused)
//      */
//     primary25: theme.colors.background,

//     /*
//      * option/backgroundColor:active
//      */
//     primary50: theme.colors.background,
//     primary75: theme.colors.background,
//   })}

// const customSelectStyles = {
//   // option: (provided, state) => ({
//   //   ...provided,
//   //   borderBottom: '1px dotted pink',
//   //   color: state.isSelected ? 'red' : 'blue',
//   //   padding: 20,
//   // }),
//   control: (provided) => ({
//     ...provided,
//     // none of react-select's styles are passed to <Control />
//     backgroundColor: "background",
//   }),
//   // singleValue: (provided, state) => {
//   //   const opacity = state.isDisabled ? 0.5 : 1;
//   //   const transition = 'opacity 300ms';

//   //   return { ...provided, opacity, transition };
//   // }
// }

const Blog = ({ posts }: PostsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const context = useThemeUI();
  const { theme, colorMode, setColorMode } = context;
  // const formThemeColors = getSelectTheme(theme);
  const [filters, setFilters] = useState([]);

  const onSelectChange = values => {
    console.log(values);
    setFilters(values);
  };

  return (
    <Layout>
      <SEO title="Writing" />
      {/* <SignalAnimation /> */}
      <Title text="All Writing">
        <Link to={replaceSlashes(`/${basePath}/${tagsPath}`)}>All Tags</Link>
      </Title>
      <Grid columns={[2, 2, 3]}>
        <Box>
          <Label htmlFor="sortSelection">Sort Posts</Label>
          <SortDropdown options={sortOptions} default={sortOptions[1].value} />
          {/* <TagsDropdown 
            options={list.map((listItem) => (}
          /> */}
          {/* <Select
            sx={{ width: ["100%", "100%", "100%"] }}
            defaultValue={[]}
            isMulti
            name="filterTags"
            options={options}
            placeholder="All"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onSelectChange}
            // styles={customSelectStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...formThemeColors
              }})}
          /> */}
        </Box>
        <Box>
          {/* <Label htmlFor="sortSelection">Sort</Label>
          <SortDropdown options={sortOptions} default={sortOptions[1].value} /> */}
          {/* <Select
            sx={{ width: ["100%", "100%", "100%"] }}
            className="basic-single"
            classNamePrefix="select"
            defaultValue={sortOptions[0]}
            name="sortSelection"
            options={sortOptions}
            theme={theme => ({
              ...theme,
              colors: {
                ...formThemeColors
              }})}
          /> */}
        </Box>
      </Grid>
      <Listing posts={posts} sx={{ mt: [4, 5], mx: [6, 4, 0]}} />
    </Layout>
  );
}

export default Blog;
