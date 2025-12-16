# قائمة الملفات للرفع على DreamHost

## 📦 الملفات والمجلدات المطلوبة

### ✅ المجلدات (ارفعها كاملة):

1. **app/** - جميع ملفات التطبيق
2. **components/** - المكونات
3. **contexts/** - Contexts
4. **lib/** - المكتبات والأدوات
5. **public/** - الملفات العامة (الصور، CSS، JS)
6. **data/** - ملفات JSON للبيانات
7. **.next/** - مجلد البناء (بعد تشغيل `npm run build`)

### ✅ الملفات في الجذر (ارفعها):

1. **package.json**
2. **package-lock.json**
3. **next.config.js**
4. **tsconfig.json**
5. **tailwind.config.js**
6. **postcss.config.js**
7. **.htaccess**
8. **.env** (أنشئه على الخادم من `.env.example`)

### ❌ لا ترفع:

- **node_modules/** - سيتم تثبيته على الخادم
- **.git/** - مجلد Git
- **.next/** (قبل البناء) - ارفعه فقط بعد البناء
- **.env.local**
- ***.log** - ملفات السجلات
- **.DS_Store** - ملفات النظام

---

## 🚀 خطوات الرفع

### الطريقة 1: استخدام File Manager في DreamHost

1. سجل الدخول إلى لوحة تحكم DreamHost
2. اذهب إلى **Panel** > **Files** > **File Manager**
3. افتح مجلد النطاق الخاص بك (مثل `yourdomain.com`)
4. ارفع الملفات والمجلدات المذكورة أعلاه

### الطريقة 2: استخدام FTP/SFTP

استخدم برنامج مثل FileZilla أو WinSCP:

**إعدادات الاتصال:**
- Host: `yourdomain.com` أو `ftp.yourdomain.com`
- Username: اسم المستخدم من DreamHost
- Password: كلمة المرور
- Port: 21 (FTP) أو 22 (SFTP)

---

## 📋 ترتيب الرفع (موصى به)

### المرحلة 1: رفع الملفات الأساسية
```
✅ package.json
✅ package-lock.json
✅ next.config.js
✅ tsconfig.json
✅ tailwind.config.js
✅ postcss.config.js
✅ .htaccess
```

### المرحلة 2: رفع المجلدات
```
✅ app/
✅ components/
✅ contexts/
✅ lib/
✅ public/
✅ data/
```

### المرحلة 3: البناء والرفع
```bash
# على جهازك المحلي
npm run build
```

ثم ارفع:
```
✅ .next/ (المجلد الكامل بعد البناء)
```

### المرحلة 4: إعداد البيئة
أنشئ ملف `.env` على الخادم:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.mbtourism.com
```

---

## ⚙️ إعدادات DreamHost Node.js App

بعد رفع الملفات:

1. اذهب إلى **Panel** > **Domains** > **Manage Domains**
2. اختر النطاق الخاص بك
3. في قسم **Web Hosting**، اختر **Node.js App**
4. إعدادات:
   - **Node.js version**: 18.x أو أحدث
   - **App directory**: المسار إلى مجلد المشروع (مثل `/home/username/yourdomain.com`)
   - **Startup file**: `server.js` (سيتم إنشاؤه تلقائياً)
   - **Environment Variables**: أضف المتغيرات من `.env`

---

## 🔧 أوامر SSH (اختياري)

إذا كان لديك وصول SSH:

```bash
# الاتصال بالخادم
ssh username@yourdomain.com

# الانتقال إلى مجلد المشروع
cd ~/yourdomain.com

# تثبيت المكتبات
npm install --production

# بناء المشروع (إذا لم تقم بذلك محلياً)
npm run build

# إعادة تشغيل التطبيق
pm2 restart mb-tourism
# أو
npm start
```

---

## ✅ التحقق بعد الرفع

1. **الصلاحيات:**
   ```bash
   chmod 755 للمجلدات
   chmod 644 للملفات
   chmod 777 لمجلد data/ (للكتابة)
   chmod 777 لمجلد public/uploads/ (للرفع)
   ```

2. **الاختبار:**
   - [ ] الصفحة الرئيسية: `https://www.mbtourism.com`
   - [ ] صفحات الفنادق: `https://www.mbtourism.com/hotels`
   - [ ] صفحة فندق: `https://www.mbtourism.com/hotels/1`
   - [ ] الداشبورد: `https://www.mbtourism.com/admin/login`
   - [ ] robots.txt: `https://www.mbtourism.com/robots.txt`
   - [ ] sitemap.xml: `https://www.mbtourism.com/sitemap.xml`

---

## 📝 ملاحظات مهمة

1. **حجم الملفات:**
   - مجلد `public/hotels/` قد يكون كبيراً (الصور)
   - استخدم FTP/SFTP للرفع بدلاً من File Manager للسرعة

2. **الوقت:**
   - رفع الملفات قد يستغرق وقتاً طويلاً
   - كن صبوراً خاصة مع الصور

3. **النسخ الاحتياطي:**
   - احتفظ بنسخة احتياطية من مجلد `data/`
   - احتفظ بنسخة احتياطية من مجلد `public/uploads/`

4. **التحديثات المستقبلية:**
   - عند التحديث، ارفع الملفات الجديدة فقط
   - لا حاجة لإعادة رفع `node_modules/` و `.next/` إذا لم تتغير

---

## 🆘 استكشاف الأخطاء

### المشكلة: الموقع لا يعمل
- تحقق من أن Node.js App مفعل
- تحقق من سجلات الأخطاء في لوحة التحكم
- تأكد من أن جميع الملفات مرفوعة

### المشكلة: الصور لا تظهر
- تحقق من رفع مجلد `public/` بالكامل
- تحقق من الصلاحيات (755 للمجلدات)

### المشكلة: الداشبورد لا يعمل
- تحقق من رفع مجلد `data/`
- تحقق من صلاحيات الكتابة على `data/`

---

## 📞 الدعم

للمزيد من التفاصيل، راجع:
- `DEPLOYMENT.md` - دليل النشر الكامل
- `README_DEPLOYMENT.md` - دليل النشر السريع

