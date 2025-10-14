import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Nếu không có locale trong URL thì fallback sang 'en'
  const locale = requestLocale || 'en';

  try {
    return {
      locale,
      messages: (await import(`./src/messages/${locale}.json`)).default
    };
  } catch (error) {
    // fallback nếu không tìm thấy file messages
    return {
      locale: 'vi',
      messages: (await import(`./src/messages/vi.json`)).default
    };
  }
});
