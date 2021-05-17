import React, { useEffect } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
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
  };
};

function onGalleryScroll(this: HTMLDivElement): void {
  this.removeEventListener('scroll', onGalleryScroll);
  this.classList.add('swiped');
  const swipe = this.querySelector('.swipe-wrapper') as HTMLDivElement;
  swipe.style.opacity = '0';
  swipe.style.animation = 'none';
}

export default function PostPage({ data }: PostPageProps): JSX.Element {
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
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        path
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        path
        title
      }
    }
  }
`;
