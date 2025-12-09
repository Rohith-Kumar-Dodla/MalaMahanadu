import React, { useEffect } from 'react';

const SeoHead = ({ title, description, keywords, image }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.content = description || '';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description || '';
      document.head.appendChild(meta);
    }

    // Update or create meta keywords
    if (keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.content = keywords;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywords;
        document.head.appendChild(meta);
      }
    }

    // Update or create og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = title || '';
    } else {
      const meta = document.createElement('meta');
      meta.property = 'og:title';
      meta.content = title || '';
      document.head.appendChild(meta);
    }

    // Update or create og:description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.content = description || '';
    } else {
      const meta = document.createElement('meta');
      meta.property = 'og:description';
      meta.content = description || '';
      document.head.appendChild(meta);
    }

    // Update or create og:image
    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.content = image;
      } else {
        const meta = document.createElement('meta');
        meta.property = 'og:image';
        meta.content = image;
        document.head.appendChild(meta);
      }
    }

    // Cleanup function
    return () => {
      // Reset to default values when component unmounts
      document.title = 'Mala Mahanadu';
      
      const defaultDescription = document.querySelector('meta[name="description"]');
      if (defaultDescription) {
        defaultDescription.content = 'Official website of Mala Mahanadu organization';
      }
    };
  }, [title, description, keywords, image]);

  return null; // This component doesn't render anything
};

export default SeoHead;
