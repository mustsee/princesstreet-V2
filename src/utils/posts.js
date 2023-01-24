import content from "~/../public/locales/en/translation.json";

const getNormalizedPosts = async (posts) => {
  return posts.map((post) => {
    return {
      id: post.slug,
      src: `/src/assets/images/blog/${post.slug}.jpeg`,
      publishDate: "Jan 21 2023",
      draft: post.draft === "true" ? true : false,
      slug: post.slug,
      title: post.title,
      description: post.description,
      body: post.body, // Change key name to body ?
      tags: post.tags, // Add in content model
    };
  });
};

const load = async function () {
  const frontAidPosts = content.blog;
  const normalizedPosts = await getNormalizedPosts(frontAidPosts);
  const results = normalizedPosts
    .sort(
      (a, b) =>
        new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
    )
    .filter((post) => !post.draft);

  return results;
};

let _posts;

/** */
export const fetchPosts = async () => {
  _posts = _posts || load();

  return await _posts;
};

/** */
export const findPostsByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r, id) {
    posts.some(function (post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }) => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(_count * -1) : [];
};
