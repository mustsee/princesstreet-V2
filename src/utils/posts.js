import en from "~/../public/locales/en/translation.json";
import es from "~/../public/locales/es/translation.json";
import fr from "~/../public/locales/fr/translation.json";
import { SITE } from "~/config.mjs";

const contents = {
  en,
  fr,
  es,
};

const getNormalizedPosts = async (posts) => {
  return posts
    .map((post) => {
      return {
        id: post.slug,
        src: post.image ? `${SITE.origin}/assets/blog/${post.image}` : "",
        publishDate: post.publishDate,
        draft: post.draft === "true" ? true : false,
        slug: post.slug,
        title: post.title,
        description: post.description,
        body: post.body,
        tags: post.tags
          ? post.tags.map((item) => item.tag).filter((item) => !!item)
          : [],
      };
    })
    .filter((post) => post.title && post.slug);
};

const load = async function (lang) {
  const frontAidPosts = contents[lang].blog;
  const normalizedPosts = await getNormalizedPosts(frontAidPosts);
  const results = normalizedPosts
    .sort(
      (a, b) =>
        new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
    )
    .filter((post) => !post.draft);

  return results;
};

// let _posts;

/** */
export const fetchPosts = async (lang) => {
  //_posts = _posts || load(lang);
  const _posts = load(lang);

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
