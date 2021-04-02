Next JS
--------------------------------

1. Server Side Rendering
    * SEO Crawlers can read the site content easily
    * Prerendered from Server Side or Static Site Configuration
    * Easy Concept for Page Creation
    * No Configuration for routing
    * No Setup for SSR  

2. Pages
3. Routings
4. getInitialProps
getInitialProps is an async function that can be added to any page as a static method. Take a look at the following example:

function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page

Or using a class component:

import React from 'react'

class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    return <div>Next stars: {this.props.stars}</div>
  }
}

export default Page

getInitialProps is used to asynchronously fetch some data, which then populates props.

Data returned from getInitialProps is serialized when server rendering, similar to what JSON.stringify does. Make sure the returned object from getInitialProps is a plain Object and not using Date, Map or Set.

For the initial page load, getInitialProps will run on the server only. getInitialProps will then run on the client when navigating to a different route via the next/link component or by using next/router. However, if getInitialProps is used in a custom _app.js, and the page being navigated to implements getServerSideProps, then getInitialProps will run on the server.
Context Object

getInitialProps receives a single argument called context, it's an object with the following properties:

    pathname - Current route. That is the path of the page in /pages
    query - Query string section of URL parsed as an object
    asPath - String of the actual path (including the query) shown in the browser
    req - HTTP request object (server only)
    res - HTTP response object (server only)
    err - Error object if any error is encountered during the rendering

5. Pre-rendering
By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)
Two forms of Pre-rendering
---------------------
Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

  1. Static Generation (Recommended): The HTML is generated at build time and will be reused on each request.
  2. Server-side Rendering: The HTML is generated on each request.

Importantly, Next.js lets you choose which pre-rendering form you'd like to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

We recommend using Static Generation over Server-side Rendering for performance reasons. Statically generated pages can be cached by CDN with no extra configuration to boost performance. However, in some cases, Server-side Rendering might be the only option.

You can also use Client-side Rendering along with Static Generation or Server-side Rendering. That means some parts of a page can be rendered entirely by client side JavaScript. To learn more, take a look at the Data Fetching documentation.

6. getStaticProps
7. getServerSideProps
8. getStaticPaths

f a page has dynamic routes (documentation) and uses getStaticProps it needs to define a list of paths that have to be rendered to HTML at build time.

If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } } // See the "paths" section below
    ],
    fallback: true or false // See the "fallback" section below
  };
}

The paths key (required)

The paths key determines which paths will be pre-rendered. For example, suppose that you have a page that uses dynamic routes named pages/posts/[id].js. If you export getStaticPaths from this page and return the following for paths:

return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: ...
}

Then Next.js will statically generate posts/1 and posts/2 at build time using the page component in pages/posts/[id].js.

Note that the value for each params must match the parameters used in the page name:

    If the page name is pages/posts/[postId]/[commentId], then params should contain postId and commentId.
    If the page name uses catch-all routes, for example pages/[...slug], then params should contain slug which is an array. For example, if this array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar.
    If the page uses an optional catch-all route, supply null, [], undefined or false to render the root-most route. For example, if you supply slug: false for pages/[[...slug]], Next.js will statically generate the page /.

The fallback key (required)

The object returned by getStaticPaths must contain a boolean fallback key.
fallback: false

If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page. You can do this if you have a small number of paths to pre-render - so they are all statically generated during build time. It’s also useful when the new pages are not added often. If you add more items to the data source and need to render the new pages, you’d need to run the build again.

Here’s an example which pre-renders one blog post per page called pages/posts/[id].js. The list of blog posts will be fetched from a CMS and returned by getStaticPaths . Then, for each page, it fetches the post data from a CMS using getStaticProps. This example is also in the Pages documentation.