# دليل نشر الموقع على DreamHost

## متطلبات الاستضافة

- Node.js 18.x أو أحدث
- npm أو yarn
- مساحة تخزين كافية للصور والملفات
- دعم SSL/HTTPS

## خطوات النشر

### 1. إعداد البيئة

```bash
# نسخ ملف البيئة
cp .env.example .env

# تعديل ملف .env وإضافة:
NEXT_PUBLIC_SITE_URL=https://www.mbtourism.com
NODE_ENV=production
```

### 2. تحديث الروابط في الملفات

قبل البناء، قم بتحديث الروابط التالية في الملفات:

1. **app/sitemap.ts** - السطر 6:
   ```typescript
   const baseUrl = 'https://www.mbtourism.com' // استبدل بالرابط الفعلي
   ```

2. **app/robots.ts** - السطر 11:
   ```typescript
   sitemap: 'https://www.mbtourism.com/sitemap.xml'
   ```

3. **app/layout.tsx** - السطر 20:
   ```typescript
   metadataBase: new URL('https://www.mbtourism.com')
   ```

4. **public/robots.txt** - السطر 5:
   ```
   Sitemap: https://www.mbtourism.com/sitemap.xml
   ```

### 3. بناء المشروع

```bash
# تثبيت المكتبات
npm install

# بناء المشروع للإنتاج
npm run build
```

### 4. رفع الملفات على DreamHost

#### الطريقة الأولى: استخدام Node.js App (موصى به)

1. سجل الدخول إلى لوحة تحكم DreamHost
2. اذهب إلى **Panel** > **Domains** > **Manage Domains**
3. اختر النطاق الخاص بك
4. في قسم **Web Hosting**، اختر **Add Hosting to a Domain / Subdomain**
5. اختر **Node.js App**
6. ارفع الملفات التالية:
   - جميع الملفات من المجلد الرئيسي (باستثناء `node_modules` و `.next`)
   - مجلد `.next` بعد البناء
   - مجلد `public`
   - مجلد `data`
   - ملف `package.json`
   - ملف `package-lock.json`

7. في إعدادات Node.js App:
   - **Startup File**: `server.js` (سيتم إنشاؤه تلقائياً)
   - **App Directory**: المسار إلى مجلد المشروع
   - **Environment Variables**: أضف المتغيرات من `.env`

#### الطريقة الثانية: استخدام SSH

```bash
# الاتصال بالخادم
ssh username@yourdomain.com

# الانتقال إلى مجلد المشروع
cd ~/yourdomain.com

# رفع الملفات (من جهازك المحلي)
scp -r . username@yourdomain.com:~/yourdomain.com/

# على الخادم
npm install --production
npm run build
pm2 start npm --name "mb-tourism" -- start
```

### 5. إعداد قاعدة البيانات (اختياري)

إذا كنت تستخدم قاعدة بيانات، قم بإعدادها من لوحة تحكم DreamHost.

### 6. إعداد SSL

1. اذهب إلى **Panel** > **Domains** > **SSL/TLS Certificates**
2. قم بتفعيل Let's Encrypt SSL
3. تأكد من تفعيل HTTPS في `.htaccess`

### 7. إعدادات إضافية

#### تحديث ملف .htaccess

تأكد من تحديث ملف `.htaccess` مع المسارات الصحيحة.

#### إعدادات Node.js

في لوحة تحكم DreamHost، تأكد من:
- Node.js version: 18.x أو أحدث
- App directory: المسار الصحيح
- Startup file: `server.js`

### 8. اختبار الموقع

بعد النشر، اختبر:
- [ ] الصفحة الرئيسية تعمل
- [ ] صفحات الفنادق تعمل
- [ ] الداشبورد يعمل (`/admin/login`)
- [ ] الصور تظهر بشكل صحيح
- [ ] الروابط تعمل
- [ ] HTTPS مفعل

### 9. إعداد Google Search Console

1. اذهب إلى [Google Search Console](https://search.google.com/search-console)
2. أضف الموقع
3. استخدم ملف `robots.txt` للتحقق
4. أرسل `sitemap.xml`

### 10. مراقبة الأداء

- راقب الأخطاء في لوحة تحكم DreamHost
- استخدم Google Analytics (إذا كان مفعلاً)
- راقب سرعة الموقع باستخدام Google PageSpeed Insights

## استكشاف الأخطاء

### المشكلة: الموقع لا يعمل

1. تحقق من سجلات الأخطاء في لوحة تحكم DreamHost
2. تأكد من أن Node.js يعمل
3. تحقق من ملف `.env`

### المشكلة: الصور لا تظهر

1. تأكد من رفع مجلد `public` بالكامل
2. تحقق من صلاحيات الملفات (755 للمجلدات، 644 للملفات)
3. تأكد من أن المسارات صحيحة

### المشكلة: الداشبورد لا يعمل

1. تأكد من رفع مجلد `data` مع جميع ملفات JSON
2. تحقق من صلاحيات الكتابة على مجلد `data`
3. تأكد من رفع مجلد `public/uploads`

## الأمان

- تأكد من تغيير كلمة مرور الداشبورد الافتراضية
- استخدم HTTPS دائماً
- راجع ملف `.htaccess` للأمان
- احتفظ بنسخة احتياطية من البيانات

## النسخ الاحتياطي

قم بعمل نسخة احتياطية من:
- مجلد `data` (جميع ملفات JSON)
- مجلد `public/uploads`
- ملف `.env`

## التحديثات المستقبلية

عند التحديث:
1. قم بعمل نسخة احتياطية
2. ارفع الملفات الجديدة
3. قم بتشغيل `npm install` و `npm run build`
4. أعد تشغيل التطبيق

## الدعم

للمساعدة، راجع:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [DreamHost Knowledge Base](https://help.dreamhost.com/)

