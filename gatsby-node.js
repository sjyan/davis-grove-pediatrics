const path = require('path');

const locales = require(`./i18n/config`);

const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
  extractLangFromName,
  stripExtension,
} = require(`./src/util/gatsby-node-helpers`);

const { createFilePath } = require(`gatsby-source-filesystem`);

// Generate slug field for all markdown files
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    /**
     * https://nodejs.org/api/path.html#path_path_basename_path_extUse path.basename
     */
    const name = path.basename(node.fileAbsolutePath, `.md`);

    // Check if post.name is "index" -- because that's the file for default language
    const isDefault = name === `index`;

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, (o) => o.default === true);

    const slug = createFilePath({
      node,
      getNode,
      basePath: `content`,
      trailingSlash: false,
    });

    // Files are defined in the format "name-with-dashes.lang.mdx". Infer the lang from the filename.
    const lang = extractLangFromName(isDefault, defaultKey, name);

    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
    createNodeField({ node, name: `slug`, value: stripExtension(slug) });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  /**
   * First delete the incoming page that was automatically created by Gatsby, so
   * everything in /src/pages
   */
  deletePage(page);

  // Grab the keys ('en' & 'de') of locales and map over them
  Object.keys(locales).map((lang) => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`;

    return createPage({
      // Pass on everything from the original page
      ...page,
      /**
       * page.path returns with a trailing slash (e.g. "/de/"). Trailing slash
       * results in undesirable outcomes.
       */
      path: removeTrailingSlash(localizedPath),
      /**
       * Pass in the locale as context to every page. This context also gets
       * passed to the src/components/layout file. This should ensure that the
       * locale is available on every page
       */
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      },
    });
  });
};

// Create pages from markdown files
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      services: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "content/services/.*/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date(formatString: "DD MMMM YYYY")
            }
            fields {
              isDefault
              locale
              slug
            }
          }
        }
      }
      team: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "content/team/.*/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              promoted
              image
              date(formatString: "DD MMMM YYYY")
            }
            fields {
              isDefault
              locale
              slug
            }
          }
        }
      }
      basic: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "content/basic/.*/" } }
      ) {
        edges {
          node {
            id
            excerpt
            html
            frontmatter {
              title
              path
              template
            }
            fields {
              isDefault
              locale
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    return;
  }

  result.data.services.edges.forEach(({ node }) => {
    const component = path.resolve('src/templates/service.js');
    const slug = node.frontmatter.path
      ? node.frontmatter.path
      : node.fields.slug;
    const { title } = node.frontmatter;
    const { locale, isDefault } = node.fields;

    createPage({
      path: localizedSlug({
        isDefault: isDefault || locales[locale].default,
        locale,
        slug,
      }),
      component,
      context: {
        id: node.id,
        locale,
        title,
      },
    });
  });

  result.data.team.edges.forEach(({ node }) => {
    const component = path.resolve('src/templates/team.js');
    const slug = node.frontmatter.path
      ? node.frontmatter.path
      : node.fields.slug;
    const { title } = node.frontmatter;
    const { locale, isDefault } = node.fields;

    createPage({
      path: localizedSlug({
        isDefault: isDefault || locales[locale].default,
        locale,
        slug,
      }),
      component,
      context: {
        id: node.id,
        locale,
        title,
      },
    });
  });

  result.data.basic.edges.forEach(({ node }) => {
    let component = path.resolve('src/templates/basic.js');
    if (node.frontmatter.template) {
      component = path.resolve(`src/templates/${node.frontmatter.template}.js`);
    }

    const slug = node.frontmatter.path
      ? node.frontmatter.path
      : node.fields.slug;
    const { title } = node.frontmatter;
    const { locale, isDefault } = node.fields;

    createPage({
      path: localizedSlug({
        isDefault: isDefault || locales[locale].default,
        locale,
        slug,
      }),
      component,
      context: {
        id: node.id,
        locale,
        title,
      },
    });
  });
};
