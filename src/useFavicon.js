import { useEffect } from "react";

const useFavicon = (theme) => {
  useEffect(() => {
    const lightFavicon = "/favicon-light.ico";
    const darkFavicon = "/favicon-dark.ico";

    const favicon = theme === "dark" ? darkFavicon : lightFavicon;

    // Update the favicon
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = "/todo-list-react" + favicon;

    document.getElementsByTagName("head")[0].appendChild(link);

    // Update the theme attribute
    document.documentElement.setAttribute("data-theme", theme);

    // Clean up function to remove the previous favicon link
    return () => {
      const existingLink = document.querySelector("link[rel*='icon']");
      if (existingLink) {
        existingLink.parentNode.removeChild(existingLink);
      }
    };
  }, [theme]);
};

export default useFavicon;
