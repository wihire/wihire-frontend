import config from './config';

const generateMetadata = (metadata, options) => {
  let title = metadata?.title ?? config.appName;
  const description = metadata?.description ?? config.appDescription;

  if (options?.withSuffix) {
    title += ` | ${config.appName}`;
  }

  const metadataResult = {
    ...metadata,
    description,
    title,
    keywords: metadata?.keywords || config.appKeywords,
    metadataBase: new URL(config.appUrl),
    themeColor: config.themeColor,
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    applicationName: config.appName,
    manifest: '/manifest.json',
    openGraph: {
      title,
      description,
      type: 'website',
      images: `${config.appUrl}/images/logo.png`,
      siteName: config.appName,
      url: config.appUrl
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default'
    }
  };

  return metadataResult;
};

export default generateMetadata;
