import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Takiev Finance - Счетоводна Кантора'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #40514E 0%, #2D3B39 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo Symbol */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 90 90"
            fill="none"
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#147d6c" />
                <stop offset="100%" stopColor="#1effff" />
              </linearGradient>
            </defs>
            {/* Bricks pattern */}
            <rect x="5" y="5" width="25" height="25" rx="2" fill="url(#grad)" opacity="0.9" />
            <rect x="33" y="5" width="25" height="25" rx="2" fill="url(#grad)" opacity="0.9" />
            <rect x="61" y="5" width="25" height="25" rx="2" fill="url(#grad)" opacity="0.9" />
            <rect x="33" y="33" width="25" height="25" rx="2" fill="url(#grad)" opacity="0.9" />
          </svg>
        </div>

        {/* Company Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #19BFB7, #1effff)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            Takiev Finance
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: '#ffffff',
              margin: 0,
              opacity: 0.9,
            }}
          >
            Счетоводна Кантора
          </p>
        </div>

        {/* Motto */}
        <div
          style={{
            marginTop: '50px',
            padding: '24px 48px',
            background: 'rgba(25, 191, 183, 0.15)',
            borderRadius: '16px',
            border: '1px solid rgba(25, 191, 183, 0.3)',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: '#19BFB7',
              margin: 0,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Избери своя доверен бизнес партньор
          </p>
        </div>

        {/* Services */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            marginTop: '40px',
          }}
        >
          {['Счетоводство', 'Данъчни консултации', 'Регистрация на фирми'].map((service) => (
            <div
              key={service}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#19BFB7',
                }}
              />
              <span
                style={{
                  fontSize: '18px',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* Website URL */}
        <p
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
          }}
        >
          takiev.bg
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
