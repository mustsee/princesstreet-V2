import en from "~/../public/locales/en/translation.json";
import fr from "~/../public/locales/fr/translation.json";
import es from "~/../public/locales/es/translation.json";

const contents = {
  en,
  fr,
  es,
};

const images = import.meta.glob("/src/assets/images/blog/*");

let loadedImages = [];
for (const path in images) {
  images[path]().then((image) => {
    loadedImages.push(image);
    console.log("asdf", path, image);
  });
}

console.log("qweqwe", loadedImages[0]);

/* const image = post.image
        ? await import(`/src/assets/images/blog/${post.image}`)
        : "";

      console.log("image", image); */

//src: post.image ? `/src/assets/images/blog/${post.image}` : "",
/* src: */
// ~/assets/images/hero-hq/**.jpg

const getNormalizedPosts = async (posts) => {
  return posts
    .map((post) => {
      return {
        id: post.slug,
        src: post.image
          ? `${import.meta.env.BASE_URL}/assets/blog/${post.image}`
          : "",
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
