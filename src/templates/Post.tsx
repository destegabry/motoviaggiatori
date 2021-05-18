import React, { useEffect } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faHandPointUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import locale from 'date-fns/locale/it';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Picture } from '../components/Picture';
import { PostMeta } from '../components/Post';
import FeaturedMedia from '../components/Post/FeaturedMedia';
import { Post } from '../entities';

const SwipeIcon = icon(faHandPointUp);

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

function onGalleryScroll(this: HTMLDivElement): void {
  this.removeEventListener('scroll', onGalleryScroll);
  this.classList.add('swiped');
  const swipe = this.querySelector('.swipe-wrapper') as HTMLDivElement;
  swipe.style.opacity = '0';
  swipe.style.animation = 'none';
}

export default function PostPage({ data }: PostPageProps): JSX.Element {
  const { next, previous } = data;
  const post = data.markdownRemark.frontmatter;

  const disclaimers = post.categories
    ? post.categories
        .filter(({ frontmatter: { disclaimer } }) => Boolean(disclaimer))
        .map(({ frontmatter: { disclaimer } }) => disclaimer as string)
    : [];

  if (post.disclaimer) {
    disclaimers.unshift(post.disclaimer);
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      (changes) =>
        changes
          .filter(
            ({ isIntersecting, target }) =>
              isIntersecting && !target.classList.contains('swiped') && !target.querySelector('.swipe-wrapper')
          )
          .forEach(({ target }) => {
            const scroller = target.querySelector('.md-gallery-scroller');
            if ((scroller?.scrollWidth || 0) > window.outerWidth) {
              const swipeWrapper = document.createElement('div');
              swipeWrapper.className = 'swipe-wrapper';
              swipeWrapper.appendChild(SwipeIcon.node[0]);
              target.append(swipeWrapper);
              target.addEventListener('scroll', onGalleryScroll);
            }
          }),
      options
    );
    const galleries = document.querySelectorAll('.md-gallery');
    galleries.forEach((gallery) => observer.observe(gallery));

    return () => {
      galleries.forEach((gallery) => gallery.removeEventListener('scroll', onGalleryScroll));
      observer.disconnect();
    };
  }, []);

  return (
    <Layout title={post.title} description={post.excerpt} image={post.featured_image}>
      <div itemProp="blogPost" itemScope itemType="https://schema.org/BlogPosting">
        <h1 itemProp="name headline">{post.title}</h1>
        <PostMeta post={data.markdownRemark} />
        <FeaturedMedia post={data.markdownRemark} />
        <div
          itemProp="timeRequired"
          {...{ content: `PT${data.markdownRemark.timeToRead}M` }}
          css={(theme) => ({
            ...theme.typography.caption,
            textAlign: 'center',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
          })}
        >
          Tempo di lettura: circa{' '}
          {data.markdownRemark.timeToRead > 1 ? `${data.markdownRemark.timeToRead} minuti` : `1 minuto`}
        </div>
        {post.opening && <section dangerouslySetInnerHTML={{ __html: post.opening }} itemProp="backstory" />}
        {data.markdownRemark.tableOfContents && (
          <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }} />
        )}
        {post.attributes && (
          <table
            css={(theme) => ({
              fontFamily: theme.typography.body.fontFamily,

              'th, td': {
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                borderBottom: `1px solid ${theme.palette.text.disabled}`,
              },
              th: {
                paddingRight: theme.spacing(3),
                textAlign: 'left',
              },
            })}
          >
            {post.attributes.map(({ key, value }) => (
              <tr key={key}>
                <th>{key}</th>
                <td dangerouslySetInnerHTML={{ __html: value }}></td>
              </tr>
            ))}
          </table>
        )}
        {data.markdownRemark.html && (
          <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} itemProp="articleBody" />
        )}
        {disclaimers && (
          <section css={(theme) => ({ p: { fontSize: theme.typography.caption.fontSize } })}>
            {disclaimers.map((disclaimer, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: disclaimer }}></p>
            ))}
          </section>
        )}
        {post.modified && (
          <p
            css={(theme) => ({ fontStyle: 'italic', fontSize: theme.typography.caption.fontSize, textAlign: 'center' })}
          >
            Ultimo aggiornamento: &nbsp;
            <time dateTime={post.modified} itemProp="dateModified" {...{ content: post.modified }}>
              {format(new Date(post.modified), 'dd MMMM yyyy', { locale })}
            </time>
          </p>
        )}
        {post.tags && (
          <div>
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
              {post.tags.map(({ frontmatter: { title, path } }) => (
                <li key={path}>
                  <Link to={`/tag/${path}`} rel="tag" title={`Guarda tutti i post con il tag ${title}`}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {post.author && (
          <section
            itemScope
            itemType="http://schema.org/Person"
            css={(theme) => ({
              display: 'flex',
              margin: '1em 0',

              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                textAlign: 'center',

                p: {
                  textAlign: 'left',
                },
              },
            })}
          >
            {post.author.frontmatter.avatar && (
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
                  src={post.author.frontmatter.avatar}
                  alt={`Avatar ${post.author.frontmatter.title}`}
                  {...authorPictureSize}
                />
              </div>
            )}
            <div>
              <h2 itemProp="name" css={{ marginTop: 0 }}>
                {post.author.frontmatter.title}
              </h2>
              {post.author.html && (
                <div dangerouslySetInnerHTML={{ __html: post.author.html }} itemProp="description" />
              )}
              <Link to={`/autore/${post.author.frontmatter.path}`}>
                Tutti i post di {post.author.frontmatter.title}
                <FontAwesomeIcon icon={faChevronRight} css={(theme) => ({ marginLeft: theme.spacing(1) })} />
              </Link>
            </div>
          </section>
        )}
        <div
          css={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),

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
        </div>
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
      frontmatter {
        modified
        opening
        disclaimer
        categories {
          frontmatter {
            disclaimer
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
