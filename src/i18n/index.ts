import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const faTranslations = {
  "Username": "نام کاربری",
  "Password": "رمز عبور",
  "Sign In": "ورود",
  "Sign Up": "ثبت نام",
  "Sign Out": "خروج",

  "Name": "نام",
  "Last Name": "نام خانوادگی",
  "Confirm Password": "تکرار رمز عبور",

  "Name is required": "نام الزامی است",
  "Last name is required": "نام خانوادگی الزامی است",
  "Username is required": "نام کاربری الزامی است",
  "Password is required": "رمز عبور الزامی است",
  "Confirm password is required": "تکرار رمز عبور الزامی است",
  "Username must be at least 4 characters": "نام کاربری حداقل ۴ کاراکتر باشد",
  "Password must be at least 6 characters": "رمز عبور حداقل ۶ کاراکتر باشد",
  "Passwords do not match": "رمز عبور یکسان نیست",

  "Login successful!": "ورود موفقیت‌آمیز بود!",
  "Login failed": "ورود ناموفق بود",
  "Registration successful!": "ثبت‌نام با موفقیت انجام شد!",
  "Registration failed": "ثبت‌نام ناموفق بود",

  "Dashboard": "داشبورد",
  "Welcome": "خوش آمدید",
  "Hello": "سلام",
  "Goodbye": "خداحافظ",

  "Attributes": "ویژگی‌ها",
  "Products": "محصولات",

  "Internet connection lost": "اتصال اینترنت قطع شده است",
  "Connection restored": "اتصال برقرار شد",

  "Loading": "در حال بارگذاری...",
  "Error": "خطا",
  "Success": "موفقیت",
  "Cancel": "لغو",
  "Save": "ذخیره",
  "Edit": "ویرایش",
  "Delete": "حذف",
  "Confirm": "تأیید",
  "Back": "بازگشت",
  "Next": "بعدی",
  "Previous": "قبلی",
  "Close": "بستن",
  "Open": "باز کردن",
  "Search": "جستجو",
  "Filter": "فیلتر",
  "Sort": "مرتب‌سازی",
  "Refresh": "تازه‌سازی",
  "Settings": "تنظیمات",
  "Profile": "پروفایل",
  "Account": "حساب کاربری",
  "Logout": "خروج از سیستم",
  "Login": "ورود به سیستم",
  "Register": "ثبت نام",
  "Email": "ایمیل",
  "Phone": "تلفن",
  "Address": "آدرس",
  "Date": "تاریخ",
  "Time": "زمان",
  "Status": "وضعیت",
  "Active": "فعال",
  "Inactive": "غیرفعال",
  "Online": "آنلاین",
  "Offline": "آفلاین"
};

const enTranslations = {
  "Username": "Username",
  "Password": "Password",
  "Sign In": "Sign In",
  "Sign Up": "Sign Up",

  "Name": "Name",
  "Last Name": "Last Name",
  "Confirm Password": "Confirm Password",

  "Name is required": "Name is required",
  "Last name is required": "Last name is required",
  "Username is required": "Username is required",
  "Password is required": "Password is required",
  "Confirm password is required": "Confirm password is required",
  "Username must be at least 4 characters": "Username must be at least 4 characters",
  "Password must be at least 6 characters": "Password must be at least 6 characters",
  "Passwords do not match": "Passwords do not match",
  "Login failed": "Login failed",
  "Registration successful!": "Registration successful!",
  "Registration failed": "Registration failed",
  "Dashboard": "Dashboard",
  "Welcome": "Welcome",
  "Hello": "Hello",
  "Attributes": "Attributes",
  "Attribute": "Attribute",
  "Products": "Products",
  "Internet connection lost": "Internet connection lost",
  "Loading": "Loading...",
  "Error": "Error",
  "Success": "Success",
  "Cancel": "Cancel",
  "Save": "Save",
  "Saving": "Saving",
  "Logout": "Logout",
  "Values": "Values",
  "Token not found": "Token not found",
  "Error receiving": "Error receiving information:",
  "Attribute created successfully!": "Attribute created successfully!",
  "Property name is required": "Property name is required",
  "Value is required": "Value is required",
  "An unknown error occurred": "An unknown error occurred",
  "Value": "Value",
  "Property name must be at least 2 characters": "Property name must be at least 2 characters",
  "Value cannot be empty": "Value cannot be empty",
  "At least one value is required": "At least one value is required",
  "At least one non-empty value is required": "At least one non-empty value is required",
  "Duplicate values are not allowed": "Duplicate values are not allowed",
  "Login successful!": "Login successful!",
};

const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: faTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
