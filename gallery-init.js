document.addEventListener("DOMContentLoaded", () => {
  const getQueryParams = (query) => {
    return query
      .substring(1)
      .split("&")
      .reduce((acc, param) => {
        const [key, value] = param.split("=");
        acc[decodeURIComponent(key)] = decodeURIComponent(value);
        return acc;
      }, {});
  };

  const initializeGallery = (queryParams) => {
    const uniqueId = queryParams.id;
    const images = queryParams.images ? queryParams.images.split(",") : [];
    const layout = queryParams.layout || "flex";
    const flexSettings = {
      flexDirection: queryParams.flexDirection || "row",
      flexWrap: queryParams.flexWrap || "wrap",
      justifyContent: queryParams.justifyContent || "flex-start",
      alignItems: queryParams.alignItems || "stretch",
      gap: queryParams.gap || "10px",
      alignContent: "center", // Always center content
    };

    const galleryContainer = document.querySelector(`.${uniqueId}`);
    if (galleryContainer) {
      galleryContainer.innerHTML = `
          <div class="gallery ${layout}" style="
            display: ${layout === "flex" ? "flex" : "grid"};
            ${
              layout === "flex"
                ? `flex-direction: ${flexSettings.flexDirection}; flex-wrap: ${flexSettings.flexWrap};`
                : ""
            }
            gap: ${flexSettings.gap};
            justify-content: ${flexSettings.justifyContent};
            align-items: ${flexSettings.alignItems};
            height: 100vh;
            align-content: center;
          ">
            ${images
              .map((image, index) =>
                image
                  ? `<div class="thumbnail" style="
                        position: relative;
                        cursor: pointer;
                        overflow: hidden;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        transition: transform 0.2s;
                        flex: 0 1 200px;
                        height: 200px;
                      "><img src="${image}" alt="Gallery item ${
                      index + 1
                    }" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                        transition: transform 0.3s ease;
                      "/></div>`
                  : ""
              )
              .join("")}
          </div>
        `;

      document.querySelectorAll(".thumbnail").forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
          const lightbox = document.createElement("div");
          lightbox.className = "lightbox";
          lightbox.innerHTML = `
              <span class="close">&times;</span>
              <img src="${
                thumbnail.querySelector("img").src
              }" class="lightbox-image" alt="Gallery item ${index + 1}" />
              <span class="prev">&#10094;</span>
              <span class="next">&#10095;</span>
            `;
          document.body.appendChild(lightbox);

          document.querySelector(".close").addEventListener("click", () => {
            document.body.removeChild(lightbox);
          });

          document.querySelector(".prev").addEventListener("click", (e) => {
            e.stopPropagation();
            const prevIndex = (index - 1 + images.length) % images.length;
            document.querySelector(".lightbox-image").src =
              document.querySelectorAll(".thumbnail img")[prevIndex].src;
            index = prevIndex;
          });

          document.querySelector(".next").addEventListener("click", (e) => {
            e.stopPropagation();
            const nextIndex = (index + 1) % images.length;
            document.querySelector(".lightbox-image").src =
              document.querySelectorAll(".thumbnail img")[nextIndex].src;
            index = nextIndex;
          });
        });
      });
    }
  };

  const queryParams = getQueryParams(window.location.search);
  if (queryParams.id) {
    initializeGallery(queryParams);
  }
});
