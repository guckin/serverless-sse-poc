function getAssertEnvVar(name: string): string {
  const env = process.env[name];
  if (!env) {
    throw new Error(`${name} is not defined`);
  }
  return env;
}

export const storageBucketName = getAssertEnvVar('STORAGE_BUCKET_NAME');

export const storageBucketRegion = getAssertEnvVar('STORAGE_BUCKET_REGION');

