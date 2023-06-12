export default function updateLocationParams(
  params: URLSearchParams = new URLSearchParams(),
) {
  const url = new URL(window.location.href);

  url.search = params.toString();

  window.history.pushState({ path: url.toString() }, '', url.toString());
}
