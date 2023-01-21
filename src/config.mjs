export const SITE = {
  name: "Princes Street Hostel",

  // For github pages
  origin: "https://mustsee.github.io",
  basePathname: "/princesstreet-V2/",
  //origin: "https://princesstreethostel.com",
  //basePathname: "/",
  //trailingSlash: false, // false when it will be without basePathname (cf. sitemap)

  title: "Princes Street Hostel",
  description:
    "🏨 Princes Street is a clean, safe and well located Hostel at the heart of Edinburgh. We are next to the Waverley train station, in a breeze from the Old Town. Come experience Edinburgh with us!",

  googleAnalyticsId: "G-5LSB28K2VF", // or "G-XXXXXXXXXX",
  googleSiteVerificationId: false, // or "orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M",
};

export const BLOG = {
  disabled: false,
  postsPerPage: 4,

  blog: {
    disabled: false,
    pathname: "blog", // blog main path, you can change this to "articles" (/articles)
  },

  post: {
    disabled: false,
    pathname: "", // empty for /some-post, value for /pathname/some-post
  },

  category: {
    disabled: false,
    pathname: "category", // set empty to change from /category/some-category to /some-category
  },

  tag: {
    disabled: false,
    pathname: "tag", // set empty to change from /tag/some-tag to /some-tag
  },
};
