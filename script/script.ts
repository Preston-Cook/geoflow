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

  const res = await fetch('https://api.ipify.org/?format=json');
  const data = await res.json();
  const { ip } = data as { ip: string };

  for (let i = 0; i < 3; i++) {
    const res = await fetch('http://localhost:3000/api/geoflow', {
      method: 'POST',
      body: JSON.stringify({ ip }),
    });

    if (res.ok) {
      return;
    }
  }
})();
