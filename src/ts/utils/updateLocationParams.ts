export default function updateLocationParams(
  params: URLSearchParams = new URLSearchParams(),
) {
  const url = new URL(window.location.href);

  url.search = params.toString();
  const urlString = url.toString();

  window.history.replaceState(urlString, '', urlString);
}
