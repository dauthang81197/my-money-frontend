import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = requestLocale || 'en';

  try {
    return {
      locale,
      messages: (await import(`./src/messages/${locale}.json`)).default
    };
  } catch {
    return {
      locale: 'vi',
      messages: (await import(`./src/messages/vi.json`)).default
    };
  }
});
