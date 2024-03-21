export interface KnowledgeHubMetadata {
  version: string;
  description: string;
  categories: Category[];
}

export interface Category {
  name: string;
  subjects: Subject[];
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
  subtopics?: Topic[];
  assetUrl?: string;
}
