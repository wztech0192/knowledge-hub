import React from 'react';
import metadataJson from '@/assets/knowledge_hub_metadata.json';

/**
 * Context for metadata
 */
type Metadata = typeof metadataJson;

const MetadataContext = React.createContext<Metadata>(metadataJson);

export const MetadataContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <MetadataContext.Provider value={metadataJson}>
      {children}
    </MetadataContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, react-refresh/only-export-components
export const useMetadata = () => React.useContext(MetadataContext)!;
