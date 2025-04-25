window.addEventListener("message", ({ data: { subdomain, id, name, description, stats, invite, features } }) => {
  puter.fs.readdir("./").then(async (items) => {
    parent.postMessage({
      err: null,
      success: null,
      finished: false
    }, "*");

    try {
      await new Promise(async (resolve, reject) => {
        if (!items.find((item) => item.name === "localbotify")) await puter.fs.mkdir("localbotify");
        if (!(await puter.fs.readdir("localbotify")).find((item) => item.name === "landing-pages")) await puter.fs.mkdir("localbotify/landing-pages");
        if (!(await puter.fs.readdir("localbotify/landing-pages")).find((item) => item.name === id.toString())) await puter.fs.mkdir(`localbotify/landing-pages/${id.toString()}`);

        resolve();
      });

      await puter.fs.write(`localbotify/landing-pages/${id.toString()}/index.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escape(name)}</title>
    <link rel="stylesheet" href="/style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  </head>
  <body>
    <div id="root">
      <div class="min-h-screen bg-[#1a1b1e]">
        <header class="relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"
          ></div>
          <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-bot w-16 h-16 mx-auto mb-6 text-purple-500"
            >
              <path d="M12 8V4H8"></path>
              <rect width="16" height="12" x="4" y="8" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
            <h1 class="text-5xl font-bold text-white mb-6">${escape(name)}</h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">${(description) ? escape(description) : `Powered by <a href="https://localbotify.app" target="_blank">LocalBotify.app</a>`}</p>
            <a
              href="${escape(invite)}"
              class="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
            >Add to Discord<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-right ml-2 w-5 h-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            </a>
          </div>
        </header>
        <section class="py-16 bg-[#2a2b2e]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-users w-8 h-8 mx-auto mb-4 text-purple-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h3 class="text-3xl font-bold text-white mb-2">${escape(((users) => {
                  if (users >= 1_000_000_000) return (users / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B+";
                  if (users >= 1_000_000) return (users / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
                  if (users >= 1_000) return (users / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
                  return users.toString();
                })(stats[0]))}</h3>
                <p class="text-gray-400">Active Users</p>
              </div>
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-message-square w-8 h-8 mx-auto mb-4 text-purple-500"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  ></path>
                </svg>
                <h3 class="text-3xl font-bold text-white mb-2">${escape(((messages) => {
                  if (messages >= 1_000_000_000) return (messages / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B+";
                  if (messages >= 1_000_000) return (messages / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
                  if (messages >= 1_000) return (messages / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
                  return messages.toString();
                })(stats[1]))}</h3>
                <p class="text-gray-400">Messages Processed</p>
              </div>
              <div class="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-shield w-8 h-8 mx-auto mb-4 text-purple-500"
                >
                  <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                  ></path>
                </svg>
                <h3 class="text-3xl font-bold text-white mb-2">${escape(((servers) => {
                  if (servers >= 1_000_000_000) return (servers / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B+";
                  if (servers >= 1_000_000) return (servers / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
                  if (servers >= 1_000) return (servers / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
                  return servers.toString();
                })(stats[2]))}</h3>
                <p class="text-gray-400">Servers Served</p>
              </div>
            </div>
          </div>
        </section>
        <section class="py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-white text-center mb-16">
              Powerful Features
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${features.map(([featureIcon, featureName, featureDescription]) => `
                <div
                  class="bg-[#2a2b2e] rounded-lg p-6 hover:bg-[#3a3b3e] transition-colors"
                >
                  <div class="text-purple-500 mb-4">
                    <i class="fas fa-${escape(featureIcon)}" style="font-size: 1.5rem;"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-white mb-2">${escape(featureName)}</h3>
                  <p class="text-gray-400">${escape(featureDescription)}</p>
                </div>
              `).join("\n")}
              <div
                class="bg-[#2a2b2e] rounded-lg p-6 hover:bg-[#3a3b3e] transition-colors"
              >
                <div class="text-purple-500 mb-4">
                  <i class="fas fa-robot" style="font-size: 1.5rem;"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Powered by <a href="https://localbotify.app" target="_blank">LocalBotify.app</a></h3>
                <p class="text-gray-400">Built using LocalBotify for speed, flexibility, and total control — no code needed.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-6">
              Ready to enhance your Discord server?
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of servers already using ${escape(name)} to create
              engaging communities.
            </p>
            <div class="flex justify-center gap-4">
              <a
                href="${escape(invite)}"
                class="px-6 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-gray-100 transition-colors"
              >Add to Discord</a>
              <a
                href="https://localbotify.app"
                class="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >Explore LocalBotify</a>
            </div>
          </div>
        </section>
        <footer class="py-8 bg-[#1a1b1e]">
          <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400"
          >
            <p>© ${escape(new Date().getFullYear().toString())} ${escape(name)}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  </body>
</html>`);
      await puter.fs.write(`localbotify/landing-pages/${id.toString()}/style.css`, await (await fetch("style.css")).text());
      await puter.fs.write(`localbotify/landing-pages/${id.toString()}/favicon.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: rgb(168 85 247);">
        <path d="M12 8V4H8"></path>
        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>`);

      if (!(await puter.hosting.list()).find((site) => site.subdomain === subdomain)) {
        await puter.hosting.create(subdomain, `localbotify/landing-pages/${id.toString()}`);
      };

      parent.postMessage({
        err: null,
        success: true,
        finished: true
      }, "*");
    } catch (err) {
      parent.postMessage({
        err: err.toString(),
        success: false,
        finished: true
      }, "*");
    };
  });
});

function escape(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/"/g, "&#039;");
};