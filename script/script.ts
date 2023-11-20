(async function () {
  const { hostname } = window.location;
  const [subDomain, domain] = hostname.split(/\.(.*)/s);

  // if (domain !== 'azurewebsites.net') {
  //   return;
  // }

  const visitedTimestamp = localStorage.getItem('visitedTimestamp');

  if (
    visitedTimestamp &&
    Math.abs(Date.now() - Date.parse(visitedTimestamp)) / 36e5 < 1
  ) {
    return;
  }

  localStorage.setItem('visitedTimestamp', new Date().toUTCString());

  for (let i = 0; i < 3; i++) {
    const res = await fetch('http://localhost:3000/script.js');
    const data = await res.text();

    console.log(data);

    if (res.ok) {
      return;
    }
  }
})();
