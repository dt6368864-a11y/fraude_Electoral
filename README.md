# conteo de votos( fraude)
---

## ⚙️ Instalación

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

### 2. Instalar dependencias

npm install


### 3. Configurar variables de entorno

Copia el archivo de ejemplo y llénalo con tus credenciales de Supabase:


cp .env.example .env

Edita `.env`:


SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key_aqui


### 4. Iniciar la aplicación

npx expo start

Escanea el código QR con la app **Expo Go** en tu celular.

Para correr los tests:

npm test

---

## 🔐 Seguridad

- Las credenciales de Supabase **nunca se suben al repositorio**
- El archivo `.env` está incluido en `.gitignore`
- Usa el archivo `.env.example` como plantilla para configurar tu entorno local

---

## 🧠 Algoritmo de auditoría

El núcleo de la app está en `src/utils/e14Auditor.js`. La lógica es simple pero efectiva:

```
total_votos = candidato_a + candidato_b + votos_blancos + votos_nulos
si total_votos > capacidad_mesa → mesa FRAUDULENTA
```

---