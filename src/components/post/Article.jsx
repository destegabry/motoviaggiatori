
import styled from '@emotion/styled'
import { blue, azure } from '../../utils/colors'

export default styled.article`
  h1 {
    text-align: center;
    text-transform: uppercase;
  }

  figure {
    img {
      width: 100%;
      height: auto;
    }
  }

  .wp-block-gallery,
  .wp-block-jetpack-tiled-gallery {
    display: block;
    width: 100%;

    > * {
      display: none;
    }
  }

  .message {
    border-radius: .4em;
    margin: 1em 0;
    padding: .5em;
    position: relative;

    .p {
      padding-bottom: .5em;
    }

    &.warning {
      background-color: #fcf8e3;
      border: 1px solid #faebcc;
      color: #8a6d3b;
    }

    &.info {
      background-color: #d9edf7;
      border: 1px solid #bce8f1;
      color: ${blue};
    }

    &.pro-tip {
      background-color: ${azure};
      border: 1px solid ${blue};
      color: ${blue};
      padding-top: 1.25em;

      &:before {
        content: "Pro Tip";
        background: ${blue};
        border-radius: .4em 0;
        color: white;
        fontSize: 12px;
        line-height: 20px;
        padding: 0 .75em;
        position: absolute;
        left: -1px;
        top: -1px;
        text-transform: uppercase;
      }
    }
  }

  .disclaimer {
    font-size: .8rem;
    font-style: italic;
  }
`;