import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Tujibambe - Adventure Tours & Safari Experiences in Kenya", 
  description = "Discover unforgettable adventure tours and safari experiences in Kenya with Tujibambe. From Maasai Mara wildlife safaris to Mount Kenya treks and coastal getaways.",
  keywords = "Kenya tours, safari Kenya, Maasai Mara, Mount Kenya, Diani Beach, Amboseli, Kenya travel, adventure tours, wildlife safaris, Kenyan destinations",
  canonical = "https://tujibambe.iyonicorp.com",
  image = "https://tujibambe.iyonicorp.com/og-image.jpg"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};

export default SEO;
