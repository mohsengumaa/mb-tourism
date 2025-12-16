# حل مشاكل الصلاحيات (OneDrive)

إذا واجهت خطأ `EPERM` أو مشاكل في الصلاحيات:

## الحلول السريعة:

### 1. إغلاق جميع عمليات Node.js:
- افتح Task Manager (Ctrl + Shift + Esc)
- ابحث عن عمليات "Node.js"
- أوقف جميع العمليات

### 2. حذف مجلد `.next` يدوياً:
- افتح File Explorer
- اذهب إلى مجلد المشروع
- احذف مجلد `.next` (إذا كان موجوداً)
- أو استخدم الأمر في PowerShell كمسؤول:
  ```powershell
  Remove-Item -Recurse -Force .next
  ```

### 3. استبعاد OneDrive من المزامنة:
- افتح إعدادات OneDrive
- اذهب إلى "Sync and backup" → "Advanced settings"
- استبعد مجلد المشروع من المزامنة

### 4. تشغيل PowerShell كمسؤول:
- انقر بزر الماوس الأيمن على PowerShell
- اختر "Run as Administrator"
- ثم شغل المشروع

### 5. نقل المشروع خارج OneDrive:
- انقل المشروع إلى مكان آخر (مثل `C:\Projects\`)
- هذا الحل الأفضل لتجنب مشاكل OneDrive مع ملفات البناء

## بعد تطبيق الحل:

```bash
npm run dev
```

الموقع سيعمل على: http://localhost:3000







