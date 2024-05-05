import { S3Client } from "@aws-sdk/client-s3";
import type { AwsCredentialIdentity } from "@aws-sdk/types";
import MulterS3 from "multer-s3";
import { config } from "../utils/config";

const s3 = new S3Client({
	forcePathStyle: true,
	region: config.s3.region,
	endpoint: config.s3.endpoint,
	credentials: {
		accessKeyId: config.s3.accessKeyId,
		secretAccessKey: config.s3.secretAccessKey,
	} as AwsCredentialIdentity,
});

export const multerS3 = MulterS3({
	s3: s3,
	bucket: "avatar",
	acl: "public-read",
	contentType: MulterS3.AUTO_CONTENT_TYPE,
	metadata: (req, file, cb) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req, file, cb) => {
		const fileName = `${Date.now()}_${file.fieldname}_${file.originalname}`;
		cb(null, fileName);
	},
});
