import type { UploadRouter } from '@/lib/uploadthing';
import { generateReactHelpers } from '@uploadthing/react';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadRouter>();
