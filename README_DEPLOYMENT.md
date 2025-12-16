# دليل النشر السريع - MB Tourism

## 📦 الملفات الجاهزة للنشر

تم إعداد جميع الملفات التالية:

### ملفات SEO
- ✅ `public/robots.txt` - ملف robots.txt
- ✅ `app/sitemap.ts` - Sitemap تلقائي
- ✅ `app/robots.ts` - Robots configuration
- ✅ `.htaccess` - إعدادات Apache للاستضافة

### ملفات الإعداد
- ✅ `.env.example` - مثال لملف البيئة
- ✅ `.gitignore` - ملفات Git المهملة
- ✅ `next.config.js` - إعدادات Next.js محسنة

### ملفات التوثيق
- ✅ `DEPLOYMENT.md` - دليل النشر الكامل
- ✅ `SEO_CHECKLIST.md` - قائمة فحص SEO

## 🚀 خطوات النشر السريعة

### 1. تحديث الروابط

**قبل البناء، قم بتحديث الروابط في:**

1. **app/sitemap.ts** (السطر 6):
   ```typescript
   const baseUrl = 'https://www.mbtourism.com' // استبدل بالرابط الفعلي
   ```

2. **app/robots.ts** (السطر 11):
   ```typescript
   sitemap: 'https://www.mbtourism.com/sitemap.xml'
   ```

3. **app/layout.tsx** (السطر 20):
   ```typescript
   metadataBase: new URL('https://www.mbtourism.com')
   ```

4. **public/robots.txt** (السطر 5):
   ```
   Sitemap: https://www.mbtourism.com/sitemap.xml
   ```

### 2. بناء المشروع

```bash
npm install
npm run build
```

### 3. رفع الملفات

ارفع الملفات التالية على DreamHost:

**ملفات أساسية:**
- جميع ملفات `.ts`, `.tsx`, `.js`, `.json` من المجلد الرئيسي
- مجلد `app/`
- مجلد `components/`
- مجلد `contexts/`
- مجلد `lib/`
- مجلد `public/`
- مجلد `data/`
- مجلد `.next/` (بعد البناء)
- ملف `package.json`
- ملف `package-lock.json`
- ملف `next.config.js`
- ملف `tsconfig.json`
- ملف `tailwind.config.js`
- ملف `postcss.config.js`
- ملف `.htaccess`

**لا ترفع:**
- مجلد `node_modules/` (سيتم تثبيته على الخادم)
- ملف `.env` (أنشئه على الخادم)
- ملف `.git/` (إن وجد)

### 4. إعدادات DreamHost

1. **Node.js App:**
   - Node.js version: 18.x أو أحدث
   - App directory: المسار إلى مجلد المشروع
   - Startup file: `server.js` (سيتم إنشاؤه تلقائياً)

2. **Environment Variables:**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://www.mbtourism.com
   ```

3. **SSL:**
   - فعّل Let's Encrypt SSL من لوحة التحكم

### 5. الصلاحيات

تأكد من صلاحيات الملفات:
```bash
chmod 755 للمجلدات
chmod 644 للملفات
chmod 777 لمجلد data/ (للكتابة)
chmod 777 لمجلد public/uploads/ (للرفع)
```

## ✅ التحقق بعد النشر

- [ ] الصفحة الرئيسية تعمل
- [ ] صفحات الفنادق تعمل
- [ ] الداشبورد يعمل (`/admin/login`)
- [ ] الصور تظهر
- [ ] HTTPS مفعل
- [ ] `robots.txt` يعمل: `https://www.mbtourism.com/robots.txt`
- [ ] `sitemap.xml` يعمل: `https://www.mbtourism.com/sitemap.xml`

## 🔍 SEO

بعد النشر:
1. أضف الموقع إلى Google Search Console
2. أرسل `sitemap.xml`
3. أضف كود التحقق في `app/layout.tsx` (في verification)

## 📞 الدعم

راجع `DEPLOYMENT.md` للتفاصيل الكاملة.

