import {
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-providers";
import { HttpRequest } from "@smithy/protocol-http";
import { Hash } from "@smithy/hash-node";
import { parseUrl } from "@smithy/url-parser";
import { formatUrl } from "@aws-sdk/util-format-url";

export type PresignedUploadOptions = {
  region: string;
  bucket: string;
  key: string;
  method: string;
  expiresIn: number;
};

export async function presignedUpload(options: PresignedUploadOptions) {
  const urlString = `https://${options.bucket}.s3.${options.region}.amazonaws.com/${options.key}`
  const url = parseUrl(urlString);
  const preSigner = new S3RequestPresigner({
    credentials: fromEnv(),
    region: options.region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await preSigner.presign(
    new HttpRequest({ ...url, method: options.method }),
    {expiresIn: options.expiresIn}
  );
  return formatUrl(signedUrlObject);
}


