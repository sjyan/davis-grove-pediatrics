import React, { useMemo } from 'react';
import { LocaleContext } from '@components/GlobalLayout';

export default (data) => {
  const { locale: currentLocaleCode } = React.useContext(LocaleContext);

  return useMemo(
    () =>
      data.edges.filter(({ node: { locale } }) => locale === currentLocaleCode),
    [data, currentLocaleCode]
  );
};
