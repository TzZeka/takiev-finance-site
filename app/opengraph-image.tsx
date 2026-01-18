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
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo - Simple Bricks */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #147d6c, #19BFB7)',
                  borderRadius: '6px',
                }}
              />
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #19BFB7, #1effff)',
                  borderRadius: '6px',
                }}
              />
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #1effff, #19BFB7)',
                  borderRadius: '6px',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', paddingLeft: '58px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #19BFB7, #147d6c)',
                  borderRadius: '6px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#19BFB7',
            marginBottom: '8px',
            letterSpacing: '-2px',
          }}
        >
          Takiev Finance
        </div>

        <div
          style={{
            fontSize: '32px',
            color: '#ffffff',
            marginBottom: '40px',
            opacity: 0.9,
          }}
        >
          Счетоводна Кантора
        </div>

        {/* Motto */}
        <div
          style={{
            padding: '20px 40px',
            background: 'rgba(25, 191, 183, 0.15)',
            borderRadius: '12px',
            border: '2px solid rgba(25, 191, 183, 0.4)',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '26px',
              color: '#19BFB7',
              fontStyle: 'italic',
            }}
          >
            Избери своя доверен бизнес партньор
          </div>
        </div>

        {/* Services */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#19BFB7' }} />
            <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.8)' }}>Счетоводство</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#19BFB7' }} />
            <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.8)' }}>Данъчни консултации</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#19BFB7' }} />
            <span style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.8)' }}>Регистрация на фирми</span>
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          takiev.bg
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
