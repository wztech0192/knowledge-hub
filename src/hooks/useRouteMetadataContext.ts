import { useMetadata } from '@/providers/MetadataContextProvider';
import { Category, KnowledgeHubMetadata, Subject, Topic } from '@/types';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export class RouteMetadataContext {
  readonly pathname: string;
  readonly categoryId: number;
  readonly subjectId: number;
  readonly topicIds: number[];

  // current category
  readonly category: Category | null;
  // current subject
  readonly subject: Subject | null;
  // current topic
  readonly topic: Topic | null;
  // The hierarchy of topics leading to the current topic. The last element is the current topic.
  readonly topicHierarchy: Topic[];

  constructor(
    metadata: KnowledgeHubMetadata,
    pathname: string,
    categoryIdParam = '',
    subjectIdParam = '',
    topicIdsParam = '',
  ) {
    this.pathname = pathname;
    this.categoryId = parseInt(categoryIdParam ?? '');
    this.subjectId = parseInt(subjectIdParam ?? '');
    this.topicIds = topicIdsParam.split('/').map(i => parseInt(i)) ?? [];
    console.log(this.topicIds);

    // assign the current category and subject
    this.category = metadata.categories[this.categoryId] ?? null;
    this.subject = this.category?.subjects[this.subjectId] ?? null;
    this.topic = null;
    this.topicHierarchy = [];

    // assign the current topic and topic hierarchy if the subject and topic indexes are valid
    if (this.subject && this.topicIds.length > 0) {
      let topicsToPick = this.subject.topics;

      this.topicHierarchy = [];
      for (const idx of this.topicIds) {
        const topic = topicsToPick[idx];
        if (!topic) {
          break;
        }

        this.topicHierarchy.push(topic);

        if (!topic.subtopics) {
          break;
        }

        topicsToPick = topic.subtopics;
      }

      if (this.topicHierarchy.length === this.topicIds.length) {
        // assign the last topic in the hierarchy as the current topic
        this.topic = this.topicHierarchy.at(-1)!;
      }
    }
  }

  // The path back to the current subject
  getSubjectPath() {
    return `/category/${this.categoryId}/subject/${this.subjectId}`;
  }

  // The path back to the current topic
  getTopicPath(level = -1) {
    return `${this.getSubjectPath()}/topic/${this.topicIds.slice(0, level).join('/')}`;
  }

  previousPathCache: string = '';
  getPreviousPath() {
    if (!this.previousPathCache) {
      // If there are topics in the hierarchy, return the path to the previous topic
      if (this.topicHierarchy.length > 1) {
        this.previousPathCache = this.getTopicPath();
      }
      // If there are no topics in the hierarchy, return the path to the current subject
      else if (this.topicHierarchy.length === 1) {
        this.previousPathCache = this.getSubjectPath();
      } else {
        this.previousPathCache = '/';
      }
    }
    return this.previousPathCache;
  }

  getNextPath(nextPath: string) {
    return `${this.pathname}/${nextPath}`;
  }
}

const useRouteMetadataContext = () => {
  const metadata = useMetadata();
  const { categoryId, subjectId, ['*']: topicIds } = useParams();
  const { pathname } = useLocation();

  return useMemo(
    () =>
      new RouteMetadataContext(
        metadata,
        pathname,
        categoryId,
        subjectId,
        topicIds,
      ),
    [metadata, categoryId, subjectId, topicIds, pathname],
  );
};

export default useRouteMetadataContext;
