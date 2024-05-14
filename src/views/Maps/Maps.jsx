import React from 'react';

class Maps extends React.Component {
    render() {
        return (
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d659.3933301886174!2d125.09723028955531!3d7.906058012836607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff19625e36896f%3A0x8ddc84e806014c3a!2sNew%20Batangan%20Ramp%20Bridge!5e0!3m2!1sen!2sph!4v1712622033106!5m2!1sen!2sph"
                style={{ width: '171vh', height: '90vh', border: 0 }}
                allowFullScreen="true"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Valencia MAP"
            ></iframe>
        );
    }
}

export default Maps;
