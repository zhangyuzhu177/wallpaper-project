import type { MultipartFile } from '@fastify/multipart'

export interface FileBodyDto {
  file?: MultipartFile
}
