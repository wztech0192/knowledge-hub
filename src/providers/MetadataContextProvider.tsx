import React from 'react';
import metadataJson from '@/assets/knowledge_hub_metadata.json';
import { KnowledgeHubMetadata } from '@/types';

/**
 * Context for metadata
 */

const MetadataContext = React.createContext<KnowledgeHubMetadata>(metadataJson);

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
