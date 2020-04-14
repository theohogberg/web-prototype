import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import MediaSources from './MediaSources';

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

const concatClassnames = (...classnames) =>
  classnames
    .reduce((acc, curr) => {
      if (typeof curr === 'string') {
        return acc.concat(' ', curr);
      }

      return acc;
    }, '')
    .trim();

const Media = props => {
  const {
    component: Component = 'div',
    className,
    children,
    lazy = false,
    cover = false,
    src,
    style,
    image,
    srcSets,
    alt,
    ...other
  } = props;
  const isMediaComponent = MEDIA_COMPONENTS.includes(Component);
  const componentProps = { ...other };

  const [shouldRender, setShouldRender] = useState(!lazy);
  const [ref, inView] = useInView({
    rootMargin: '0px 0px 150px 0px',
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (lazy && inView && !shouldRender) {
      setShouldRender(inView);
    }
  }, [inView, lazy, shouldRender]);

  const composedStyle =
    !isMediaComponent && image ? { backgroundImage: `url("${image}")`, ...style } : style;

  const classes = concatClassnames(
    'media__root',
    isMediaComponent && 'media__media',
    cover && Component !== 'div' && 'media__absolute-cover',
    ['picture', 'img'].includes(Component) && 'media__img',
    className,
  );

  if (componentProps.children) {
    componentProps.children = React.Children.toArray(componentProps.children);
  }

  if (Component === 'picture') {
    componentProps.children = React.Children.toArray(componentProps.children);
    componentProps.children.push(<img key="media_img" src={src} alt={alt} />);
    componentProps.children.unshift(<MediaSources key="media_sources" srcSets={srcSets} />);
  }

  return (
    <>
      {shouldRender ? (
        <Component
          className={classes}
          style={composedStyle}
          src={isMediaComponent ? image || src : undefined}
          alt={alt}
          {...componentProps}
        />
      ) : (
        <div ref={ref} className={concatClassnames(classes, 'media__skeleton')} />
      )}
    </>
  );
};

Media.propTypes = {
  alt: PropTypes.string,
  component: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  lazy: PropTypes.bool,
  style: PropTypes.object,
  /**
   * 'Cover' sets styles to allow Media to act as a background image.
   * This allows us to have background images with lazy loading
   * Combined with a 'picture' component we can use a background image with breakpoints
   */
  cover: PropTypes.bool,
  /**
   * if component is a 'picture' then src supports breakpoints
   * where xs is the smallest and xl the largest
   * This will generate a responsive image
   */
  src: PropTypes.string,
  srcSets: PropTypes.shape({
    xs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    sm: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    md: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    lg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    xl: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }),
  /**
   * Image to be displayed as a background image if component is a <div />.
   * Either `image` or `src` prop must be specified.
   * Height must be specified otherwise the image will not be visible.
   */
  image: PropTypes.string,
};

Media.uiName = 'Media';

export default Media;
