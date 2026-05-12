export default async function handler(req, res) {
  const { code } = req.query;

  console.log('[auth] OAUTH_CLIENT_ID set:', !!process.env.OAUTH_CLIENT_ID);
  console.log('[auth] OAUTH_CLIENT_SECRET set:', !!process.env.OAUTH_CLIENT_SECRET);

  if (!code) {
    const callbackUrl = `${process.env.BASE_URL || 'https://somepaintingsipainted.com'}/api/auth`;
    console.log('[auth] redirect_uri:', callbackUrl);
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
      console.log('[auth] GitHub token error:', data.error, data.error_description || '');
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
            // window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
