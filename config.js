(function () {
  const { hostname, } = window.location;

  let APP_PATH = '';

  if (hostname.endsWith(".github.io"))
    APP_PATH = 'https://raw.githubusercontent.com/HollyPony/dd5/main/'

  window.APP_PATH = APP_PATH;
})();



// (function () {
//   const { protocol, hostname, origin, pathname } = window.location;

//   let APP_PATH;

//   // Cas fichier local (file://)
//   if (protocol === "file:") {
//     APP_PATH = "";

//   // Cas dev local (serveur local)
//   } else if (hostname === "localhost" || hostname === "127.0.0.1") {
//     APP_PATH = origin + pathname.replace(/\/[^/]*$/, "/");

//   // Cas GitHub Pages
//   } else if (hostname.endsWith(".github.io")) {
//     APP_PATH = "https://raw.githubusercontent.com/HollyPony/dd5/main/";

//   // Cas inconnu
//   } else {
//     throw new Error("Contexte d'exécution inconnu");
//   }

//   window.APP_PATH = APP_PATH;
// })();
