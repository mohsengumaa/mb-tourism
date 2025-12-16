# حل مشكلة رفع مجلد public الكبير

## المشكلة
مجلد `public/` كبير جداً (يحتوي على صور الفنادق) ولا يمكن رفعه عبر File Manager في DreamHost.

## ✅ الحلول

### الحل 1: استخدام FTP/SFTP (موصى به) ⭐

هذا هو الحل الأفضل للملفات الكبيرة.

#### أ) تثبيت برنامج FTP:

**لـ Windows:**
- **FileZilla** (مجاني): https://filezilla-project.org/
- **WinSCP** (مجاني): https://winscp.net/

**لـ Mac:**
- **FileZilla**: https://filezilla-project.org/
- **Cyberduck** (مجاني): https://cyberduck.io/

#### ب) إعدادات الاتصال:

1. افتح FileZilla أو WinSCP
2. أدخل بيانات الاتصال:
   - **Host**: `ftp.yourdomain.com` أو `yourdomain.com`
   - **Username**: اسم المستخدم من DreamHost
   - **Password**: كلمة المرور من DreamHost
   - **Port**: 21 (FTP) أو 22 (SFTP - أكثر أماناً)
   - **Protocol**: FTP أو SFTP

#### ج) رفع الملفات:

1. اتصل بالخادم
2. اذهب إلى مجلد النطاق (مثل `/home/dh_8bqxym/mbtourism.net`)
3. اسحب مجلد `public/` من جهازك إلى الخادم
4. انتظر حتى ينتهي الرفع (قد يستغرق وقتاً طويلاً)

---

### الحل 2: ضغط ورفع ثم فك الضغط

#### على جهازك المحلي:

1. **ضغط المجلد:**
   ```bash
   # Windows (PowerShell)
   Compress-Archive -Path public -DestinationPath public.zip
   
   # أو استخدم WinRAR أو 7-Zip لضغط المجلد
   ```

2. **رفع الملف المضغوط:**
   - ارفع `public.zip` عبر File Manager (سيكون أصغر)

3. **على الخادم (عبر SSH):**
   ```bash
   ssh username@yourdomain.com
   cd ~/mbtourism.net
   
   # فك الضغط
   unzip public.zip
   
   # حذف الملف المضغوط
   rm public.zip
   ```

---

### الحل 3: رفع على دفعات

1. **ارفع المجلدات الفرعية واحداً تلو الآخر:**
   - `public/hotels/` (الأكبر)
   - `public/uploads/`
   - باقي الملفات في `public/`

2. **استخدم File Manager لرفع كل مجلد فرعي على حدة**

---

### الحل 4: استخدام SSH (للمستخدمين المتقدمين)

#### على جهازك المحلي:

```bash
# Windows (استخدم Git Bash أو WSL)
# أو استخدم WinSCP في وضع SCP

# رفع المجلد عبر SCP
scp -r public/ username@yourdomain.com:~/mbtourism.net/
```

---

## 🎯 الحل الموصى به

**استخدم FileZilla أو WinSCP** لأنها:
- ✅ تدعم الملفات الكبيرة
- ✅ يمكن استئناف الرفع إذا انقطع الاتصال
- ✅ أسرع من File Manager
- ✅ سهلة الاستخدام

---

## 📋 خطوات مفصلة لـ FileZilla

### 1. تثبيت FileZilla
- حمّل من: https://filezilla-project.org/
- ثبت البرنامج

### 2. الاتصال بالخادم
1. افتح FileZilla
2. في الأعلى، أدخل:
   - **Host**: `ftp.yourdomain.com`
   - **Username**: اسم المستخدم
   - **Password**: كلمة المرور
   - **Port**: 21
3. اضغط **Quickconnect**

### 3. رفع المجلد
1. في الجانب الأيسر (جهازك): اذهب إلى مجلد المشروع
2. في الجانب الأيمن (الخادم): اذهب إلى `/home/dh_8bqxym/mbtourism.net`
3. اسحب مجلد `public/` من اليسار إلى اليمين
4. انتظر حتى ينتهي الرفع

### 4. التحقق
- تأكد من أن جميع الملفات رُفعت
- تحقق من الصلاحيات (يجب أن تكون 755)

---

## ⚠️ ملاحظات مهمة

1. **الوقت**: رفع مجلد `public/` قد يستغرق ساعات حسب حجمه
2. **الاتصال**: تأكد من اتصال مستقر بالإنترنت
3. **الصلاحيات**: بعد الرفع، تأكد من أن الصلاحيات صحيحة (755)
4. **النسخ الاحتياطي**: احتفظ بنسخة من `public/` على جهازك

---

## 🔧 إعدادات FileZilla المحسنة

لرفع أسرع:

1. **Settings** > **Transfers**:
   - **Maximum simultaneous transfers**: 10
   - **Limit for concurrent transfers**: 2

2. **Settings** > **Connection**:
   - **Timeout**: 60 seconds
   - **Keep alive**: 30 seconds

---

## ✅ بعد الرفع

1. تحقق من أن جميع الملفات موجودة
2. تحقق من الصلاحيات:
   ```bash
   chmod -R 755 public/
   ```
3. اختبر الموقع للتأكد من أن الصور تظهر

---

**نصيحة:** استخدم FileZilla أو WinSCP - إنه الحل الأسهل والأسرع! 🚀

