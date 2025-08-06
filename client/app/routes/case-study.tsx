import type { Route } from "./+types/case-study";
import { Suspense } from 'react';
import { getContent } from '~/services/content.service';
import { CaseStudy } from "~/layout/CaseStudy";

export async function loader({ params }: Route.LoaderArgs) {
  const study = await getContent('case-studies', params.slug);
  if (!study) {
    throw new Response('Not Found', { status: 404 });
  }
  return { study };
}

export default function Component({
  loaderData,
}: Route.ComponentProps) {
  const { study } = loaderData;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CaseStudy>
          <article className="prose" dangerouslySetInnerHTML={{ __html: study.content }} />
      </CaseStudy>
    </Suspense>
  );
}
