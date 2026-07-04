/**
 * Drop this into your GitHub Pages site and call showTunnelLink()
 * once the DOM is ready. It fetches the raw gist file the plugin
 * updates and fills in an element with id="tunnel-link".
 *
 * <a id="tunnel-link" href="#">Loading...</a>
 * <script src="tunnel-link.js"></script>
 * <script>showTunnelLink();</script>
 */

// Replace with your gist ID and filename (must match config.yml).
const GIST_ID = "your-gist-id-here";
const GIST_FILENAME = "bluemap-link.json";

async function showTunnelLink() {
  const el = document.getElementById("tunnel-link");
  if (!el) return;

  try {
    // Hit the GitHub API (not raw.githubusercontent.com) so we always get
    // the latest revision without worrying about CDN caching delays.
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const gist = await res.json();
    const file = gist.files[GIST_FILENAME];
    if (!file) throw new Error(`File ${GIST_FILENAME} not found in gist`);

    const data = JSON.parse(file.content);
    el.href = data.url;
    el.textContent = data.url;
    el.title = `Last updated: ${data.updated}`;
  } catch (err) {
    el.textContent = "Server link unavailable";
    console.error("Failed to load tunnel link:", err);
  }
}
