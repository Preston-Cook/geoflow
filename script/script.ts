(async function () {
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

  await fetch('http://geoflow.vercel.app/api/geoflow', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ip }),
  });
})();
