import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./GlobalLayout"

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            view_services
            and_more
            contact_error,
            got_your_message
            send_another
            get_in_touch
            contact_name
            contact_email
            contact_message
            contact_submit
            contact_clear
            contact_field_required
            contact_field_email
          }
        }
      }
    }
  }
`

const useTranslations = () => {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LocaleContext)
  // Query the JSON files in <rootDir>/i18n/translations
  const { rawData } = useStaticQuery(query)

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(item => ({
      name: item.node.name,
      translations: item.node.translations,
    }))

  // Only return translations for the current locale
  const { translations } = simplified.filter(lang => lang.name === locale)[0]

  return translations
}

export default useTranslations

