import React from 'react';
import metadataJson from '@/assets/knowledge_hub_metadata.json';

/**
 * Context for metadata
 */
export interface KnowledgeHubMetadata {
  version: string;
  description: string;
  categories: Category[];
}

export interface Category {
  name: string;
  subject: Subject[];
}

//changed subjectDescription to description
export interface Subject {
  title: string;
  description: string;
  topics: Topic[];
}

//Creating a tree like structure
export interface Topic {
  name: string;
  subTopics?: Topic[];
}

// interface SubTopic{
//   topicName: string;
//   subTopic: [];
// }

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
