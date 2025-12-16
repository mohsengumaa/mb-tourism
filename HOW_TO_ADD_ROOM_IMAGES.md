# دليل إضافة صور الغرف

## كيفية إضافة صور للغرف في الموقع

### الخطوة 1: نسخ الصور إلى مجلد public

1. أنشئ مجلد للفندق في `public/hotels/` (مثلاً: `public/hotels/address-istanbul/`)
2. أنشئ مجلد لكل غرفة بنفس الاسم الموجود في بيانات الفندق
3. انسخ الصور من مجلدات الغرف إلى المجلدات المناسبة

**مثال:**
```
public/
  hotels/
    address-istanbul/
      غرفة ديلوكس بسرير حجم ملكي بإطلالة على المدينة/
        Screenshot 2025-07-07 123125.png
        Screenshot 2025-07-07 123132.png
        Screenshot 2025-07-07 123139.png
```

### الخطوة 2: تحديث بيانات الغرف في `data/hotels.ts`

أضف حقل `images` لكل غرفة مع روابط الصور:

```typescript
{
  id: 9,
  name: 'غرفة ديلوكس بسرير حجم ملكي بإطلالة على المدينة',
  nameEn: 'Deluxe Room with King Bed and City View',
  // ... باقي البيانات
  images: [
    '/hotels/address-istanbul/غرفة ديلوكس بسرير حجم ملكي بإطلالة على المدينة/Screenshot 2025-07-07 123125.png',
    '/hotels/address-istanbul/غرفة ديلوكس بسرير حجم ملكي بإطلالة على المدينة/Screenshot 2025-07-07 123132.png',
    '/hotels/address-istanbul/غرفة ديلوكس بسرير حجم ملكي بإطلالة على المدينة/Screenshot 2025-07-07 123139.png',
  ],
}
```

### ملاحظات مهمة:

1. **مسار الصور**: يجب أن يبدأ بـ `/` (مسار نسبي من مجلد `public`)
2. **أسماء الملفات**: يمكن استخدام أسماء الملفات الأصلية أو إعادة تسميتها
3. **الصيغ المدعومة**: PNG, JPG, JPEG, WebP
4. **حجم الصور**: يُنصح بضغط الصور لتسريع تحميل الموقع

### مثال كامل:

```typescript
{
  id: 10,
  name: 'غرفة ديلوكس مزدوجة بإطلالة على المدينة',
  nameEn: 'Deluxe Twin Room with City View',
  description: 'غرفة فاخرة مع سريرين وإطلالة على المدينة',
  descriptionEn: 'Luxury room with twin beds and city view',
  price: 1100,
  bookingPrice: 1400,
  maxGuests: 2,
  features: ['سريران', 'إطلالة على المدينة', 'حمام فاخر', 'تلفزيون ذكي', 'ميني بار'],
  featuresEn: ['Twin Beds', 'City View', 'Luxury Bathroom', 'Smart TV', 'Minibar'],
  images: [
    '/hotels/address-istanbul/غرفة ديلوكس مزدوجة بإطلالة على المدينة/image1.png',
    '/hotels/address-istanbul/غرفة ديلوكس مزدوجة بإطلالة على المدينة/image2.png',
  ],
}
```

### عرض الصور:

- الصورة الأولى ستظهر في بطاقة الغرفة
- إذا كان هناك أكثر من صورة، سيظهر عداد الصور في الزاوية
- عند النقر على بطاقة الغرفة، يمكن إضافة معرض صور في صفحة التفاصيل






