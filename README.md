# Cyber Audit E-14

## Estructura del proyecto
```
FAUDE/
├── assets/
│   ├── icon.png             ← Ícono de la app (1024x1024)
│   ├── splash.png           ← Pantalla de carga
│   ├── adaptive-icon.png    ← Ícono Android adaptativo
│   └── favicon.png          ← Favicon web
├── src/
│   ├── config/
│   │   └── supabaseClient.js  ← Conexión a Supabase
│   ├── components/
│   │   ├── TerminalHeader.js
│   │   └── PollingTableCard.js
│   └── utils/
│       └── e14Auditor.js      ← Lógica de auditoría
├── test/
│   └── src/
│       └── utils/
│           └── e14auditor.test.js
├── app.js
├── app.json
├── babel.config.js          ← NUEVO: necesario para Jest
├── package.json
└── README.md
```

## Setup
```bash
npm install
npm install --save-dev @babel/preset-env babel-jest babel-preset-expo
npx expo install --fix
```

## Comandos
```bash
npx expo start   # Iniciar app
npm test         # Correr tests
```

## Importante
Reemplaza en supabaseClient.js y en el test:
- YOUR_SUPABASE_URL
- YOUR_SUPABASE_ANON_KEY
