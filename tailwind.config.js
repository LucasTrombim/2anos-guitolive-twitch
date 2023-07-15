module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        permanentMarker: ['Permanent Marker'],
        short: ['Short Stack'],
        tommy: ['MADE Tommy Soft'],
      },
      backgroundImage: {
        moita: 'url(/images/procura/bg-moita.png)',
        corrida: 'url(/images/corrida/bg-corrida.svg)',
        velha: 'url(/images/velha/bg-velha.svg)',
        termo: 'url(/images/termo/bg-termo.svg)',
        porao: 'url(/images/porao/bg-porao.svg)',
      },
      colors: {
        white: '#fff',
        primary: '#0D4B66',
        secondary: '#3CAFE4',
        dark: '#111111',
        grey: '#3D3F47',
      },
      fontSize: {
        nano: '10px',
        '3xs': '12px',
        '2xs': '14px',
        base: '18px',
        sm: '20px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
        display1: '96px',
        display2: '112px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
