const load = async function () {
  let images = [];
  try {
    images = import.meta.glob("~/assets/images/**");
  } catch (e) {
    // continue regardless of error
  }
  return images;
};

let _images;

/** */
export const fetchLocalImages = async () => {
  _images = _images || load();
  return await _images;
};

/** */
export const findImage = async (imagePath) => {
  if (typeof imagePath !== "string") {
    return null;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (!imagePath.startsWith("~/assets")) {
    return null;
  } // For now only consume images using ~/assets alias (or absolute)

  // Absolute path and images in public folder
  // Is needed to make it work with github pages
  if (process.env.NODE_ENV !== "development") {
    console.log("d", imagePath.replace("~/", "/../src/"));
    return { src: imagePath.replace("~/", "/../src/") };
  } else {
    const images = await fetchLocalImages();
    const key = imagePath.replace("~/", "/src/");

    return typeof images[key] === "function"
      ? (await images[key]())["default"]
      : null;
  }
};
