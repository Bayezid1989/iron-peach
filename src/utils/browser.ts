export const isServer = typeof window === "undefined";

export const detectMedia = () => {
  // reference link MDN: https://developer.mozilla.org/ja/docs/Web/HTTP/Browser_detection_using_the_user_agent

  const mediaObj = {
    // opera: false,
    chrome: false,
    firefox: false,
    safari: false,
    // ie: false,
  };

  if (isServer) return mediaObj;

  //   if (
  //     (navigator.userAgent.indexOf("Opera") ||
  //       navigator.userAgent.indexOf("OPR")) !== -1
  //   ) {
  //     mediaObj.opera = true;
  //   }
  try {
    if (navigator?.userAgent.indexOf("Chrome") !== -1) {
      mediaObj.chrome = true;
    }
    if (navigator?.userAgent.indexOf("Safari") !== -1) {
      mediaObj.safari = true;
    }
    if (navigator?.userAgent.indexOf("Firefox") !== -1) {
      mediaObj.firefox = true;
    }
  } catch (error) {
    console.log("error at detectMedia", error);
  }

  // if (
  //   navigator?.userAgent.indexOf("MSIE") !== -1 ||
  //   !!document.documentMode == true
  // ) {
  //   //IF IE > 10
  //   mediaObj.ie = true;
  // }

  return mediaObj;
};
