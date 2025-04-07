import  { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnimatedIcon = ({ src, alt, hoverEffect = true, size = 24 }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.playsInline = true;
        }
    }, []);

    return (
        <div className={`animated-icon ${hoverEffect ? 'hover-effect' : ''}`}>
            <video
                ref={videoRef}
                src={src}
                alt={alt}
                width={size}
                height={size}
                autoPlay
                loop
                muted
                playsInline
            />
        </div>
    );
};

AnimatedIcon.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    hoverEffect: PropTypes.bool,
    size: PropTypes.number,
};

export default AnimatedIcon;