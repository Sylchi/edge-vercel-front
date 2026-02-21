interface EmailLayoutProps {
  children: React.ReactNode
  preheader?: string
}

export default function EmailLayout({ children, preheader }: EmailLayoutProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000000', fontFamily: 'Arial, sans-serif' }}>
        {preheader && (
          <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden' }}>
            {preheader}
          </div>
        )}
        <table cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ backgroundColor: '#000000' }}>
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>
              <table cellPadding="0" cellSpacing="0" border={0} width="600" style={{ maxWidth: '600px' }}>
                {/* Header */}
                <tr>
                  <td style={{ paddingBottom: '32px' }}>
                    <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                      <tr>
                        <td>
                          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '-0.5px' }}>
                            Edgerun
                          </h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td style={{ backgroundColor: '#1a1a1a', borderRadius: '8px', padding: '32px' }}>
                    {children}
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ paddingTop: '32px' }}>
                    <table cellPadding="0" cellSpacing="0" border={0} width="100%">
                      <tr>
                        <td style={{ fontSize: '12px', color: '#666666', lineHeight: '18px' }}>
                          <p style={{ margin: '0 0 8px 0' }}>
                            © 2024 Edgerun. All rights reserved.
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            Deterministic WASM compute with Solana settlement
                          </p>
                          <p style={{ margin: 0 }}>
                            <a href="#" style={{ color: '#a78bfa', textDecoration: 'none' }}>Unsubscribe</a>
                            {' · '}
                            <a href="#" style={{ color: '#a78bfa', textDecoration: 'none' }}>Notification Settings</a>
                            {' · '}
                            <a href="#" style={{ color: '#a78bfa', textDecoration: 'none' }}>Privacy Policy</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
