import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import color from 'color';
import { format } from 'date-fns';
import locale from 'date-fns/locale/it';
import { graphql, Link, PageProps } from 'gatsby';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Layout } from '../components/Layout';
import { Picture } from '../components/Picture';
import { PostMeta, Vote } from '../components/Post';
import FeaturedMedia from '../components/Post/FeaturedMedia';
import { Post } from '../entities';

SwiperCore.use([Navigation, Pagination]);

type PostPageProps = PageProps & {
  data: {
    markdownRemark: Post & {
      timeToRead: number;
      tableOfContents: string;
    };
    previous?: Post;
    next?: Post;
  };
};

const authorPictureSize = {
  width: 240,
  height: 240,
};

export default function PostPage({ data }: PostPageProps): JSX.Element {
  const { next, previous } = data;
  const post = data.markdownRemark;
  const postMeta = post.frontmatter;

  const disclaimers = postMeta.categories
    ? postMeta.categories
        .filter(({ fields }) => Boolean(fields?.disclaimer_html))
        .map(({ fields }) => fields?.disclaimer_html as string)
    : [];

  if (post.fields?.disclaimer_html) {
    disclaimers.unshift(post.fields.disclaimer_html);
  }

  return (
    <Layout title={postMeta.title} description={postMeta.excerpt} image={postMeta.featured_image}>
      <div
        itemProp="blogPost"
        itemScope
        itemType="https://schema.org/BlogPosting"
        css={(theme) => ({ section: { marginBottom: theme.spacing(8), marginTop: theme.spacing(8) } })}
      >
        <section css={{ marginTop: 0 }}>
          <h1 itemProp="name headline">{postMeta.title}</h1>
          <PostMeta post={data.markdownRemark} />
        </section>
        <FeaturedMedia post={data.markdownRemark} />
        <section
          itemProp="timeRequired"
          {...{ content: `PT${post.timeToRead}M` }}
          css={(theme) => ({
            ...theme.typography.caption,
            textAlign: 'center',
          })}
        >
          Tempo di lettura: circa {post.timeToRead > 1 ? `${post.timeToRead} minuti` : `1 minuto`}
        </section>
        {post.fields?.opening_html && (
          <section dangerouslySetInnerHTML={{ __html: post.fields.opening_html }} itemProp="backstory" />
        )}
        {post.tableOfContents && <section dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />}
        {postMeta.attributes && (
          <table css={(theme) => ({ fontFamily: theme.typography.body.fontFamily })}>
            <tbody>
              {postMeta.attributes.map(({ key, value }) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td dangerouslySetInnerHTML={{ __html: value }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {post.html && (
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
            css={(theme) => ({
              '.message': {
                background: color(theme.palette.info.light).fade(0.9).toString(),
                border: `1px solid ${theme.palette.info.main}`,
                borderRadius: theme.spacing(1),
                marginBlockStart: theme.typography.body.marginBlockStart,
                marginBlockEnd: theme.typography.body.marginBlockEnd,
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),

                '&.pro-tip': {
                  position: 'relative',
                  paddingTop: theme.spacing(6),

                  '&:after': {
                    ...theme.typography.caption,
                    borderTopLeftRadius: theme.spacing(1),
                    borderBottomRightRadius: theme.spacing(1),
                    background: theme.palette.info.main,
                    color: theme.palette.info.contrastText,
                    content: '"PRO TIP"',
                    paddingTop: theme.spacing(1),
                    paddingBottom: theme.spacing(1),
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2),
                    position: 'absolute',
                    top: -1,
                    left: -1,
                  },
                },

                '&.success': {
                  background: color(theme.palette.success.light).fade(0.9).toString(),
                  borderColor: theme.palette.success.main,
                },

                '&.warning': {
                  background: color(theme.palette.warning.light).fade(0.9).toString(),
                  borderColor: theme.palette.warning.main,
                },

                '&.error': {
                  background: color(theme.palette.error.light).fade(0.9).toString(),
                  borderColor: theme.palette.error.main,
                },
              },
            })}
          />
        )}
        {disclaimers && (
          <section css={(theme) => ({ p: { fontSize: theme.typography.caption.fontSize } })}>
            {disclaimers.map((disclaimer, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: disclaimer }}></div>
            ))}
          </section>
        )}
        {postMeta.modified && (
          <p
            css={(theme) => ({ fontStyle: 'italic', fontSize: theme.typography.caption.fontSize, textAlign: 'center' })}
          >
            Ultimo aggiornamento: &nbsp;
            <time dateTime={postMeta.modified} itemProp="dateModified" {...{ content: postMeta.modified }}>
              {format(new Date(postMeta.modified), 'dd MMMM yyyy', { locale })}
            </time>
          </p>
        )}
        <Vote campaign={postMeta.path}>Ti è piaciuto questo articolo?</Vote>
        {postMeta.tags && (
          <section>
            <h4>Tags</h4>
            <ul
              itemProp="keywords"
              css={(theme) => ({
                padding: 0,
                margin: theme.spacing(-1 / 2),
                display: 'flex',
                flexWrap: 'wrap',

                li: {
                  listStyle: 'none',
                  margin: theme.spacing(1 / 2),

                  a: {
                    ...theme.typography.caption,
                    color: theme.palette.secondary.contrastText,
                    background: theme.palette.secondary.main,
                    display: 'block',
                    borderRadius: theme.spacing(4),
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2),
                    paddingTop: theme.spacing(1 / 2),
                    paddingBottom: theme.spacing(1),
                    textDecoration: 'none',

                    '&:hover': {
                      background: theme.palette.primary.main,
                    },
                  },
                },
              })}
            >
              {postMeta.tags.map(({ frontmatter: { title, path } }) => (
                <li key={path}>
                  <Link to={`/tag/${path}`} rel="tag" title={`Guarda tutti i post con il tag ${title}`}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {postMeta.author && (
          <section
            itemScope
            itemType="http://schema.org/Person"
            css={(theme) => ({
              display: 'flex',

              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                textAlign: 'center',

                p: {
                  textAlign: 'left',
                },
              },
            })}
          >
            {postMeta.author.frontmatter.avatar && (
              <div
                css={(theme) => ({
                  ...authorPictureSize,

                  [theme.breakpoints.up('sm')]: {
                    flex: `0 0 ${authorPictureSize.width}px`,
                    marginRight: theme.spacing(2),
                    marginTop: theme.spacing(1),
                  },

                  [theme.breakpoints.down('sm')]: {
                    margin: `0 auto ${theme.spacing(2)}px`,
                  },
                })}
              >
                <Picture
                  src={postMeta.author.frontmatter.avatar}
                  alt={`Avatar ${postMeta.author.frontmatter.title}`}
                  {...authorPictureSize}
                />
              </div>
            )}
            <div>
              <h2 itemProp="name" css={{ marginTop: 0 }}>
                {postMeta.author.frontmatter.title}
              </h2>
              {postMeta.author.html && (
                <div dangerouslySetInnerHTML={{ __html: postMeta.author.html }} itemProp="description" />
              )}
              <Link to={`/autore/${postMeta.author.frontmatter.path}`}>
                Tutti i post di {postMeta.author.frontmatter.title}
                <FontAwesomeIcon icon={faChevronRight} css={(theme) => ({ marginLeft: theme.spacing(1) })} />
              </Link>
            </div>
          </section>
        )}
        <section
          css={(theme) => ({
            display: 'flex',

            '.next, .prev': {
              [theme.breakpoints.down('sm')]: {
                width: '49%',
              },
              [theme.breakpoints.up('sm')]: {
                width: '40%',
              },
            },

            a: {
              textDecorationLine: 'none',
            },
            label: {
              display: 'flex',
              alignItems: 'center',
              textDecorationColor: theme.palette.primary.light,
              textDecorationLine: 'underline',
            },

            span: {
              ...theme.typography.caption,
            },
          })}
        >
          {previous && (
            <div className="prev">
              <Link to={previous.frontmatter.path}>
                <label>
                  <FontAwesomeIcon icon={faChevronLeft} css={(theme) => ({ marginRight: theme.spacing(1) })} />
                  Articolo precedente
                </label>
                <span>{previous.frontmatter.title}</span>
              </Link>
            </div>
          )}
          <span css={{ flexGrow: 1 }}></span>
          {next && (
            <div className="next" css={{ textAlign: 'right' }}>
              <Link to={next.frontmatter.path}>
                <label css={{ justifyContent: 'flex-end' }}>
                  Articolo successivo
                  <FontAwesomeIcon icon={faChevronRight} css={(theme) => ({ marginLeft: theme.spacing(1) })} />
                </label>
                <span>{next.frontmatter.title}</span>
              </Link>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      ...PostPreviewData
      html
      timeToRead
      tableOfContents(maxDepth: 2)
      fields {
        opening_html
        disclaimer_html
      }
      frontmatter {
        modified
        categories {
          fields {
            disclaimer_html
          }
        }
        attributes {
          key
          value
        }
        tags {
          frontmatter {
            path
            title
          }
        }
        author {
          html
          frontmatter {
            avatar
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      ...PostPreviewData
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      ...PostPreviewData
    }
  }
`;
