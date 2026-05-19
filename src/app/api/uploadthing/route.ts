import { uploadRouter } from '@/lib/uploadthing';
import { createRouteHandler } from 'uploadthing/next';

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
