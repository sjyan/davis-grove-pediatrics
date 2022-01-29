import React from 'react';
import { Link } from 'gatsby';
import { LocaleContext } from './GlobalLayout';
import locales from '@i18n/config';
import { removeTrailingSlash } from '@util/gatsby-node-helpers';

const getFinalLocalizedPath = (
  to,
  { default: isLocaleDefault = false, path: localePath }
) => {
  /**
   * Splice in locale to first part of path. If locale is the default app locale
   * then we just use the path. Else splice in the locale.
   */
  return removeTrailingSlash(isLocaleDefault ? to : `/${localePath}${to}`);
};

// Use the globally available context to choose the right path
const LocalizedLink = ({ locale, to, ...props }) => {
  // TODO: Explicitly defined locale prop => locale from context => infer from client
  const { locale: localeFromContext } = React.useContext(LocaleContext);

  // Default to locale from context if one is not specified as prop
  locale ||= localeFromContext;

  return <Link {...props} to={getFinalLocalizedPath(to, locales[locale])} />;
};

export default LocalizedLink;
