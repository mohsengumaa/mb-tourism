# حل بديل: نشر Next.js بدون Node.js App في DreamHost

## المشكلة
Node.js App غير موجود في لوحة تحكم DreamHost.

## ✅ الحلول البديلة

### الحل 1: استخدام SSH و PM2 (موصى به) ⭐

هذا هو الحل الأفضل والأكثر استقراراً.

#### الخطوة 1: الاتصال بالخادم

```bash
ssh username@yourdomain.com
```

#### الخطوة 2: الانتقال إلى مجلد المشروع

```bash
cd ~/mbtourism.net
```

#### الخطوة 3: تثبيت المكتبات

```bash
npm install --production
```

#### الخطوة 4: تثبيت PM2 (مدير العمليات)

```bash
npm install -g pm2
```

#### الخطوة 5: إنشاء ملف server.js

أنشئ ملف `server.js` في الجذر:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

#### الخطوة 6: تشغيل التطبيق بـ PM2

```bash
pm2 start server.js --name "mb-tourism"
pm2 save
pm2 startup
```

#### الخطوة 7: إعداد .htaccess للـ Proxy

عدّل ملف `.htaccess`:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Proxy to Node.js
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

### الحل 2: استخدام Passenger (إذا كان متوفراً)

إذا كان DreamHost يدعم Passenger:

#### الخطوة 1: إنشاء ملف package.json

تأكد من أن `package.json` يحتوي على:

```json
{
  "scripts": {
    "start": "next start -p $PORT"
  }
}
```

#### الخطوة 2: إنشاء ملف public/.htaccess

```apache
PassengerEnabled On
PassengerAppRoot /home/username/mbtourism.net
PassengerBaseURI /
PassengerNodejs /usr/bin/node
PassengerAppType node
PassengerStartupFile server.js
```

---

### الحل 3: استخدام Static Export (أبسط لكن محدود)

إذا لم تنجح الطرق السابقة، يمكنك تصدير الموقع كـ static files:

#### الخطوة 1: تعديل next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... باقي الإعدادات
}
```

#### الخطوة 2: البناء

```bash
npm run build
```

#### الخطوة 3: رفع مجلد out/

ارفع مجلد `out/` إلى `public_html/` في DreamHost.

**ملاحظة:** هذا الحل لن يعمل مع الداشبورد و API routes.

---

### الحل 4: استخدام VPS أو استضافة أخرى

إذا لم تنجح الحلول السابقة، قد تحتاج إلى:
- استضافة تدعم Node.js بشكل كامل
- VPS مع Node.js
- Vercel أو Netlify (للـ frontend فقط)

---

## 🔧 إعدادات إضافية

### إنشاء ملف .env

```bash
nano .env
```

أضف:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.mbtourism.net
PORT=3000
```

### إعدادات PM2

```bash
# عرض الحالة
pm2 status

# عرض السجلات
pm2 logs mb-tourism

# إعادة التشغيل
pm2 restart mb-tourism

# إيقاف
pm2 stop mb-tourism
```

---

## ✅ التحقق

بعد الإعداد:

1. تحقق من أن PM2 يعمل:
   ```bash
   pm2 status
   ```

2. تحقق من الموقع:
   - `https://www.mbtourism.net`

3. تحقق من السجلات:
   ```bash
   pm2 logs mb-tourism
   ```

---

## 🆘 حل المشاكل

### المشكلة: PM2 غير موجود

```bash
npm install -g pm2
```

### المشكلة: Port 3000 مستخدم

غيّر البورت في `server.js`:
```javascript
const port = process.env.PORT || 3001
```

وعدّل `.htaccess`:
```apache
RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]
```

### المشكلة: Proxy لا يعمل

تأكد من تفعيل `mod_proxy` و `mod_rewrite` في Apache.

---

## 📞 ملاحظات

- استخدم الحل 1 (PM2) لأنه الأكثر استقراراً
- تأكد من أن Node.js مثبت على الخادم
- راقب السجلات باستمرار

