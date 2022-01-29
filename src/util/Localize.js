import React, { useMemo } from 'react';
import { LocaleContext } from "@components/GlobalLayout";

export default (data) => {
  const { locale: currentLocale } = React.useContext(LocaleContext);

  return useMemo(() => (
    data.edges.filter(({ node: { locale }}) => locale === currentLocale)
  ), [data, currentLocale]);
}