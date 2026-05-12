export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    const callbackUrl = `${process.env.BASE_URL || 'https://somepaintingsipainted.com'}/api/auth`;
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      redirect_uri: callbackUrl,
      scope: 'repo'
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(401).json({ error: data.error });
    }

    const tokenData = JSON.stringify(data);

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                'authorization:github:success:${tokenData}',
                window.location.origin
              );
            }
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
