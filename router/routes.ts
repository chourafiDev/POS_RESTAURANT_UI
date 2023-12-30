export const getRoutes = (lang: string) => {
  const protectedRoutes = [
    `/${lang}/dashboard`,
    `/${lang}/tables`,
    `/${lang}/orders`,
    `/${lang}/users`,
    `/${lang}/products`,
    `/${lang}/categories`,
    `/${lang}/manage-tables`,
    `/${lang}/all-history`,
    `/${lang}/my-history`,
    `/${lang}/menu`,
    `/${lang}/profile`,
  ];

  const authRoutes = [
    `/${lang}/login`,
    `/${lang}/forgot-password`,
    `/${lang}/reset-password`,
  ];

  const adminRoutes = [
    `/${lang}/dashboard`,
    `/${lang}/users`,
    `/${lang}/categories`,
    `/${lang}/products`,
    `/${lang}/manage-tables`,
    `/${lang}/all-history`,
  ];

  return { protectedRoutes, adminRoutes, authRoutes };
};
